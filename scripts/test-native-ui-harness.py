#!/usr/bin/env python3
"""Fast, synthetic tests of the native UI evidence and disk gates; no app launch."""
import copy
import importlib.util
from pathlib import Path
from types import SimpleNamespace
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('native_ui', Path(__file__).with_name('test-native-ui.py'))
driver = importlib.util.module_from_spec(spec)
spec.loader.exec_module(driver)


class NativeUIGates(unittest.TestCase):
    def report(self):
        return {'checks': [{'name': f'fixture assertion {i}', 'pass': True}
                           for i in range(driver.EXPECTED_CHECKS)],
                'passed': driver.EXPECTED_CHECKS, 'failed': 0, 'finished': True,
                'physicalDeviceActivationVerified': False, 'remoteInferenceUsed': False}

    def test_complete_report(self):
        driver.validate_report(self.report())

    def test_empty_or_nonobject_report(self):
        for report in (None, [], {}, ''):
            with self.subTest(report=report), self.assertRaises(RuntimeError):
                driver.validate_report(report)

    def test_no_assertions_is_not_success(self):
        report = self.report(); report.update(checks=[], passed=0)
        with self.assertRaises(RuntimeError): driver.validate_report(report)

    def test_partial_assertions(self):
        report = self.report(); report['checks'].pop()
        with self.assertRaises(RuntimeError): driver.validate_report(report)

    def test_duplicate_assertions(self):
        report = self.report(); report['checks'][1] = copy.deepcopy(report['checks'][0])
        with self.assertRaises(RuntimeError): driver.validate_report(report)

    def test_nonobject_assertion(self):
        report = self.report(); report['checks'][0] = None
        with self.assertRaises(RuntimeError): driver.validate_report(report)

    def test_missing_name(self):
        report = self.report(); report['checks'][0].pop('name')
        with self.assertRaises(RuntimeError): driver.validate_report(report)

    def test_failed_assertion_despite_success_summary(self):
        report = self.report(); report['checks'][0]['pass'] = False
        with self.assertRaises(RuntimeError): driver.validate_report(report)

    def test_truthy_is_not_true(self):
        report = self.report(); report['checks'][0]['pass'] = 'true'
        with self.assertRaises(RuntimeError): driver.validate_report(report)

    def test_count_mismatch_or_boolean_counts(self):
        for key, value in [('passed', 0), ('passed', True), ('failed', 1), ('failed', False)]:
            report = self.report(); report[key] = value
            with self.subTest(key=key, value=value), self.assertRaises(RuntimeError):
                driver.validate_report(report)

    def test_fatal_report_is_never_success(self):
        report = self.report(); report['fatal'] = 'synthetic interruption'
        with self.assertRaises(RuntimeError): driver.validate_report(report)

    def test_completion_required(self):
        report = self.report(); report['finished'] = False
        with self.assertRaises(RuntimeError): driver.validate_report(report)

    def test_isolation_limits_required(self):
        for key in ('physicalDeviceActivationVerified', 'remoteInferenceUsed'):
            report = self.report(); report.pop(key)
            with self.subTest(key=key), self.assertRaises(RuntimeError):
                driver.validate_report(report)

    def test_low_disk_fails_before_fixture_work(self):
        with patch.object(driver.shutil, 'disk_usage', return_value=SimpleNamespace(free=driver.MIN_FREE_BYTES - 1)):
            with self.assertRaisesRegex(RuntimeError, 'No database repair or automatic cleanup'):
                driver.require_headroom(Path('.'), 'unit fixture')

    def test_disk_boundary_records_exact_measurement(self):
        with patch.object(driver.shutil, 'disk_usage', return_value=SimpleNamespace(free=driver.MIN_FREE_BYTES)):
            result = driver.require_headroom(Path('.'), 'unit fixture')
            self.assertEqual(result['freeBytes'], driver.MIN_FREE_BYTES)
            self.assertEqual(result['phase'], 'unit fixture')


if __name__ == '__main__':
    unittest.main(verbosity=2)
