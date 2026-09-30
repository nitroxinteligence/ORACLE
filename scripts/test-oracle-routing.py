#!/usr/bin/env python3
"""Synthetic router evaluation. Never reads a personal vault or host configuration."""
import argparse
from collections import Counter
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

REPO = Path(__file__).resolve().parents[1]
SCRIPT = REPO / 'skills/oracle/scripts/discover.py'
spec = importlib.util.spec_from_file_location('oracle_router', SCRIPT)
router = importlib.util.module_from_spec(spec)
spec.loader.exec_module(router)

class Routing(unittest.TestCase):
    def setUp(self):
        self.workspace = REPO / '.work/router-readiness'
        self.workspace.mkdir(parents=True, exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(dir=self.workspace)
        self.vault = Path(self.temp.name) / 'vault'
        self.root = self.vault / 'SISTEMA/skills'
        self.root.mkdir(parents=True)
        entries = {
            'content-calendar': ('Editorial Content Planning', '>', 'Plan a content strategy, editorial calendar and social media workflow for Instagram, LinkedIn and TikTok.'),
            'sales-negotiation': ('Sales Negotiation', '|', 'Negociação de vendas e diagnóstico comercial.\nSales objection handling.'),
            'code-python': ('Python Software', '>', 'Implement software, code and backend development in Python.'),
            'paid-ads': ('Paid Advertising', '>', 'Planejar anúncios, tráfego e campanhas pagas com métricas.'),
            'offer-pricing': ('Offer Pricing', '>', 'Estruture oferta e precificação para produtos e serviços.'),
            'noise-instagram-content': ('Geological Minerals', '>', 'Study basalt, quartz and granite rocks.'),
        }
        for folder, (name, style, description) in entries.items():
            path = self.root / folder / 'SKILL.md'
            path.parent.mkdir()
            text = '---\nname: "' + name + '"\ndescription: ' + style + '\n' + '\n'.join('  ' + line for line in description.splitlines()) + '\n---\nInstructions\n'
            path.write_text(text)
        for kind, folder in [('prompt', 'prompts'), ('tutorial', 'Tutoriais')]:
            path = self.vault / 'SISTEMA' / folder / 'content.md'
            path.parent.mkdir()
            path.write_text('---\ntitle: Social Editorial Calendar\ntype: ' + kind + '\ntags:\n  - content\n  - planning\n---\n# Social Editorial Calendar\n')
        self.roots = [self.root, self.vault/'SISTEMA/prompts', self.vault/'SISTEMA/Tutoriais']

    def tearDown(self):
        self.temp.cleanup()

    def search(self, query, **kwargs):
        return router.discover(self.roots, query, vault=self.vault, **kwargs)

    def test_pt_en_domain_cases_and_negatives(self):
        cases = [
            ('Quero montar um processo de criação de conteúdo para o meu Instagram', 'Editorial Content Planning'),
            ('I want to build a content creation workflow for my Instagram', 'Editorial Content Planning'),
            ('Preciso de negociação de vendas', 'Sales Negotiation'),
            ('Help with sales negotiation', 'Sales Negotiation'),
            ('Programação Python para backend', 'Python Software'),
            ('Implement Python software', 'Python Software'),
            ('Campanhas de tráfego e anúncios', 'Paid Advertising'),
            ('Paid advertising campaigns', 'Paid Advertising'),
            ('Oferta e precificação', 'Offer Pricing'),
            ('Offer pricing', 'Offer Pricing'),
        ]
        for query, expected in cases:
            with self.subTest(query=query):
                result = self.search(query)
                self.assertEqual(result['skills'][0]['name'], expected)
                self.assertNotIn('Geological Minerals', [row['name'] for row in result['skills']])
        for query in ['quero criar uma para com meu', 'I want to build a workflow', 'quantum entanglement experiment', 'xyzzy']:
            self.assertEqual(self.search(query)['matching'], 0, query)

    def test_full_briefs_and_incidental_domain_mentions(self):
        entries = {
            'specification': ('Technical Requirements', 'Write specifications and requirements for API software.'),
            'decomposition': ('Implementation Decomposition', 'Break software requirements into implementation work units.'),
            'sms': ('SMS Marketing', 'Plan SMS marketing campaigns using short code and transactional messages.'),
            'commits': ('Commit Planning', 'Plan commits as reviewable units, keeping tests and docs with code.'),
            'offer': ('Offer Design', 'Construir proposta de valor e garantia. Use em Oferta / Estratégia da oferta.'),
        }
        for folder, (name, description) in entries.items():
            path = self.root / folder / 'SKILL.md'
            path.parent.mkdir()
            path.write_text('---\nname: ' + name + '\ndescription: ' + description + '\n---\n')
        brief = 'Planejar conteúdo calendário editorial Instagram marca fictícia Estúdio Horizonte curso fotografia celular público iniciantes'
        self.assertEqual(self.search(brief)['skills'][0]['name'], 'Editorial Content Planning')
        names = [row['name'] for row in self.search('Plan implementation API Node SQLite software code decompose requirements tasks')['skills']]
        self.assertIn('Technical Requirements', names)
        self.assertIn('Implementation Decomposition', names)
        self.assertNotIn('SMS Marketing', names)
        self.assertNotIn('Commit Planning', names)
        names = [row['name'] for row in self.search('Oferta estratégia marketing consultoria fictícia organização pessoal')['skills']]
        self.assertIn('Offer Design', names[:3])

    def test_frontmatter_disclosure_and_pagination(self):
        fields = router.metadata(self.root/'sales-negotiation/SKILL.md')
        self.assertIn('\nSales objection', fields['description'])
        self.assertNotEqual(router.metadata(self.root/'content-calendar/SKILL.md')['description'], '>')
        rows, offset = [], 0
        while True:
            result = self.search('', limit=3, offset=offset)
            rows += result['skills']
            if result['next_offset'] is None:
                break
            offset = result['next_offset']
        self.assertEqual(len(rows), 8)
        self.assertEqual(Counter(row['kind'] for row in rows), {'skill': 6, 'prompt': 1, 'tutorial': 1})
        self.assertTrue(all(not row['automatic'] for row in rows if row['kind'] != 'skill'))
        self.assertEqual([row['path'] for row in rows], [row['path'] for row in self.search('')['skills']])

    def test_boundaries_flags_and_host_evidence(self):
        outside = Path(self.temp.name)/'outside'
        outside.mkdir()
        (outside/'SKILL.md').write_text('---\nname: Escape\ndescription: content planning\n---\n')
        (self.root/'escape').symlink_to(outside)
        (self.root/'content-calendar'/'disable.md').write_text('irrelevant')
        path = self.root/'content-calendar/SKILL.md'
        path.write_text(path.read_text().replace('description:', 'disable-model-invocation: true\ndescription:'))
        result = self.search('content planning', host_skills=['Editorial Content Planning'])
        self.assertTrue(any(issue['reason'] == 'outside_vault' for issue in result['issues']))
        row = next(row for row in result['skills'] if row['name'] == 'Editorial Content Planning')
        self.assertFalse(row['automatic'])
        self.assertTrue(row['status']['host_available'])
        self.assertFalse(row['status']['instructions_read'])
        self.assertFalse(row['status']['execution_verified'])
        with self.assertRaisesRegex(ValueError, 'query_limit'):
            self.search('x' * (router.QUERY_LIMIT + 1))
        (self.root/'oversize').mkdir()
        (self.root/'oversize/SKILL.md').write_text('x' * (router.READ_LIMIT + 1))
        self.assertTrue(any(issue['reason'] == 'read_limit' for issue in self.search('')['issues']))

    def test_cli_receipt_and_unavailable_selected_vault(self):
        receipt = Path(self.temp.name)/'receipt.json'
        command = [sys.executable, str(SCRIPT), '--no-host-roots', '--vault', str(self.vault), '--query', 'content planning', '--receipt', str(receipt)]
        result = subprocess.run(command, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout)
        data = json.loads(receipt.read_text())
        self.assertFalse(data['execution_verified'])
        self.assertTrue(data['router_sha256'])
        command[command.index(str(self.vault))] = str(self.vault/'absent')
        result = subprocess.run(command, capture_output=True, text=True)
        self.assertEqual(result.returncode, 2)
        self.assertEqual(json.loads(result.stdout)['error'], 'selected_vault_unavailable')

    def test_multiple_profiles_require_explicit_selection(self):
        installed = Path(self.temp.name)/'router'
        (installed/'scripts').mkdir(parents=True)
        (installed/'references').mkdir()
        shutil.copyfile(SCRIPT, installed/'scripts/discover.py')
        other = Path(self.temp.name)/'other-vault'
        other.mkdir()
        context = {'profiles': {'one': {'vault': str(self.vault)}, 'two': {'vault': str(other)}}}
        (installed/'references/context.json').write_text(json.dumps(context))
        command = [sys.executable, str(installed/'scripts/discover.py'), '--no-host-roots']
        result = subprocess.run(command, capture_output=True, text=True)
        self.assertEqual(set(json.loads(result.stdout)['requires_vault_selection']), {str(self.vault), str(other)})
        result = subprocess.run(command + ['--vault', str(self.vault)], capture_output=True, text=True)
        self.assertEqual(json.loads(result.stdout)['vault'], str(self.vault))


def fixture_report(vault):
    roots = [vault/'SISTEMA/skills', vault/'SISTEMA/prompts', vault/'SISTEMA/Tutoriais']
    inventory = router.discover(roots, '', limit=10000, vault=vault)
    queries = ['Quero montar um processo de criação de conteúdo para o meu Instagram',
               'I want to build a content creation workflow for my Instagram',
               'Oferta e precificação', 'Sales negotiation', 'Código Python backend',
               'Paid advertising campaigns', 'quantum entanglement experiment']
    report = {'fixture': str(vault), 'router_version': router.VERSION,
              'inventory': dict(Counter(row['kind'] for row in inventory['skills'])),
              'matching': inventory['matching'], 'issues': inventory['issues'], 'evaluations': []}
    for query in queries:
        result = router.discover(roots, query, vault=vault)
        report['evaluations'].append({'query': query, 'matching': result['matching'],
            'top': [{'path': row['path'], 'kind': row['kind'], 'score': row['score'], 'name': row['name']} for row in result['skills'][:5]],
            'issues': result['issues']})
    briefs = [
        ('Planejar estratégia de conteúdo e calendário editorial Instagram para marca fictícia Studio Aurora curso de fotografia com celular público iniciantes', {'social'}, {'sms'}),
        ('Plan implementation API Node SQLite software code decompose requirements tasks', {'sdd-spec', 'sdd-tasks', 'to-tickets'}, {'sms', 'work-unit-commits', 'work-unit-commits-distribuicao'}),
        ('Oferta e estratégia marketing para consultoria fictícia de organização pessoal', {'offers', 'gate-de-validacao-da-oferta'}, set()),
    ]
    for query, expected, rejected in briefs:
        result = router.discover(roots, query, vault=vault)
        folders = [Path(row['path']).parent.name for row in result['skills']]
        assert expected & set(folders[:5]), (query, folders[:5])
        assert not rejected & set(folders), (query, rejected & set(folders))
        report['evaluations'].append({'query': query, 'matching': result['matching'],
            'top': [{'path': row['path'], 'kind': row['kind'], 'score': row['score'], 'name': row['name']} for row in result['skills'][:5]],
            'issues': result['issues'], 'regression_passed': True})
    output = REPO/'.work/router-readiness/public-fixture-report.json'
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'report': str(output), 'inventory': report['inventory'], 'matching': report['matching']}))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--fixture-vault', type=Path)
    args, remaining = parser.parse_known_args()
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(Routing)
    outcome = unittest.TextTestRunner(verbosity=2).run(suite)
    if args.fixture_vault and outcome.wasSuccessful():
        fixture_report(args.fixture_vault)
    raise SystemExit(0 if outcome.wasSuccessful() else 1)
