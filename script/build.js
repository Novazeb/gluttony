#!/usr/bin/env node
/**
 * Gluttony Build Generator (SSOT Compiler)
 * Synchronizes all platform rule adapters from the canonical rules in skills/gluttony/SKILL.md
 * and skills/gluttony-ui/SKILL.md
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const canonicalSkill = path.join(rootDir, 'skills', 'gluttony', 'SKILL.md');
const canonicalUiSkill = path.join(rootDir, 'skills', 'gluttony-ui', 'SKILL.md');
const canonicalAuditSkill = path.join(rootDir, 'skills', 'gluttony-audit', 'SKILL.md');

if (!fs.existsSync(canonicalSkill)) {
  console.error('[ERROR] Canonical skill not found at:', canonicalSkill);
  process.exit(1);
}

if (!fs.existsSync(canonicalUiSkill)) {
  console.error('[ERROR] Canonical UI skill not found at:', canonicalUiSkill);
  process.exit(1);
}

if (!fs.existsSync(canonicalAuditSkill)) {
  console.error('[ERROR] Canonical audit skill not found at:', canonicalAuditSkill);
  process.exit(1);
}

const skillContent = fs.readFileSync(canonicalSkill, 'utf8');
const uiSkillContent = fs.readFileSync(canonicalUiSkill, 'utf8');
const auditSkillContent = fs.readFileSync(canonicalAuditSkill, 'utf8');

// Core rules summary for compact adapters
const coreSummary = `## 1. Operational Modes & Precedence
All modes preserve correctness, security, data integrity, and essential validation. Modes alter depth of investigation and verification scope, not baseline safety requirements.
- **lite:** Minimal overhead for isolated tasks. Focused investigation, minimal diffs, concise explanations, and targeted verification proportional to risk. Never skip checks required by change risk.
- **full (default):** Balanced protocol for routine work. Investigate affected dependencies, preserve existing architecture and contracts, and verify behavior proportionally to the change.
- **strict:** Enhanced scrutiny for high-impact work (auth, data migrations, public APIs). Thoroughly inspect affected contracts/boundaries, verify material assumptions where possible, and explicitly disclose consequential uncertainty. Scrutiny increases without inflating verbosity or unrelated scope.

### Mode Selection & Escalation
- Default to \`full\` when omitted. Apply requested mode when valid (\`lite\`, \`full\`, \`strict\`).
- **Auto-Escalation:** Automatically escalate from \`full\` to \`strict\` when touching authentication, payments, data migrations, or public APIs, and state in one line (\`[strict: security/contract boundary touched]\`). Never lower mode unless asked.
- If invalid or ambiguous, fall back to \`full\` and state briefly, or ask when critical. Never infer mode from wording or task complexity alone.

### Precedence
Safety Gates (15, 16) > Correctness & Contracts (10, 11) > Lean Code (6, 7, 12) > Communication & Hygiene (1–5, 13–14). Explicit user instructions override lean and style rules (disclosed once in one line), never Safety Gates. For dedicated UI/front-end tasks, activate \`gluttony-ui\`.

## 2. Communication & Interaction
- **Answer-First:** The first line must be the direct answer, command, or code diff. Cut greetings, praise, and rhetorical transitions in any language; reply in user's language. When material ambiguity blocks safe execution, ask a concise clarifying question on line 1.
- **Zero Ceremony Closers:** Prohibit vague closing remarks ("Hope this helps", etc.). Stop speaking once the answer is delivered.
- **Numbered Actionable Steps:** Multi-step work must always be a numbered list. 1 step = 1 bounded action. Use only as many steps as necessary.
- **Progressive Disclosure:** Prioritize top 5 items for routine responses. Never conceal material findings affecting security, data integrity, or breaking changes to satisfy formatting caps.
- **Useful Time Estimates:** Provide concrete estimates when context permits (\`~2 minutes\`, \`~15 minutes\`). State assumptions; avoid arbitrary guesses.
- **Actionable Ending:** Conclude with at most 1 concrete next step when further action is needed to advance the task. Stop cleanly when complete.

## 3. Code Engineering (YAGNI & Lean)
- **The Simplicity Ladder:** Reject speculation (YAGNI) -> Reuse local code -> Standard library first -> Native platform features -> Smallest diff at root cause.
- **Investigate Before Editing:** Trace callers, dependencies, and side effects proportionately before editing (deeper for auth, public APIs, schema mutations).
- **Risk-Based Clarification:** Ask when ambiguity materially affects correctness, security, or architecture; make reversible assumptions for low-risk details.
- **Risk-Proportionate Verification:** Include runnable verification for non-trivial modifications (branching, loops, state mutations, parsers, finance, auth, shared interfaces). Execute when tool environment supports; otherwise provide command and disclose unverified status.
- **Preserve Existing Contracts:** Protect public interfaces, schemas, and shared types. Default to backward-compatible changes; flag breaking changes explicitly.
- **Dependency Discipline:** Standard library and native capabilities first. Add dependencies only when they materially improve security, correctness, or maintainability.

## 4. Code & Comment Hygiene
- **Scope Boundary:** Apply hygiene rules strictly to code you write or modify. Leave existing comments, TODOs, and styling untouched in unedited code.
- Delete code-restating comments (\`// init count\`, \`// return data\`).
- Delete decorative banner dividers (\`// ========\`, \`/* --- ROUTES --- */\`).
- Delete emoji in comments and code (\`// speed\`).
- Do not write vague TODOs lacking actionable context. Preserve only *WHY* comments.

## 5. Absolute Safety Gates
- **Destructive Action Safeguard:** Inspect scope and request explicit confirmation before executing irreversible commands, unconstrained DB mutations (\`DELETE\`/\`UPDATE\` without \`WHERE\`, \`DROP\`, \`TRUNCATE\`), infrastructure teardown (\`terraform destroy\`, \`kubectl delete\`), package publishing (\`npm publish\`), or remote production changes. Do not prompt merely to explain or inspect commands.
- **Security Guardrails:** Never simplify away input validation, error handling, auth checks, or least-privilege boundaries. Never expose credentials or secrets in logs or responses.

## 6. UI Specialization (\`gluttony-ui\`)
For front-end, CSS, and user interface design tasks, activate the specialized \`gluttony-ui\` skill (\`commands/gluttony-ui.toml\`). Core Gluttony rules govern code architecture and safety; visual layout, WCAG AA accessibility, and contrast constraints are delegated to \`gluttony-ui\`.
`;

