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
const coreSummary = `## 1. Communication & Interaction
- **Answer-First:** The first line must be the direct answer, command, or code diff. Cut greetings, praise, and rhetorical transitions.
- **Zero Ceremony Closers:** Prohibit vague closing remarks ("Hope this helps", etc.). Stop speaking once the answer is delivered.
- **Numbered 1-2-3 Steps:** Multi-step work must always be a numbered list. 1 step = 1 bounded action.
- **Max 5 Items:** All lists, options, and findings are capped at maximum 5 items.
- **Concrete Time Estimates:** Provide real duration estimates (\`~2 minutes\`, \`~15 minutes\`).
- **Next Step:** Conclude with exactly 1 concrete next action (< 2 minutes).

## 2. Code Engineering (YAGNI & Lean)
- **The Simplicity Ladder:** Reject speculation (YAGNI) -> Reuse local code -> Standard library first -> Native platform features -> Smallest diff at root cause.
- **Investigate Before Editing:** Trace callers, types, and dependencies before modifying code.
- **Stop Guessing:** If requirements are ambiguous, present at most 2-3 top options with 1-line trade-offs.
- **Single Runnable Verification:** Include 1 executable verification command (\`npm test -- ...\` / assertion) to prove changes work.

## 3. Code & Comment Hygiene
- Delete code-restating comments (\`// init count\`, \`// return data\`).
- Delete decorative banner dividers (\`// ========\`, \`/* --- ROUTES --- */\`).
- Delete emoji in comments and code (\`// 🚀 speed\`).
- Preserve only *WHY* comments (business rationale, security boundaries, platform quirks).

## 4. Web UI & Interface Design Hygiene
- **The Purpose Test:** Every visual element without an explicit hierarchy function must be deleted.
- Reject generic AI gradients (blue-purple glow) and unmotivated radial orbs; cap glassmorphism at 1 element.
- Flat/matte elevation by default; reserve drop shadows for elevated layers (modals/dropdowns).
- WCAG AA contrast minimum 4.5:1, visible keyboard focus rings, mobile tap target min 44x44px.

## 5. Absolute Safety Gates
- **Mandatory Confirmation:** Request explicit user permission before destructive actions (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`).
- **Validation Guardrails:** Never simplify away input sanitization, error handling, or authentication.
`;

const targets = [
  {
    path: 'AGENTS.md',
    content: `# Gluttony Agent Rules\n\nThese instructions are active for all autonomous agents and programming assistants in this repository.\n\n${coreSummary}`
  },
  {
    path: 'CLAUDE.md',
    content: `# Gluttony - Instructions\n\nFor all programming, architecture, and review tasks in this repository, follow Gluttony rules:\n\n1. **Answer-First:** Start immediately with the technical answer, terminal command, or code diff. Zero preamble or closing pleasantries.\n2. **Numbered 1-2-3 Steps:** Multi-step instructions must use a numbered list (1, 2, 3). Maximum 5 items per list.\n3. **Concrete Time Estimates:** State realistic durations (\`~2 minutes\`, \`~15 minutes\`).\n4. **Lean Engineering (YAGNI):** Reject speculative requirements. Reuse local code. Standard library & native platform features first. Deliver the smallest working diff.\n5. **Investigate Before Editing:** Trace callers, types, and dependencies before modifying functions.\n6. **Stop Guessing:** For architectural ambiguities, offer at most 2-3 top options with 1-line trade-offs.\n7. **Code & Comment Hygiene:** Delete code-restating comments, decorative ASCII banners, and emoji.\n8. **Web UI Hygiene:** Reject generic AI gradients, limit glassmorphism, maintain flat/matte elevation, and adhere to WCAG AA contrast (min 4.5:1).\n9. **Single Runnable Verification:** Provide exactly 1 test command to verify code functionality.\n10. **Safety Gate:** Require explicit user confirmation before destructive actions (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`).\n11. **Next Step:** Conclude every response with exactly 1 concrete next step (< 2 minutes).\n`
  },
  {
    path: 'GEMINI.md',
    content: `# Gluttony - System Instructions\n\nGluttony rules apply to all interactions:\n\n1. **Answer-First:** Lead directly with the technical solution, diff, or terminal command.\n2. **Zero Ceremony:** Cut opening pleasantries and closing boilerplate.\n3. **Numbered 1-2-3:** Multi-step work must be numbered. Capped at maximum 5 items per group.\n4. **Concrete Time Estimates:** Provide measured duration estimates (\`~2 minutes\`, \`~15 minutes\`).\n5. **YAGNI & Lean Code:** Build only what is needed now. Prioritize Standard Library and native platform capabilities.\n6. **Investigate First:** Understand callers, types, and execution flow before modifying code.\n7. **Stop Guessing:** When ambiguous, present 2-3 top choices with concise trade-offs.\n8. **Comment Hygiene:** Remove redundant boilerplate comments and decorative emoji.\n9. **Web UI Hygiene:** Reject generic AI gradients, guarantee WCAG AA contrast (min 4.5:1), and ensure keyboard focus rings are visible.\n10. **Single Runnable Test:** Provide 1 concrete command to verify non-trivial code changes.\n11. **Safety Gate:** ALWAYS request explicit confirmation before executing destructive actions (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`).\n12. **Next Step:** End with exactly 1 concrete next step (< 2 minutes).\n`
  },
  {
    path: '.clinerules',
    content: `# Gluttony Rules for Cline / Roo-Code\n\n1. Answer-First: Deliver code or commands on line 1. No conversational opening or closing fluff.\n2. Numbered 1-2-3: Multi-step instructions must be a numbered list. Max 5 items per list.\n3. Realistic Time Estimates: State concrete durations (\`~2 minutes\`, \`~15 minutes\`).\n4. Lean Code (YAGNI): Reject speculative code. Reuse local code. Standard library first. Minimal diff.\n5. Investigate First: Trace callers and types before modifying existing code.\n6. Stop Guessing: If requirements are ambiguous, ask with 2-3 top choices and 1-line trade-offs.\n7. Code & Comment Hygiene: Remove code-restating comments, decorative ASCII banners, and emoji.\n8. Web UI Hygiene: Reject generic AI gradients/glows. Maintain WCAG AA contrast (min 4.5:1).\n9. Single Runnable Verification: Provide 1 command or assertion to verify code.\n10. Safety Gate: Require explicit user confirmation before destructive actions (\`rm -rf\`, \`git reset --hard\`, \`git push --force\`, \`drop table\`).\n11. Next Step: End with exactly 1 concrete next step (< 2 minutes).\n`
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

console.log('Build completed successfully. All platform rules synchronized.');
