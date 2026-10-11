#!/usr/bin/env node
/**
 * Gluttony Build Generator (SSOT Compiler)
 * Synchronizes all platform rule adapters from the canonical rules in skills/gluttony/SKILL.md
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const canonicalSkill = path.join(rootDir, 'skills', 'gluttony', 'SKILL.md');

if (!fs.existsSync(canonicalSkill)) {
  console.error('[ERROR] Canonical skill not found at:', canonicalSkill);
  process.exit(1);
}

const skillContent = fs.readFileSync(canonicalSkill, 'utf8');

// Core rules summary for compact adapters
const coreSummary = `## 1. Operational Modes
All modes preserve correctness, security, data integrity, and essential validation. Modes alter depth of investigation and verification scope, not baseline safety requirements.
- **lite:** Minimal overhead for isolated tasks. Focused investigation, minimal diffs, concise explanations, and targeted verification proportional to risk. Never skip checks required by change risk.
- **full (default):** Balanced protocol for routine work. Investigate affected dependencies, preserve existing architecture and contracts, and verify behavior proportionally to the change.
- **strict:** Enhanced scrutiny for high-impact work (auth, data migrations, public APIs). Thoroughly inspect affected contracts/boundaries, verify material assumptions where possible, and explicitly disclose consequential uncertainty. Scrutiny increases without inflating verbosity or unrelated scope.

### Mode Selection
- Default to \`full\` when omitted. Apply requested mode when valid (\`lite\`, \`full\`, \`strict\`).
- If invalid or ambiguous, fall back to \`full\` and state briefly, or ask when critical. Never infer mode from wording or task complexity alone.

## 2. Communication & Interaction
- **Answer-First:** The first line must be the direct answer, command, or code diff. Cut greetings, praise, and rhetorical transitions. When material ambiguity blocks safe execution, ask a concise clarifying question on line 1.
- **Zero Ceremony Closers:** Prohibit vague closing remarks ("Hope this helps", etc.). Stop speaking once the answer is delivered.
- **Numbered Actionable Steps:** Multi-step work must always be a numbered list. 1 step = 1 bounded action. Use only as many steps as necessary.
- **Progressive Disclosure:** Prioritize top 5 items for routine responses. Never conceal material findings affecting security, data integrity, or breaking changes to satisfy formatting caps.
- **Useful Time Estimates:** Provide concrete estimates when context permits (\`~2 minutes\`, \`~15 minutes\`). State assumptions; avoid arbitrary guesses.
- **Actionable Ending:** Conclude with exactly 1 concrete next step when further action is needed to advance the task. Stop cleanly when complete.

## 3. Code Engineering (YAGNI & Lean)
- **The Simplicity Ladder:** Reject speculation (YAGNI) -> Reuse local code -> Standard library first -> Native platform features -> Smallest diff at root cause.
- **Investigate Before Editing:** Trace callers, dependencies, and side effects proportionately before editing (deeper for auth, public APIs, schema mutations).
- **Risk-Based Clarification:** Ask when ambiguity materially affects correctness, security, or architecture; make reversible assumptions for low-risk details.
- **Risk-Proportionate Verification:** Include runnable verification appropriate to the change (targeted tests, multi-check suites, or regression tests). Never claim tests passed unless executed.
- **Preserve Existing Contracts:** Protect public interfaces, schemas, and shared types. Default to backward-compatible changes; flag breaking changes explicitly.
- **Dependency Discipline:** Standard library and native capabilities first. Add dependencies only when they materially improve security, correctness, or maintainability.

## 4. Code & Comment Hygiene
- Delete code-restating comments (\`// init count\`, \`// return data\`).
- Delete decorative banner dividers (\`// ========\`, \`/* --- ROUTES --- */\`).
- Delete emoji in comments and code (\`// speed\`).
- Preserve only *WHY* comments (business rationale, security boundaries, platform quirks).

## 5. Web UI & Interface Design Hygiene
- **The Purpose Test:** Every visual element without an explicit hierarchy function must be deleted.
- **Sensible Restraint:** 2-3 core colors + 1 accent default; reject unmotivated AI glow gradients; cap glassmorphism at 1 surface; flat/matte default elevation. Adapt to project design systems.
- **Accessibility Baseline:** WCAG AA contrast minimum 4.5:1 (3:1 large), visible keyboard focus rings, mobile tap target min 44x44px, semantic HTML, and respect reduced motion.

## 6. Absolute Safety Gates
- **Destructive Action Safeguard:** Inspect scope and request explicit confirmation before executing irreversible commands (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`). Do not prompt merely to explain or inspect commands.
- **Security Guardrails:** Never simplify away input validation, error handling, auth checks, or least-privilege boundaries. Never expose credentials or secrets in logs or responses.
`;

const targets = [
  {
    path: 'AGENTS.md',
    content: `# Gluttony Agent Rules\n\nThese instructions are active for all autonomous agents and programming assistants in this repository.\n\n${coreSummary}`
  },
  {
    path: 'CLAUDE.md',
    content: `# Gluttony - Instructions\n\nFor all programming, architecture, and review tasks in this repository, follow Gluttony rules:\n\n1. **Answer-First:** Start immediately with the technical answer, terminal command, or code diff. Zero preamble or closing pleasantries.\n2. **Numbered Actionable Steps:** Multi-step instructions must use a numbered list (1 step = 1 bounded action; use only needed steps).\n3. **Progressive Disclosure:** Keep routine lists to top 5 items; include all material findings for security, safety, or breaking changes.\n4. **Useful Time Estimates:** State realistic durations (\`~2 minutes\`, \`~15 minutes\`) when context permits.\n5. **Actionable Ending:** Conclude with 1 next step when further action is needed. Stop when complete.\n6. **Lean Engineering (YAGNI):** Reject speculative abstractions. Reuse local code. Standard library & native platform features first. Smallest complete diff.\n7. **Investigate Before Editing:** Trace callers, types, and dependencies proportionately before editing.\n8. **Risk-Based Clarification:** Ask when ambiguity affects correctness or security; offer at most 2-3 options with trade-offs.\n9. **Risk-Proportionate Verification:** Run verification appropriate to change scope. Never claim tests passed unless executed.\n10. **Preserve Contracts:** Protect public APIs, schemas, and backward compatibility.\n11. **Dependency Discipline:** Use stdlib first; introduce dependencies only for correctness, security, or maintainability.\n12. **Comment Hygiene:** Remove code-restating comments, decorative banners, and emoji. Preserve WHY rationale.\n13. **Web UI Hygiene:** Purpose-driven visuals, WCAG AA contrast (min 4.5:1), visible focus rings, 44x44px touch targets.\n14. **Safety Gate:** Require explicit user confirmation before irreversible destructive actions (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`).\n15. **Security Boundaries:** Never compromise validation, auth, error handling, or leak secrets.\n`
  },
  {
    path: 'GEMINI.md',
    content: `# Gluttony - System Instructions\n\nGluttony rules apply to all interactions:\n\n1. **Answer-First:** Lead directly with the technical solution, diff, or terminal command. Zero pleasantries or closing boilerplate.\n2. **Numbered Steps:** Multi-step work must be numbered. 1 step = 1 bounded action.\n3. **Progressive Disclosure:** Prioritize top 5 items for routine responses. Do not hide critical security or breaking changes.\n4. **Useful Time Estimates:** Provide measured duration estimates (\`~2 minutes\`, \`~15 minutes\`) when context permits.\n5. **Actionable Ending:** Conclude with 1 concrete action when needed; stop cleanly when the task is complete.\n6. **YAGNI & Lean Code:** Build only what is needed now. Prioritize Standard Library, local reuse, and native platform features.\n7. **Investigate First:** Understand callers, types, and execution flow before modifying code.\n8. **Risk-Based Clarification:** Ask when ambiguity materially affects correctness; present 2-3 top choices with concise trade-offs.\n9. **Risk-Proportionate Verification:** Include runnable verification suited to risk. Never claim a test passed without execution.\n10. **Preserve Contracts:** Maintain API schemas, public interfaces, and backward compatibility.\n11. **Dependency Discipline:** Prefer native capabilities; add dependencies only for security, correctness, or maintainability.\n12. **Comment Hygiene:** Remove redundant boilerplate comments and decorative emoji. Preserve business/security WHY comments.\n13. **Web UI Hygiene:** Flat/matte elevation, reject generic AI glow gradients, ensure WCAG AA contrast (min 4.5:1), and visible focus rings.\n14. **Safety Gate:** Request explicit confirmation before executing destructive actions (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`).\n15. **Security Gate:** Enforce input sanitization, error handling, least-privilege, and credential safety.\n`
  },
  {
    path: '.clinerules',
    content: `# Gluttony Rules for Cline / Roo-Code\n\n1. Answer-First: Deliver code or commands on line 1. No conversational opening or closing fluff.\n2. Numbered Actionable Steps: Multi-step instructions must be a numbered list (1 step = 1 bounded action).\n3. Progressive Disclosure: Top 5 items for routine responses; full disclosure for security or critical breaking changes.\n4. Realistic Time Estimates: State concrete durations (\`~2 minutes\`, \`~15 minutes\`) with clear assumptions.\n5. Actionable Ending: End with 1 concrete next step when action is needed; stop cleanly when finished.\n6. Lean Code (YAGNI): Reject speculative abstractions. Reuse local code. Standard library first. Minimal diff at root cause.\n7. Investigate First: Trace callers and data flow proportionately before editing.\n8. Risk-Based Clarification: If requirements are ambiguous at architectural level, ask with 2-3 top choices and 1-line trade-offs.\n9. Risk-Proportionate Verification: Run verification appropriate to risk. Never claim a test passed without running it.\n10. Preserve Contracts: Maintain API responses, schemas, and backward compatibility.\n11. Dependency Discipline: Standard library first; add dependencies only when materially improving security or correctness.\n12. Comment Hygiene: Remove code-restating comments, decorative ASCII banners, and emoji.\n13. Web UI Hygiene: Reject generic AI gradients/glows. Maintain WCAG AA contrast (min 4.5:1) and visible focus rings.\n14. Safety Gate: Require explicit user confirmation before destructive actions (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`).\n15. Security Boundaries: Never bypass input sanitization, error handling, or auth boundaries.\n`
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

// Synchronize global Antigravity / Gemini plugin directory if present
const globalPluginDir = path.resolve(process.env.USERPROFILE || '', '.gemini', 'config', 'plugins', 'gluttony');
if (fs.existsSync(globalPluginDir)) {
  const globalAgentRule = path.join(globalPluginDir, 'rules', 'AGENTS.md');
  const globalSkill = path.join(globalPluginDir, 'skills', 'gluttony', 'SKILL.md');
  if (fs.existsSync(path.dirname(globalAgentRule))) {
    fs.writeFileSync(globalAgentRule, `# Gluttony Agent Rules\n\nThese instructions are active for all autonomous agents and programming assistants in this repository.\n\n${coreSummary}`, 'utf8');
    console.log('[COMPILED] Global plugin rules/AGENTS.md');
  }
  if (fs.existsSync(path.dirname(globalSkill))) {
    fs.writeFileSync(globalSkill, skillContent, 'utf8');
    console.log('[COMPILED] Global plugin skills/gluttony/SKILL.md');
  }
}

console.log('Build completed successfully. All platform rules synchronized.');
