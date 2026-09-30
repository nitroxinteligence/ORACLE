#!/usr/bin/env python3
"""Bounded read-only routing. Selection is not evidence of host execution."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import unicodedata

VERSION = '2.1'
LIMIT = 20000
READ_LIMIT = 65536
QUERY_LIMIT = 4096
SKIP = {'.git', 'node_modules', '.obsidian', '__pycache__', '.work', 'references', 'assets', 'templates'}
STOP = set('a an and are as at be by can do for from help how i in is it me my of on or please the this to use want with you your quero criar fazer montar um uma uns umas para com meu minha meus minhas seu sua seus suas de da das do dos e em no na nos nas por que como o os as ao aos preciso gostaria usando usar processo processos trabalho trabalhar task tasks create creation creating criacao criar build building make workflow workflows system systems sistema sistemas'.split())
# Domain concepts are language-independent; generic task verbs never expand intent.
CONCEPTS = {
    'content': ('conteudo content editorial copywriting storytelling escrita writing redacao'),
    'social': ('social instagram linkedin tiktok facebook redes'),
    'marketing': ('marketing posicionamento branding marca brand'),
    'sales': ('vendas venda sales selling negotiation negociacao comercial'),
    'offer': ('oferta offer offers proposta bonus garantia guarantee'),
    'pricing': ('pricing precificacao preco price'),
    'traffic': ('trafego ads advertising anuncios anuncio paid'),
    'conversion': ('conversao conversion cro landing'),
    'delivery': ('entrega delivery onboarding fulfillment'),
    'code': ('codigo code coding software programacao development frontend backend swift python api node sqlite'),
    'specification': ('spec specs specification especificacao especificacoes requirements requisitos prd'),
    'decomposition': ('decompose decomposition decomposicao decompor breakdown break'),
    'leads': ('leads lead prospecting prospeccao captacao'),
    'automation': ('automacao automation integrations integracao'),
    'finance': ('finance financeiro financas accounting contabilidade'),
    'planning': ('process processo processos workflow workflows planning planejamento plan planejar estrategia strategy calendario calendar schedule scheduling fluxo'),
}
CONCEPT_WORDS = {key: set(value.split()) for key, value in CONCEPTS.items()}

def normalized(text):
    return ''.join(c for c in unicodedata.normalize('NFKD', text.lower()) if not unicodedata.combining(c))

def tokens(text):
    return set(re.findall(r'[a-z0-9]+', normalized(text)))

def scalar(value):
    value = value.strip()
    if value.startswith('"'):
        try:
            return json.loads(value)
        except ValueError:
            pass
    if len(value) >= 2 and value[0] == value[-1] == "'":
        return value[1:-1].replace("''", "'")
    return re.split(r'\s+#', value, 1)[0].strip()

def read_bounded(path):
    with path.open('rb') as stream:
        data = stream.read(READ_LIMIT + 1)
    if len(data) > READ_LIMIT:
        raise ValueError('read_limit')
    return data

def metadata(path, kind="skill"):
    """Parse top-level frontmatter scalars, including YAML block descriptions.

    No YAML evaluator, constructors or dependency installation. Nested YAML is
    not interpreted; the full scalar metadata needed by the router is preserved.
    """
    raw = read_bounded(path)
    text = raw.decode('utf-8-sig')
    header = re.match(r'\A---\r?\n(.*?)\r?\n---(?:\r?\n|$)', text, re.S)
    if not header and kind == 'skill':
        return None
    fields, lines, index = {}, header[1].splitlines() if header else [], 0
    while index < len(lines):
        match = re.match(r'^([\w-]+):\s*(.*)$', lines[index])
        index += 1
        if not match:
            continue
        key, value = match.groups()
        continuation = []
        while index < len(lines) and (not lines[index].strip() or lines[index][0].isspace()):
            continuation.append(lines[index])
            index += 1
        if re.fullmatch(r'[|>][+-]?[1-9]?', value):
            block = '\n'.join(continuation)
            nonempty = [len(line) - len(line.lstrip()) for line in continuation if line.strip()]
            indent = min(nonempty) if nonempty else 0
            block = '\n'.join(line[indent:] for line in continuation)
            value = ' '.join(block.splitlines()) if value.startswith('>') else block
        else:
            if continuation:
                value += ' ' + ' '.join(line.strip() for line in continuation)
            value = scalar(value)
        fields[key] = str(value).strip()
    if kind != 'skill':
        heading = re.search(r'^# +(.+)$', text, re.M)
        fields['name'] = fields.get('title') or fields.get('titulo') or (heading[1] if heading else path.stem)
        fields.setdefault('description', ' '.join(fields.get(key, '') for key in ('category', 'subcategory', 'categoria', 'tags')))
    if not fields.get('name'):
        return None
    fields['sha256'] = hashlib.sha256(raw).hexdigest()
    return fields

def query_intent(query):
    terms = {term for term in tokens(query) if len(term) > 2 and term not in STOP}
    concepts = {key for key, words in CONCEPT_WORDS.items() if key != 'planning' and words & terms}
    if concepts and CONCEPT_WORDS['planning'] & tokens(query):
        concepts.add('planning')
    return terms, concepts

def rank(fields, path, terms, concepts):
    if not terms:
        return 0.0, []
    name = tokens(fields['name'])
    description = tokens(fields.get('description', ''))
    semantic = name | description
    # Opening purpose and title outweigh examples/cross-references later in
    # long descriptions. Managed opaque names carry no additional meaning.
    purpose = name | tokens(re.split(r'[.!?](?:\s|$)', fields.get('description', ''), 1)[0])
    category = re.search(r'Use em ([^.]+)', fields.get('description', ''))
    if category:
        purpose |= tokens(category[1])
    purpose_hits = {key for key in concepts if CONCEPT_WORDS[key] & purpose}
    direct = terms & semantic
    concept_hits = {key for key in concepts if CONCEPT_WORDS[key] & semantic}
    # Briefs contain audience/brand/product details. They do not dilute the
    # user's task intent: coverage is measured on concepts, not every noun.
    domain = concepts - {'planning'}
    matched_domain = concept_hits - {'planning'}
    if domain and not matched_domain:
        return 0.0, []
    # A precise technical or offer intent must anchor the match. A generic
    # "code" mention in a marketing description cannot route an API brief.
    precise = domain & {'offer', 'specification', 'decomposition'}
    if precise and not (precise & purpose_hits):
        return 0.0, []
    technical = terms & {'api', 'node', 'sqlite', 'software', 'backend', 'frontend', 'python', 'swift'}
    if technical and 'code' in domain and not (
            semantic & technical or concept_hits & {'specification', 'decomposition'}):
        return 0.0, []
    weights = {key: (3 if key in precise else 1) for key in domain}
    coverage = (sum(weights[key] for key in matched_domain) /
                max(1, sum(weights.values()))) if domain else len(direct) / max(1, len(terms))
    if coverage < 0.3:
        return 0.0, []
    score = min(4, sum(4 if term in name else 2 for term in direct))
    score += sum((5 if key in precise else 3) if CONCEPT_WORDS[key] & name
                 else (6 if key in precise else 3) if key in purpose_hits
                 else 0.5 for key in matched_domain)
    if category:
        score += 4 * len({key for key in precise if CONCEPT_WORDS[key] & tokens(category[1])})
    if 'planning' in concept_hits:
        score += 2
    score += 4 * len(terms & purpose) / max(1, len(terms & semantic))
    purpose_domains = {key for key, words in CONCEPT_WORDS.items() if key != 'planning' and words & purpose}
    specificity = len(purpose_hits - {'planning'}) / max(1, len(purpose_domains))
    score *= (0.5 + coverage) * (0.25 + 0.75 * specificity)
    if score < 3:
        return 0.0, []
    # Paths can break a tie, but cannot admit an unrelated description.
    score += 0.05 * len(terms & tokens(str(path)))
    return round(score, 3), sorted(direct | {'intent:' + key for key in concept_hits})

def semantic_key(row):
    name = normalized(row['name'])
    description = normalized(row.get('description', ''))
    # Managed wrappers have opaque identifiers, not meaningful titles.
    return (description, name) if re.fullmatch(r'oracle-skill-[a-f0-9]+', name) else (name, description)

def within(path, boundary):
    try:
        path.relative_to(boundary)
        return True
    except ValueError:
        return False

def discover(roots, query, limit=20, vault=None, host_skills=None, offset=0):
    rows, seen, issues = [], set(), []
    if len(query.encode('utf-8')) > QUERY_LIMIT:
        raise ValueError('query_limit')
    terms, concepts = query_intent(query)
    boundary = Path(vault).expanduser().resolve() if vault else None
    visited = 0
    for root in roots:
        root = Path(root).expanduser()
        if not root.is_dir():
            issues.append({'root': str(root), 'reason': 'unavailable'})
            continue
        vault_root = boundary is not None and within(root.absolute(), boundary)
        kind = 'prompt' if root.name.lower() == 'prompts' else 'tutorial' if root.name.lower() in ('tutoriais', 'tutorials') else 'skill'
        queue = [root]
        while queue and visited < LIMIT:
            folder = queue.pop()
            try:
                real = folder.resolve(strict=True)
                if vault_root and not within(real, boundary):
                    issues.append({'path': str(folder), 'reason': 'outside_vault'})
                    continue
                if real in seen:
                    continue
                seen.add(real)
                visited += 1
                entries = [real / 'SKILL.md'] if kind == 'skill' else sorted(real.glob('*.md'))
                for skill in entries:
                    if not skill.is_file():
                        continue
                    if vault_root and not within(skill.resolve(), boundary):
                        issues.append({'path': str(skill), 'reason': 'outside_vault'})
                        continue
                    fields = metadata(skill, kind)
                    if fields and fields['name'] != 'oracle':
                        score, reasons = rank(fields, skill, terms, concepts)
                        if kind != 'skill':
                            score = round(score * 0.6, 3)
                        if score or not query.strip():
                            row = {'path': str(skill), **fields, 'kind': kind, 'score': score, 'matches': reasons,
                                   'automatic': kind == 'skill' and fields.get('disable-model-invocation', '').lower() != 'true',
                                   'status': {'files_discovered': True, 'host_available': None,
                                              'instructions_read': False, 'execution_verified': False}}
                            if host_skills is not None:
                                row['status']['host_available'] = kind == 'skill' and fields['name'] in host_skills
                            rows.append(row)
                if kind == 'skill' and (real / 'SKILL.md').is_file():
                    continue
                for child in sorted(real.iterdir(), reverse=True):
                    if child.name in SKIP or child.name.startswith('.'):
                        continue
                    # Vault links must remain in the selected vault. Host roots
                    # permit only direct installed package links.
                    if child.is_dir() and (vault_root or not child.is_symlink() or folder == root):
                        queue.append(child)
            except (OSError, UnicodeError, RuntimeError, ValueError) as error:
                issues.append({'path': str(folder), 'reason': str(error) if isinstance(error, ValueError) else type(error).__name__})
        if queue:
            issues.append({'root': str(root), 'reason': 'discovery_limit'})
    rows.sort(key=lambda row: (-row['score'], *semantic_key(row), row['path']))
    return {'schema_version': 2, 'router_version': VERSION, 'skills': rows[offset:offset + limit],
            'matching': len(rows), 'returned': len(rows[offset:offset + limit]), 'offset': offset,
            'next_offset': offset + limit if offset + limit < len(rows) else None,
            'query_terms': sorted(terms), 'query_intents': sorted(concepts), 'issues': issues}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--query', default='')
    parser.add_argument('--vault', type=Path)
    parser.add_argument('--root', action='append', type=Path, default=[])
    parser.add_argument('--no-host-roots', action='store_true', help='Search only explicitly selected roots and vault')
    parser.add_argument('--host-skills', type=Path, help='Bounded JSON array of names actually announced by the current host')
    parser.add_argument('--receipt', type=Path, help='Write a selection receipt; never certifies execution')
    parser.add_argument('--limit', type=int, default=20)
    parser.add_argument('--offset', type=int, default=0)
    args = parser.parse_args()
    try:
        context_file = Path(__file__).resolve().parents[1] / 'references/context.json'
        context = json.loads(read_bounded(context_file)) if context_file.exists() else {}
        profiles = context.get('profiles', {})
        vaults = sorted({p['vault'] for p in profiles.values() if p.get('vault')})
        if not args.vault and len(vaults) > 1:
            print(json.dumps({'requires_vault_selection': vaults}, ensure_ascii=False))
            return
        vault = args.vault or (Path(vaults[0]) if len(vaults) == 1 else None)
        roots = list(args.root)
        if not args.no_host_roots:
            roots += [Path.home()/'.agents/skills', Path(os.environ.get('CODEX_HOME', str(Path.home()/'.codex')))/'skills']
        if vault:
            if not vault.is_dir():
                raise ValueError('selected_vault_unavailable')
            roots += [vault/'SISTEMA/skills', vault/'SISTEMA/prompts', vault/'SISTEMA/Tutoriais']
        host_skills = None
        if args.host_skills:
            host_skills = json.loads(read_bounded(args.host_skills))
            if not isinstance(host_skills, list) or not all(isinstance(name, str) for name in host_skills):
                raise ValueError('host_skills_must_be_names')
        result = discover(roots, args.query, min(max(args.limit, 1), 100), vault, host_skills, max(args.offset, 0))
        result['vault'] = str(vault.resolve()) if vault else None
        result['scope'] = 'Metadata routing only. Host availability requires current session inventory; reading and execution require separate evidence.'
        if args.receipt:
            receipt = {'schema_version': 1, 'router_version': VERSION,
                       'router_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
                       'query_sha256': hashlib.sha256(args.query.encode()).hexdigest(), 'vault': result['vault'],
                       'selection': [{'name': row['name'], 'kind': row['kind'], 'path': row['path'], 'sha256': row['sha256'], 'status': row['status']} for row in result['skills']],
                       'execution_verified': False}
            args.receipt.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + '\n')
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except (OSError, ValueError, TypeError, KeyError) as error:
        print(json.dumps({'error': str(error), 'execution_verified': False}, ensure_ascii=False))
        raise SystemExit(2)

if __name__ == '__main__':
    main()
