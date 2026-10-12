# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2026-10-12

### Added
- **Operational Modes & Auto-Escalation:** Three intensities (`lite`, `full`, `strict`) with automatic one-line escalation for auth, payments, data migrations, and public APIs.
- **Rule Precedence Hierarchy:** Explicit collision resolution: Safety Gates > Correctness & Contracts > Lean Code > Communication & Hygiene.
- **Scope Boundaries:** Hygiene rules strictly isolated to modified code; untouched legacy comments, TODOs, and styling are preserved.
- **Contract Preservation & Dependency Discipline:** Rule 19 (*Preserve Existing Contracts*) and Rule 20 (*Dependency Discipline*).
- **Categorical Destructive Safeguards (Rule 17):** Protection against unconstrained queries (`UPDATE`/`DELETE` without `WHERE`), `TRUNCATE`, infra teardowns, and package publishing.
- **Head-to-Head Comparative Benchmark:** Interactive evaluation runner (`npm run benchmark`) measuring success rate, regressions, diff sizes, and token consumption.
- **Multi-Language Support & Step Flexibility:** Universal zero-ceremony enforcement in any language and flexible step limits.

### Changed
- Refactored Rule 10 into *Risk-Proportionate Verification* with explicit definition of non-trivial code modifications.
- Refactored Rule 5 into *Actionable Ending* with at most one next action.
- Refactored Rule 3 into *Progressive Disclosure* with safety overrides.

## [1.0.0] - 2026-10-11

### Added
- Initial public release of **Gluttony** by [Novazeb](https://github.com/Novazeb).
- Core 18 engineering rules (YAGNI, Answer-First, Cognitive Load Reduction, Comment Hygiene, Web UI Hygiene, Safety Gates).
- Universal multi-platform adapters: Cursor (.mdc), Windsurf, Claude Code, Cline, Devin, Grok, Kimi, Kiro, OpenClaw, OpenCode, Qoder, Gemini CLI, Antigravity.
- Built-in zero-dependency WCAG AA contrast checker utility (`script/contrast.js`).
- Automated verification and test suite (`script/verify.js` and `test/gluttony.test.js`).
