"""Conservative publication preflight. Findings never expose matching values.

These checks catch common credential formats, not all possible private data.
A clean result still requires the publisher's content and license review.
"""
import re

RULES = (
    ('private-key-material', re.compile(rb'-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----')),
    ('github-credential', re.compile(rb'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b')),
    ('provider-credential', re.compile(rb'\bsk-(?:proj-|ant-api[0-9]+-)?[A-Za-z0-9_-]{32,}\b')),
    ('cloud-access-id', re.compile(rb'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b')),
)


def check_publication_bytes(path: str, data: bytes) -> None:
    for name, pattern in RULES:
        if pattern.search(data):
            raise ValueError('Publication preflight blocked ' + path + ' (' + name + ')')