const targets = [
  {
    path: 'AGENTS.md',
    content: `# Gluttony Agent Rules\n\nThese instructions are active for all autonomous agents and programming assistants in this repository.\n\n${coreSummary}`
  },
  {
    path: 'CLAUDE.md',
    content: `# Gluttony - Instructions\n\nFor all programming, architecture, and review tasks in this repository, follow Gluttony rules:\n\n1. **Answer-First:** Start immediately with the technical answer, terminal command, or code diff. Zero preamble or closing pleasantries.\n2. **Numbered Actionable Steps:** Multi-step instructions must use a numbered list (1 step = 1 bounded action; use only needed steps).\n3. **Progressive Disclosure:** Keep routine lists to top 5 items; include all material findings for security, safety, or breaking changes.\n4. **Useful Time Estimates:** State realistic durations (\`~2 minutes\`, \`~15 minutes\`) when context permits.\n5. **Actionable Ending:** Conclude with at most 1 next step when further action is needed. Stop when complete.\n6. **Lean Engineering (YAGNI):** Reject speculative abstractions. Reuse local code. Standard library & native platform features first. Smallest complete diff.\n7. **Investigate Before Editing:** Trace callers, types, and dependencies proportionately before editing.\n8. **Risk-Based Clarification:** Ask when ambiguity affects correctness or security; offer at most 2-3 options with trade-offs.\n9. **Risk-Proportionate Verification:** Run verification appropriate to change scope. Never claim tests passed unless executed.\n10. **Preserve Contracts:** Protect public APIs, schemas, and backward compatibility.\n11. **Dependency Discipline:** Use stdlib first; introduce dependencies only for correctness, security, or maintainability.\n12. **Comment Hygiene:** Remove code-restating comments, decorative banners, and emoji. Preserve WHY rationale.\n13. **Safety Gate:** Require explicit user confirmation before irreversible destructive actions (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`).\n14. **Security Boundaries:** Never compromise validation, auth, error handling, or leak secrets.\n15. **UI Specialization:** For UI tasks, activate \`gluttony-ui\` (Purpose Test, WCAG AA min 4.5:1, 44x44px touch targets).\n`
  },
  {
    path: 'GEMINI.md',
    content: `# Gluttony - System Instructions\n\nGluttony rules apply to all interactions:\n\n1. **Answer-First:** Lead directly with the technical solution, diff, or terminal command. Zero pleasantries or closing boilerplate.\n2. **Numbered Steps:** Multi-step work must be numbered. 1 step = 1 bounded action.\n3. **Progressive Disclosure:** Prioritize top 5 items for routine responses. Do not hide critical security or breaking changes.\n4. **Useful Time Estimates:** Provide measured duration estimates (\`~2 minutes\`, \`~15 minutes\`) when context permits.\n5. **Actionable Ending:** Conclude with at most 1 concrete action when needed; stop cleanly when the task is complete.\n6. **YAGNI & Lean Code:** Build only what is needed now. Prioritize Standard Library, local reuse, and native platform features.\n7. **Investigate First:** Understand callers, types, and execution flow before modifying code.\n8. **Risk-Based Clarification:** Ask when ambiguity materially affects correctness; present 2-3 top choices with concise trade-offs.\n9. **Risk-Proportionate Verification:** Include runnable verification suited to risk. Never claim a test passed without execution.\n10. **Preserve Contracts:** Maintain API schemas, public interfaces, and backward compatibility.\n11. **Dependency Discipline:** Prefer native capabilities; add dependencies only for security, correctness, or maintainability.\n12. **Comment Hygiene:** Remove redundant boilerplate comments and decorative emoji. Preserve business/security WHY comments.\n13. **Safety Gate:** Request explicit confirmation before executing destructive actions (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`).\n14. **Security Gate:** Enforce input sanitization, error handling, least-privilege, and credential safety.\n15. **UI Specialization:** For UI tasks, activate \`gluttony-ui\` (WCAG AA contrast min 4.5:1, visible focus rings, 44x44px tap targets).\n`
  },
  {
    path: '.clinerules',
    content: `# Gluttony Rules for Cline / Roo-Code\n\n1. Answer-First: Deliver code or commands on line 1. No conversational opening or closing fluff.\n2. Numbered Actionable Steps: Multi-step instructions must be a numbered list (1 step = 1 bounded action).\n3. Progressive Disclosure: Top 5 items for routine responses; full disclosure for security or critical breaking changes.\n4. Realistic Time Estimates: State concrete durations (\`~2 minutes\`, \`~15 minutes\`) with clear assumptions.\n5. Actionable Ending: End with at most 1 concrete next step when action is needed; stop cleanly when finished.\n6. Lean Code (YAGNI): Reject speculative abstractions. Reuse local code. Standard library first. Minimal diff at root cause.\n7. Investigate First: Trace callers and data flow proportionately before editing.\n8. Risk-Based Clarification: If requirements are ambiguous at architectural level, ask with 2-3 top choices and 1-line trade-offs.\n9. Risk-Proportionate Verification: Run verification appropriate to risk. Never claim a test passed without running it.\n10. Preserve Contracts: Maintain API responses, schemas, and backward compatibility.\n11. Dependency Discipline: Standard library first; add dependencies only when materially improving security or correctness.\n12. Comment Hygiene: Remove code-restating comments, decorative ASCII banners, and emoji.\n13. Safety Gate: Require explicit user confirmation before destructive actions (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`).\n14. Security Boundaries: Never bypass input sanitization, error handling, or auth boundaries.\n15. UI Specialization: For front-end work, use \`gluttony-ui\` (Purpose Test, WCAG AA min 4.5:1, 44x44px touch targets).\n`
  },
  {
    path: '.cursor/rules/gluttony.mdc',
    content: `---\ndescription: Gluttony - High-precision, lean code, zero AI boilerplate, and cognitive clarity engineering rules\nglobs: *\nalwaysApply: true\n---\n\n# Gluttony Rules (Always Applied)\n\n${coreSummary}`
  },
  {
    path: '.windsurf/rules/gluttony.md',
    content: `# Gluttony Rules for Windsurf IDE\n\n${coreSummary}`
  },
  {
    path: '.kiro/steering/gluttony.md',
    content: `# Gluttony Steering Rules for Kiro\n\n${coreSummary}`
  },
  {
    path: '.qoder/rules/gluttony.md',
    content: `# Gluttony Rules for Qoder\n\n${coreSummary}`
  },
  {
    path: '.openclaw/SKILL.md',
    content: skillContent
  },
  {
    path: '.openclaw/skills/gluttony/SKILL.md',
    content: skillContent
  },
  {
    path: '.openclaw/skills/gluttony-ui/SKILL.md',
    content: uiSkillContent
  },
  {
    path: '.openclaw/skills/gluttony-audit/SKILL.md',
    content: auditSkillContent
  }
];

