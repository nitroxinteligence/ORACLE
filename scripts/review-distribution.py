#!/usr/bin/env python3
"""Prepare private evidence for a distribution review. Never approves or publishes."""
import argparse
import collections
import functools
import re
from pathlib import Path, PurePosixPath

import oracle_distribution as dist


LICENSE_PATTERN = re.compile(r'^(?:licen[cs]e|copying|notice)(?:$|[.-])', re.I)
DEPENDENCY_NAMES = {'package.json', 'requirements.txt', 'pyproject.toml', 'Pipfile',
                    'go.mod', 'Cargo.toml', 'Gemfile', 'environment.yml', 'requirements.yaml'}
PREREQUISITES = re.compile(r'^#{1,6}\s+.*(?:prerequisites?|requirements?|dependencies|requisitos|depend[eê]ncias)', re.I)


def license_label(data):
    """Content labels aid review; they are not redistribution authorization."""
    text = data.decode('utf-8', errors='replace')
    if 'Permission is hereby granted, free of charge' in text and 'THE SOFTWARE IS PROVIDED "AS IS"' in text:
        return 'MIT-candidate'
    if 'Apache License' in text and 'Version 2.0, January 2004' in text:
        return 'Apache-2.0-candidate'
    return 'custom-or-unidentified'


def prepare(source, skills_layout=None):
    dist.require(skills_layout in (None, 'department-specialist-skill'), 'Unknown skills layout')
    initial = dist.inventory(source)
    dist.require(initial['complete'], 'Materialize and resolve inventory problems before preparing a review')
    rows = {row['path']: row for row in initial['files']}
    blobs = {path: dist.read_stable(source / row['source_path']) for path, row in rows.items()}
    hashes = {rows[path]['source_path']: dist.sha(data) for path, data in blobs.items()}
    license_files, groups, dependency_files, sections = {}, {}, {}, {}
    for path, data in blobs.items():
        name = PurePosixPath(path).name
        if LICENSE_PATTERN.match(name):
            digest = dist.sha(data)
            license_files[path] = {'path': path, 'sha256': digest, 'bytes': len(data)}
            groups.setdefault(digest, {'sha256': digest, 'label': license_label(data), 'paths': [], 'reviewed': False})['paths'].append(path)
        if name in DEPENDENCY_NAMES or (name.startswith('requirements') and name.endswith('.txt')):
            dependency_files[path] = {'path': path, 'sha256': dist.sha(data)}
        if path.lower().endswith('.md'):
            # Evidence is a line reference, never an excerpt containing credentials or personal text.
            starts = [number for number, line in enumerate(data.decode('utf-8', errors='replace').splitlines(), 1) if PREREQUISITES.search(line)]
            if starts:
                sections[path] = {'path': path, 'sha256': dist.sha(data), 'heading_lines': starts}

    def within(path, directory):
        return path.startswith(directory + '/')

    licenses_by_directory = collections.defaultdict(list)
    for path, entry in license_files.items():
        licenses_by_directory[str(PurePosixPath(path).parent)].append(entry)

    @functools.lru_cache(maxsize=None)
    def license_candidates(path):
        parent = PurePosixPath(path).parent
        # Stop at the library root: a sibling collection's license grants nothing here.
        while len(parent.parts) >= 2:
            candidates = licenses_by_directory.get(str(parent), [])
            if candidates:
                return sorted(candidates, key=lambda entry: entry['path'])
            parent = parent.parent
        return []

    items = {}
    for path, row in rows.items():
        kind = ('skill' if row['kind'] == 'specialists' and path.startswith('SISTEMA/skills/') and PurePosixPath(path).name == 'SKILL.md'
                else {'prompts': 'prompt', 'tutorials': 'tutorial'}.get(row['kind']) if path.lower().endswith('.md') else None)
        if not kind:
            continue
        nested_candidate = kind == 'skill' and skills_layout == 'department-specialist-skill' and len(PurePosixPath(path).parts) != 6
        if nested_candidate and len(PurePosixPath(path).parts) > 6 and '/'.join(PurePosixPath(path).parts[:5]) + '/SKILL.md' in rows:
            continue  # An existing entry owns this template/subskill resource.
        directory = str(PurePosixPath(path).parent)
        resource_files = sorted(p for p in rows if within(p, directory)) if kind == 'skill' else [path]
        resource_licenses = {p: license_candidates(p) for p in resource_files}
        manifest_evidence = [entry for p, entry in dependency_files.items()
                             if within(p, directory) or within(path, str(PurePosixPath(p).parent))]
        section_evidence = [entry for p, entry in sections.items() if p in resource_files]
        items[path] = {'id': kind + '-' + dist.sha(path.encode())[:20], 'kind': kind,
                       'source_sha256': dist.sha(blobs[path]), 'license_reviewed': False,
                       'dependencies_reviewed': False, 'dependencies': [],
                       'license_candidates': license_candidates(path),
                       'resource_license_files': sorted({entry['path'] for candidates in resource_licenses.values() for entry in candidates}),
                       'resources_without_license_candidate': [p for p, candidates in resource_licenses.items() if not candidates],
                       'dependency_manifests': sorted(manifest_evidence, key=lambda entry: entry['path']),
                       'prerequisite_sections': sorted(section_evidence, key=lambda entry: entry['path']),
                       'dependency_review_status': 'manual-review-required-even-if-no-evidence-found'}
        if nested_candidate:
            items[path].update(entry_role='unclassified', reason='',
                               entry_review_status='classify-exact-bytes-as-phase-skill-or-resource')
    dist.require(dist.inventory(source) == initial, 'Source inventory changed while preparing review')
    report = {'schema_version': dist.SCHEMA, 'content_reviewed': False,
              'source_inventory_sha256': dist.sha(dist.canonical(hashes)), 'licenses': [], 'items': items,
              'license_groups': sorted(groups.values(), key=lambda group: group['paths'][0]),
              'file_license_candidates': {path: license_candidates(path) for path in rows},
              'file_adaptations': [], 'published': False,
              'warning': 'Candidate evidence only. Preserve nested notices, review scope and dependencies; do not approve in bulk.'}
    if skills_layout:
        report['skills_layout'] = skills_layout
    summary = {'files': len(rows), 'items': len(items), 'license_files': len(license_files), 'unique_license_bytes': len(groups),
               'license_labels': dict(collections.Counter(group['label'] for group in groups.values())),
               'items_without_license_candidate': [path for path, item in items.items() if not item['license_candidates']],
               'items_with_dependency_evidence': sum(bool(item['dependency_manifests'] or item['prerequisite_sections']) for item in items.values()),
               'content_reviewed': False, 'published': False, 'source_inventory_sha256': report['source_inventory_sha256']}
    return report, summary


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True, help='New private directory outside source')
    parser.add_argument('--skills-layout', choices=['department-specialist-skill'], help='Keep canonical entries separate from unclassified phase skills and owned templates')
    args = parser.parse_args()
    source, output = args.source.absolute(), args.output.absolute()
    dist.require(not output.is_relative_to(source) and not output.exists() and not output.is_symlink(), 'Output must be new and outside source')
    report, summary = prepare(source, args.skills_layout)
    output.parent.mkdir(parents=True, exist_ok=True)
    fd = dist.directory_fd(output.parent)
    import os
    os.close(fd)
    output.mkdir(mode=0o700)
    for name, value in [('review-draft.json', report), ('summary.json', summary)]:
        with (output / name).open('xb') as stream:
            stream.write(dist.canonical(value))
        (output / name).chmod(0o600)
    print(dist.canonical({key: len(value) if isinstance(value, list) else value for key, value in summary.items()}).decode())


if __name__ == '__main__':
    main()
