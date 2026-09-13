#!/usr/bin/env python3
"""Bounded, read-only skill discovery. No third-party dependencies or execution."""
import argparse
import json
import os
from pathlib import Path
import re
import unicodedata

LIMIT = 20000
SKIP = {'.git', 'node_modules', '.obsidian', '__pycache__', '.work', 'references', 'assets', 'templates'}

def normalized(text):
    return ''.join(c for c in unicodedata.normalize('NFKD', text.lower()) if not unicodedata.combining(c))

def metadata(path):
    with path.open('r', encoding='utf-8') as stream:
        text = stream.read(12000)
    header = re.search(r'\A---\r?\n(.*?)\r?\n---', text, re.S)
    if not header:
        return None
    fields = {}
    for name in ('name', 'description', 'disable-model-invocation', 'user-invocable'):
        match = re.search(r'^' + name + r':\s*(.+)$', header[1], re.M)
        if match:
            fields[name] = match[1].strip().strip('\"\'')
    if not fields.get('name'):
        return None
    return fields

def discover(roots, query, limit=20):
    rows, seen, issues = [], set(), []
    terms = set(re.findall(r'[a-z0-9]+', normalized(query))) - {'quero', 'criar', 'uma', 'para', 'com', 'meu'}
    aliases = {'oferta': ['offer', 'hormozi', 'pricing'], 'vendas': ['sales', 'negotiation'],
               'codigo': ['code', 'frontend', 'software'], 'trafego': ['ads', 'advertising'],
               'entrega': ['delivery', 'onboarding'], 'conversao': ['conversion', 'cro']}
    for term in tuple(terms):
        terms.update(aliases.get(term, []))
    visited = 0
    for root in roots:
        root = Path(root).expanduser()
        if not root.is_dir():
            issues.append({'root': str(root), 'reason': 'unavailable'})
            continue
        # Follow only the direct installed skill symlink. Never recurse arbitrary links.
        queue = [root]
        while queue and visited < LIMIT:
            folder = queue.pop()
            try:
                real = folder.resolve(strict=True)
                if real in seen:
                    continue
                seen.add(real)
                visited += 1
                skill = real / 'SKILL.md'
                if skill.is_file():
                    fields = metadata(skill)
                    if fields and fields['name'] != 'oracle':
                        haystack = normalized(str(real) + ' ' + fields.get('name', '') + ' ' + fields.get('description', ''))
                        score = sum(1 for term in terms if term in haystack)
                        if score or not terms:
                            rows.append({'path': str(skill), **fields, 'score': score,
                                         'automatic': fields.get('disable-model-invocation', '').lower() != 'true'})
                    # An entrypoint owns its package; nested samples are not other skills.
                    continue
                for child in sorted(real.iterdir(), reverse=True):
                    if child.name in SKIP or child.name.startswith('.'):
                        continue
                    if child.is_dir() and (not child.is_symlink() or folder == root):
                        queue.append(child)
            except (OSError, UnicodeError, RuntimeError) as error:
                issues.append({'path': str(folder), 'reason': type(error).__name__})
        if queue:
            issues.append({'root': str(root), 'reason': 'discovery_limit'})
    rows.sort(key=lambda row: (-row['score'], row['path']))
    return {'skills': rows[:limit], 'matching': len(rows), 'returned': min(len(rows), limit), 'issues': issues}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--query', default='')
    parser.add_argument('--vault', type=Path)
    parser.add_argument('--root', action='append', type=Path, default=[], help='Additional explicitly selected skill root')
    parser.add_argument('--limit', type=int, default=20)
    args = parser.parse_args()
    context_file = Path(__file__).resolve().parents[1] / 'references/context.json'
    context = json.loads(context_file.read_text()) if context_file.exists() else {}
    profiles = context.get('profiles', {})
    vaults = sorted({p['vault'] for p in profiles.values() if p.get('vault')})
    if not args.vault and len(vaults) > 1:
        print(json.dumps({'requires_vault_selection': vaults}, ensure_ascii=False))
        return
    vault = args.vault or (Path(vaults[0]) if len(vaults) == 1 else None)
    roots = [Path.home()/'.agents/skills', Path(os.environ.get('CODEX_HOME', str(Path.home()/'.codex')))/'skills', *args.root]
    if vault:
        roots.append(vault/'SISTEMA/skills')
    result = discover(roots, args.query, min(max(args.limit, 1), 100))
    result['vault'] = str(vault) if vault else None
    result['scope'] = 'Local skill metadata only; consult skills and tools announced by the host for plugins.'
    print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
