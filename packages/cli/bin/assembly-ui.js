#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliTsPath = path.join(__dirname, '../src/cli.ts');

const child = spawn('npx', ['tsx', cliTsPath, ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true
});

child.on('close', (code) => {
  process.exit(code || 0);
});
