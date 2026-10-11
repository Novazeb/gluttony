# Gluttony

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/Novazeb/gluttony)
[![Author: Novazeb](https://img.shields.io/badge/author-Novazeb-black.svg)](https://github.com/Novazeb)

A high-precision, lean engineering mode designed to enforce YAGNI, eliminate AI boilerplate and noise comments, prevent UI slop, and minimize cognitive load.

Created and maintained by **[Novazeb](https://github.com/Novazeb)**.

---

## Core Philosophy

> **"Maximum signal, zero fluff, relentless execution."**

1. **The Best Code is the Code Never Written:** Reject speculative complexity (*YAGNI*). Prioritize the Standard Library and native platform features over third-party dependencies.
2. **Answer-First Communication:** Responses start immediately with the action, solution, or code diff. No conversational preamble, no closing pleasantries.
3. **Cognitive Clarity:** Hard limit of 5 items per list, numbered 1-2-3 actionable steps, and concrete time estimates.
4. **Code & UI Hygiene:** Strip redundant comments that merely echo the syntax. Reject cookie-cutter landing page templates, fake pulsing badges, and AI default gradients.
5. **Absolute Safety Gates:** Mandatory explicit confirmation before executing any destructive commands (`rm -rf`, `git reset --hard`, `git push --force`, `drop table`).

---

## Directory Structure

```
gluttony/
├── .agents/                    # Autonomous agent plugins
├── .antigravity-plugin/        # Antigravity plugin manifest
├── .claude-plugin/             # Claude Code plugin manifest
├── .codex-plugin/              # OpenAI Codex plugin manifest
├── .cursor/rules/              # Auto-applied Cursor IDE rules (.mdc)
├── .devin-plugin/              # Devin manifest
├── .github/                    # Issue templates, PR template, CI workflow
├── .grok-plugin/               # Grok plugin manifest
├── .kimi-plugin/               # Kimi plugin manifest
├── .kiro/ & .kiro-plugin/      # Kiro steering rules & manifest
├── .openclaw/                  # OpenClaw skill and manifest
├── .opencode/                  # OpenCode plugin manifest
├── .qoder/ & .qoder-plugin/    # Qoder rules & manifest
├── .windsurf/rules/            # Windsurf IDE rules
├── assets/                     # Icons and visual branding
├── commands/                   # /gluttony slash command
├── docs/                       # Architecture and migration guides
├── examples/                   # Before vs After code examples
├── hooks/                      # Terminal statusline indicators
├── script/                     # contrast.js & verify.js
├── skill/ & skills/            # Core SKILL.md definition
├── test/                       # Automated test suite
├── .clinerules                 # Cline / Roo-Code rules
├── .gitignore                  # Git ignore rules
├── AGENTS.md, CLAUDE.md        # Always-on instructions
├── GEMINI.md, INSTALL.md       # Always-on instructions & install guide
├── CHANGELOG.md, SECURITY.md   # Release notes & security policies
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # Official MIT License (Novazeb)
├── package.json, plugin.json   # NPM & Root plugin manifests
└── README.md                   # Global documentation
```

---

## Usage

### 1. On-Demand Activation
* **Slash Command:** Type `/gluttony` in your agent's chat interface.
* **Direct Instruction:**
  ```
  Use Gluttony mode for this development task.
  ```

### 2. Embedded & Always-On
Gluttony automatically applies without explicit invocation across supported harnesses:
* **Cursor IDE:** Automatically applied to all workspaces via `.cursor/rules/gluttony.mdc`.
* **Claude Code:** Read on session initialization via `CLAUDE.md`.
* **Autonomous Agents & Codex:** Automatically loaded via `AGENTS.md`.
* **Gemini & Antigravity CLI:** Automatically loaded via `GEMINI.md`.

---

## Verification & Utilities

Run the automated test suite:
```bash
npm test
```

Run the integrity verification script:
```bash
npm run verify
```

Calculate WCAG AA color contrast ratio:
```bash
node script/contrast.js "#FFFFFF" "#111827"
```

---

## Contributing & Security

* **Contributing:** Please read [CONTRIBUTING.md](CONTRIBUTING.md) for pull request guidelines.
* **Security:** Report vulnerabilities according to [SECURITY.md](SECURITY.md).

---

## License

MIT License. Copyright (c) 2026 [Novazeb](https://github.com/Novazeb/gluttony).
