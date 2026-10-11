#!/usr/bin/env node
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log('Running Gluttony test suite...');

// Test 1: SKILL.md exists and contains required rules
const skillPath = path.join(rootDir, 'skill', 'SKILL.md');
assert.ok(fs.existsSync(skillPath), 'skill/SKILL.md must exist');

const skillContent = fs.readFileSync(skillPath, 'utf8');
assert.ok(skillContent.includes('name: gluttony'), 'Frontmatter must declare name: gluttony');
assert.ok(skillContent.includes('Answer-First'), 'Must contain Answer-First rule');
assert.ok(skillContent.includes('The Simplicity Ladder'), 'Must contain The Simplicity Ladder rule');
assert.ok(skillContent.includes('Cognitive Cap of 5 Items'), 'Must contain Cognitive Cap rule');
assert.ok(skillContent.includes('Read Before Write'), 'Must contain Read Before Write rule');
assert.ok(skillContent.includes('Stop Guessing, Ask Once'), 'Must contain Stop Guessing rule');
assert.ok(skillContent.includes('Accessibility & Mobile Baseline'), 'Must contain Accessibility rule');
assert.ok(skillContent.includes('Single Runnable Verification'), 'Must contain Runnable Verification rule');
assert.ok(skillContent.includes('Mandatory Confirmation for Destructive Actions'), 'Must contain Safety Gate rule');

console.log('[PASS] Test 1: Core rules verified in SKILL.md');

// Test 2: Platform manifests exist and are valid JSON
const manifests = [
  '.claude-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.antigravity-plugin/plugin.json',
  '.openclaw/plugin.json',
  '.opencode/plugin.json',
  '.kiro-plugin/plugin.json',
  'plugin.json',
  'package.json'
];

for (const m of manifests) {
  const p = path.join(rootDir, m);
  assert.ok(fs.existsSync(p), `${m} must exist`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  assert.strictEqual(data.name, 'gluttony', `${m} name must be gluttony`);
}

console.log('[PASS] Test 2: All 8 platform manifests exist and are valid JSON');

// Test 3: Embedded rules exist (Cursor, Agents, Claude, Gemini)
const embeddedRules = [
  '.cursor/rules/gluttony.mdc',
  'AGENTS.md',
  'CLAUDE.md',
  'GEMINI.md'
];

for (const rule of embeddedRules) {
  const p = path.join(rootDir, rule);
  assert.ok(fs.existsSync(p), `${rule} must exist`);
  const content = fs.readFileSync(p, 'utf8');
  assert.ok(content.length > 100, `${rule} must have substantive content`);
}

console.log('[PASS] Test 3: Embedded rules for all IDEs and harnesses verified');

// Test 4: Run contrast test from script
const { execSync } = require('child_process');
const contrastOutput = execSync('node script/contrast.js "#FFFFFF" "#000000"').toString();
assert.ok(contrastOutput.includes('21:1'), 'Black on white contrast should be 21:1');
assert.ok(contrastOutput.includes('PASS'), 'Black on white contrast should PASS');

console.log('[PASS] Test 4: Built-in WCAG contrast script verified');

console.log('\nAll tests PASSED successfully!');