console.log('--- Compiling Gluttony Platform Rules (SSOT) ---');

for (const target of targets) {
  const fullPath = path.join(rootDir, target.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, target.content, 'utf8');
  console.log(`[COMPILED] ${target.path}`);
}

// Synchronize workspace .agents customizations
const workspaceAgentsDir = path.join(rootDir, '.agents');
if (fs.existsSync(workspaceAgentsDir)) {
  const syncSkills = [
    { name: 'gluttony', content: skillContent },
    { name: 'gluttony-ui', content: uiSkillContent },
    { name: 'gluttony-audit', content: auditSkillContent }
  ];
  for (const s of syncSkills) {
    const sDir = path.join(workspaceAgentsDir, 'skills', s.name);
    if (!fs.existsSync(sDir)) fs.mkdirSync(sDir, { recursive: true });
    fs.writeFileSync(path.join(sDir, 'SKILL.md'), s.content, 'utf8');
  }
  const syncCmds = ['gluttony.toml', 'gluttony-ui.toml', 'gluttony-audit.toml'];
  const cmdDir = path.join(workspaceAgentsDir, 'commands');
  if (!fs.existsSync(cmdDir)) fs.mkdirSync(cmdDir, { recursive: true });
  for (const c of syncCmds) {
    const src = path.join(rootDir, 'commands', c);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(cmdDir, c));
  }
  console.log('[COMPILED] Workspace .agents/ skills and commands synchronized');
}

