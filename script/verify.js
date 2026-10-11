#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const requiredFiles = [
  'skills/gluttony/SKILL.md',
  '.claude-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.antigravity-plugin/plugin.json',
  '.cursor/rules/gluttony.mdc',
  '.openclaw/plugin.json',
  '.openclaw/SKILL.md',
  '.opencode/plugin.json',
  '.kiro-plugin/plugin.json',
  'commands/gluttony.toml',
  'AGENTS.md',
  'CLAUDE.md',
  'GEMINI.md',
  'plugin.json',
  'package.json'
];

let failed = false;

console.log('--- Verifying Gluttony Setup ---');

// 1. Check file existence
for (const relPath of requiredFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] File missing: ${relPath}`);
    failed = true;
  } else {
    console.log(`[PASS] Exists: ${relPath}`);
  }
}

// 2. Check JSON validity
const jsonFiles = requiredFiles.filter(f => f.endsWith('.json'));
for (const relPath of jsonFiles) {
  const fullPath = path.join(rootDir, relPath);
  try {
    const raw = fs.readFileSync(fullPath, 'utf8');
    JSON.parse(raw);
    console.log(`[PASS] Valid JSON: ${relPath}`);
  } catch (err) {
    console.error(`[FAIL] Invalid JSON in ${relPath}:`, err.message);
    failed = true;
  }
}

// 3. Scan for forbidden attribution leaks or third-party links (Zero tolerance)
const forbiddenPatterns = [
  /DietrichGebert/i,
  /JuliusBrussee/i,
  /ayghri/i,
  /miqdadbadjuber/i,
  /ponytail/i,
  /caveman/i,
  /i-have-adhd/i,
  /anti-slop/i,
  /github\.com\/(DietrichGebert|JuliusBrussee|ayghri|miqdadbadjuber)/i
];

for (const relPath of requiredFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(content)) {
        console.error(`[FAIL] Attribution leak detected in ${relPath}: ${pattern}`);
        failed = true;
      }
    }
  }
}

if (failed) {
  console.error('\nVerification failed: found traces of third-party names!');
  process.exit(1);
} else {
  console.log('\nVerification SUCCESS: 100% clean, zero attribution leaks detected across all files.');
  process.exit(0);
}
