#!/usr/bin/env python3
"""Compile the public icon loader in isolation; tests never contact a remote service."""
from pathlib import Path
import subprocess,shutil
root=Path(__file__).resolve().parent.parent;work=root/'.work/icon-tests';work.mkdir(parents=True,exist_ok=True)
shutil.copy(root/'scripts/plugin-icons-tests.swift',work/'main.swift')
subprocess.run(['swiftc','-O',str(root/'Sources/Oracle/PluginIcons.swift'),str(work/'main.swift'),'-o',str(work/'test-icons')],check=True)
subprocess.run([str(work/'test-icons')],check=True)
