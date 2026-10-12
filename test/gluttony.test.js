#!/usr/bin/env node
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');

console.log('Running Gluttony Comprehensive Test Suite...');

// --- Test 1: Frontmatter Parsing & Canonical Skill Validation ---
const skillPath = path.join(rootDir, 'skills', 'gluttony', 'SKILL.md');
assert.ok(fs.existsSync(skillPath), 'Canonical skills/gluttony/SKILL.md must exist');

const skillContent = fs.readFileSync(skillPath, 'utf8');
const fmMatch = skillContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
assert.ok(fmMatch, 'SKILL.md must have valid YAML frontmatter delimiters (---)');

const fmText = fmMatch[1];
const fm = {};
for (const line of fmText.split(/\r?\n/)) {
  const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
  if (kv) {
    let val = kv[2].trim().replace(/^["']|["']$/g, '');
    fm[kv[1]] = val;
  }
}

assert.strictEqual(fm.name, 'gluttony', 'Frontmatter name must be "gluttony"');
assert.ok(fm.description && fm.description.length > 20, 'Frontmatter description must be descriptive');
assert.ok(skillContent.includes('argument-hint:'), 'Frontmatter must specify argument-hint');

// Validate Rule Sections & Essential Rules
const requiredRules = [
  'Rule 1: Answer-First & Zero Ceremony',
  'Rule 2: Numbered Actionable Steps',
  'Rule 3: Progressive Disclosure (Cognitive Cap)',
  'Rule 4: Useful Time Estimates',
  'Rule 5: Actionable Ending',
  'Rule 6: The Simplicity Ladder',
  'Rule 7: Reject Speculative Abstractions',
  'Rule 8: Investigate Before Editing',
  'Rule 9: Risk-Based Clarification (Stop Guessing)',
  'Rule 10: Risk-Proportionate Verification',
  'Rule 11: Remove Noise Comments',
  'Rule 12: Preserve High-Value Comments',
  'Rule 13: The Purpose Test',
  'Rule 14: Restraint in Color, Depth, and Geometry',
  'Rule 15: Authentic Content Structure',
  'Rule 16: Accessibility & Platform Baseline',
  'Rule 17: Destructive Action Safeguard',
  'Rule 18: Non-Negotiable Security Boundaries',
  'Rule 19: Preserve Existing Contracts',
  'Rule 20: Dependency Discipline'
];

for (const rule of requiredRules) {
  assert.ok(skillContent.includes(rule), `SKILL.md must contain exact definition: ${rule}`);
}
assert.ok(skillContent.includes('Modes of Operation'), 'SKILL.md must define Modes of Operation');
assert.ok(skillContent.includes('Mode Selection'), 'SKILL.md must define Mode Selection');
assert.ok(skillContent.includes('Auto-Escalation'), 'SKILL.md must define Auto-Escalation');
assert.ok(skillContent.includes('## Precedence'), 'SKILL.md must define Precedence section');
assert.ok(skillContent.includes('Scope Boundary'), 'SKILL.md must define Scope Boundary');
assert.ok(skillContent.includes('`lite`'), 'SKILL.md must define lite mode');
assert.ok(skillContent.includes('`full`'), 'SKILL.md must define full mode');
assert.ok(skillContent.includes('`strict`'), 'SKILL.md must define strict mode');
console.log(`[PASS] Test 1: Canonical SKILL.md validated (${requiredRules.length} rules intact with precedence, boundaries, and modes)`);

// --- Test 2: Platform Manifest Validation & Path Integrity ---
const manifests = [
  { file: '.claude-plugin/plugin.json', checkSkills: true },
  { file: '.codex-plugin/plugin.json', checkSkills: true },
  { file: '.antigravity-plugin/plugin.json', checkSkills: true, checkCommands: true },
  { file: '.openclaw/plugin.json', checkEntry: true },
  { file: '.opencode/plugin.json', checkSkills: true },
  { file: '.kiro-plugin/plugin.json', checkSkills: true },
  { file: '.devin-plugin/plugin.json', checkSkills: true },
  { file: '.grok-plugin/plugin.json', checkSkills: true },
  { file: '.kimi-plugin/plugin.json', checkSkills: true },
  { file: '.qoder-plugin/plugin.json', checkRules: true },
  { file: 'gemini-extension.json', checkSkills: true, checkCommands: true },
  { file: 'opencode.json', checkSkills: true },
  { file: 'plugin.json', checkSkills: true, checkCommands: true },
  { file: 'package.json' }
];

for (const m of manifests) {
  const fullPath = path.join(rootDir, m.file);
  assert.ok(fs.existsSync(fullPath), `Manifest must exist: ${m.file}`);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  assert.strictEqual(data.name, 'gluttony', `${m.file} name must be "gluttony"`);
  assert.ok(data.version, `${m.file} must have version`);
  assert.ok(data.description, `${m.file} must have description`);

  // Verify referenced paths exist
  if (m.checkSkills && data.skills) {
    const skillDir = path.resolve(rootDir, data.skills);
    assert.ok(fs.existsSync(skillDir), `${m.file}: referenced skills dir must exist at ${skillDir}`);
  }
  if (m.checkCommands && data.commands) {
    const cmdDir = path.resolve(rootDir, data.commands);
    assert.ok(fs.existsSync(cmdDir), `${m.file}: referenced commands dir must exist at ${cmdDir}`);
  }
  if (m.checkRules && data.rules) {
    const rulesFile = path.resolve(rootDir, data.rules);
    assert.ok(fs.existsSync(rulesFile), `${m.file}: referenced rules file must exist at ${rulesFile}`);
  }
  if (m.checkEntry && data.entry) {
    const entryFile = path.resolve(rootDir, data.entry);
    assert.ok(fs.existsSync(entryFile), `${m.file}: referenced entry file must exist at ${entryFile}`);
  }
}
console.log(`[PASS] Test 2: All ${manifests.length} platform manifests validated with active path integrity`);

// --- Test 3: Contrast Checker Multi-Format & Target Flags ---
const contrastTests = [
  { fg: '#FFFFFF', bg: '#000000', flag: '--target=normal', expectedPass: true },
  { fg: 'rgb(255, 255, 255)', bg: 'rgb(0, 0, 0)', flag: '--target=normal', expectedPass: true },
  { fg: 'hsl(0, 0%, 100%)', bg: 'hsl(0, 0%, 0%)', flag: '--target=normal', expectedPass: true },
  { fg: '#94a3b8', bg: '#0f172a', flag: '--target=large', expectedPass: true }
];

for (const ct of contrastTests) {
  const cmd = `node script/contrast.js "${ct.fg}" "${ct.bg}" ${ct.flag}`;
  const out = execSync(cmd).toString();
  assert.ok(out.includes('PASS'), `Contrast check should pass for ${ct.fg} on ${ct.bg}`);
}
console.log('[PASS] Test 3: Contrast utility verified across HEX, RGB, HSL, and custom thresholds');

// --- Test 4: False Positive Statusline Hook Validation ---
const bashHook = fs.readFileSync(path.join(rootDir, 'hooks', 'statusline.sh'), 'utf8');
const psHook = fs.readFileSync(path.join(rootDir, 'hooks', 'statusline.ps1'), 'utf8');

assert.ok(bashHook.includes('grep -qi "gluttony"'), 'statusline.sh must verify "gluttony" signature');
assert.ok(psHook.includes('Pattern "gluttony"'), 'statusline.ps1 must verify "gluttony" signature');
console.log('[PASS] Test 4: Statusline hooks verified to prevent generic false-positives');

// --- Test 5: Build Generator Execution ---
execSync('node script/build.js', { stdio: 'pipe' });
console.log('[PASS] Test 5: SSOT Build Generator executed and synchronized');

console.log('\nAll 5 test suites PASSED with flying colors!');