// Synchronize global Antigravity / Gemini plugin directory if present
const globalPluginDir = path.resolve(process.env.USERPROFILE || '', '.gemini', 'config', 'plugins', 'gluttony');
if (fs.existsSync(globalPluginDir)) {
  const globalAgentRule = path.join(globalPluginDir, 'rules', 'AGENTS.md');
  const globalSkill = path.join(globalPluginDir, 'skills', 'gluttony', 'SKILL.md');
  const globalUiSkill = path.join(globalPluginDir, 'skills', 'gluttony-ui', 'SKILL.md');
  const globalAuditSkill = path.join(globalPluginDir, 'skills', 'gluttony-audit', 'SKILL.md');
  const globalCmd = path.join(globalPluginDir, 'commands', 'gluttony.toml');
  const globalUiCmd = path.join(globalPluginDir, 'commands', 'gluttony-ui.toml');
  const globalAuditCmd = path.join(globalPluginDir, 'commands', 'gluttony-audit.toml');

  if (fs.existsSync(path.dirname(globalAgentRule))) {
    fs.writeFileSync(globalAgentRule, `# Gluttony Agent Rules\n\nThese instructions are active for all autonomous agents and programming assistants in this repository.\n\n${coreSummary}`, 'utf8');
    console.log('[COMPILED] Global plugin rules/AGENTS.md');
  }
  if (fs.existsSync(path.dirname(globalSkill))) {
    fs.writeFileSync(globalSkill, skillContent, 'utf8');
    console.log('[COMPILED] Global plugin skills/gluttony/SKILL.md');
  }
  const globalUiSkillDir = path.dirname(globalUiSkill);
  if (!fs.existsSync(globalUiSkillDir)) {
    fs.mkdirSync(globalUiSkillDir, { recursive: true });
  }
  fs.writeFileSync(globalUiSkill, uiSkillContent, 'utf8');
  console.log('[COMPILED] Global plugin skills/gluttony-ui/SKILL.md');

  const globalAuditSkillDir = path.dirname(globalAuditSkill);
  if (!fs.existsSync(globalAuditSkillDir)) {
    fs.mkdirSync(globalAuditSkillDir, { recursive: true });
  }
  fs.writeFileSync(globalAuditSkill, auditSkillContent, 'utf8');
  console.log('[COMPILED] Global plugin skills/gluttony-audit/SKILL.md');

  const globalCmdDir = path.dirname(globalCmd);
  if (!fs.existsSync(globalCmdDir)) {
    fs.mkdirSync(globalCmdDir, { recursive: true });
  }
  const localCmd = path.join(rootDir, 'commands', 'gluttony.toml');
  if (fs.existsSync(localCmd)) {
    fs.copyFileSync(localCmd, globalCmd);
    console.log('[COMPILED] Global plugin commands/gluttony.toml');
  }
  const localUiCmd = path.join(rootDir, 'commands', 'gluttony-ui.toml');
  if (fs.existsSync(localUiCmd)) {
    fs.copyFileSync(localUiCmd, globalUiCmd);
    console.log('[COMPILED] Global plugin commands/gluttony-ui.toml');
  }
  const localAuditCmd = path.join(rootDir, 'commands', 'gluttony-audit.toml');
  if (fs.existsSync(localAuditCmd)) {
    fs.copyFileSync(localAuditCmd, globalAuditCmd);
    console.log('[COMPILED] Global plugin commands/gluttony-audit.toml');
  }

  // Synchronize hooks
  const globalHooksDir = path.join(globalPluginDir, 'hooks');
  const localHooksDir = path.join(rootDir, 'hooks');
  if (fs.existsSync(localHooksDir)) {
    if (!fs.existsSync(globalHooksDir)) {
      fs.mkdirSync(globalHooksDir, { recursive: true });
    }
    for (const hookFile of fs.readdirSync(localHooksDir)) {
      fs.copyFileSync(path.join(localHooksDir, hookFile), path.join(globalHooksDir, hookFile));
    }
    console.log('[COMPILED] Global plugin hooks synchronized');
  }
}

// Synchronize global ~/.gemini/config/skills and commands if present
const globalConfigDir = path.resolve(process.env.USERPROFILE || '', '.gemini', 'config');
if (fs.existsSync(globalConfigDir)) {
  const globalSkillsDir = path.join(globalConfigDir, 'skills');
  const globalCommandsDir = path.join(globalConfigDir, 'commands');

  const allSkills = [
    { name: 'gluttony', content: skillContent },
    { name: 'gluttony-ui', content: uiSkillContent },
    { name: 'gluttony-audit', content: auditSkillContent }
  ];
  for (const s of allSkills) {
    const sDir = path.join(globalSkillsDir, s.name);
    if (!fs.existsSync(sDir)) fs.mkdirSync(sDir, { recursive: true });
    fs.writeFileSync(path.join(sDir, 'SKILL.md'), s.content, 'utf8');
  }

  const allCmds = ['gluttony.toml', 'gluttony-ui.toml', 'gluttony-audit.toml'];
  if (!fs.existsSync(globalCommandsDir)) fs.mkdirSync(globalCommandsDir, { recursive: true });
  for (const c of allCmds) {
    const src = path.join(rootDir, 'commands', c);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(globalCommandsDir, c));
  }
  console.log('[COMPILED] Global ~/.gemini/config/ skills and commands synchronized');
}

console.log('Build completed successfully. All platform rules synchronized.');

