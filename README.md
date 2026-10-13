<div align="center">

<img src="assets/logo.jpg" alt="Gluttony Logo" width="160" style="border-radius: 32px;" />

# Gluttony

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.9.0-green.svg)](https://github.com/Novazeb/gluttony)
[![Author: Novazeb](https://img.shields.io/badge/author-Novazeb-black.svg)](https://github.com/Novazeb)

<p align="center">
A high-precision, lean engineering mode designed to enforce YAGNI, eliminate AI boilerplate and noise comments, prevent UI slop, and minimize cognitive load.
</p>

Created and maintained by **[Novazeb](https://github.com/Novazeb)**.

</div>

---

## Core Philosophy

> **"Minimal sufficient engineering delivers the smallest robust solution that is correct, secure, and verifiable."**

1. **The Best Code is the Code Never Written:** Reject speculative complexity (*YAGNI*). Standard Library and native platform features first. Smallest diff at root cause.
2. **Answer-First Communication:** Lead on line 1 with the direct technical solution, command, or code diff. Zero preamble, zero closing pleasantries. When material ambiguity blocks safe execution, ask a concise clarifying question on line 1.
3. **Progressive Disclosure & Cognitive Clarity:** Prioritize top 5 items for routine responses without concealing critical security, safety, or breaking changes.
4. **Risk-Proportionate Verification & Contract Integrity:** Validate changes proportionally to risk; never break public APIs, schemas, or established contracts.
5. **Absolute Safety Gates:** Inspect scope and require explicit user confirmation before executing irreversible or destructive actions (`rm -rf`, `git reset --hard`, `git push --force`, `drop table`).

---

## Modes of Operation

Gluttony supports three execution intensities via `[lite|full|strict]`. All modes preserve correctness, security, data integrity, and essential validation:

* **`lite`**: Minimal overhead for isolated, low-risk tasks. Focused investigation, minimal diffs, concise explanations, and targeted verification proportional to risk.
* **`full`** (default): Balanced engineering for routine feature work and refactoring. Investigate affected dependencies, preserve existing architecture and contracts, and verify behavior proportionally to the change.
* **`strict`**: Enhanced scrutiny for high-impact work (authentication, payments, data migrations, public APIs). Thoroughly inspect affected contracts/boundaries, verify material assumptions where possible, and explicitly disclose consequential uncertainty. Scrutiny increases without inflating verbosity.

---

## Benchmark Komparatif (5 Skenario Uji)

Evaluasi head-to-head antara **AI Tanpa Gluttony (Raw Baseline)** dan **AI Dengan Gluttony (Minimal Sufficient Engineering)** pada 5 skenario teknis:

| Metrik Evaluasi | AI Tanpa Gluttony | AI Dengan Gluttony | Delta / Peningkatan |
| :--- | :---: | :---: | :---: |
| **Test Pass Rate** | 60% | 100% | +40% keandalan fungsional |
| **Regression Rate** | 40% | 0% | 0 regresi lintas modul |
| **Rata-rata Ukuran Diff** | 56 baris | 17 baris | -70% pemangkasan kode redundan |
| **Rata-rata Token Output** | 638 token | 197 token | -69% penghematan biaya & latensi |
| **Integritas Kontrak & API** | 4/5 | 5/5 | 100% *backward-compatible* |
| **Dependensi Spekulatif** | 2 kasus | 0 kasus | 0 dependensi ad-hoc yang tidak perlu |
| **Noise Komentar & Fluff** | 5/5 (Tinggi) | 0/5 (Nol) | 100% *Answer-first* murni |

### Rincian 5 Skenario Uji:
1. **Bug Fix Terisolasi (Pagination Offset):** Gluttony menghasilkan 4 baris diff terarah pada akar masalah vs 28 baris diff pembengkakan wrapper pada AI biasa.
2. **Fitur Baru (In-Memory Rate Limiter):** Gluttony mengoptimalkan standard library (`Map` & timer bawaan) vs instalasi paket pihak ketiga spekulatif.
3. **Modifikasi Kontrak API (User Profile DTO):** Gluttony menjaga backward-compatibility (Rule 19) tanpa memutus aplikasi consumer/mobile.
4. **Patch Keamanan (Path Traversal & Sanitization):** Gluttony mempertahankan otorisasi dan proteksi rahasia (Rule 18) tanpa melemahkan sistem demi kelulusan tes.
5. **UI Responsif & Aksesibilitas (Navigation Modal):** Gluttony menjamin kontras WCAG AA (7.1:1), keyboard focus trap, dan target sentuh $\ge$44px (Rule 14 & 16) tanpa AI glow template.

Jalankan benchmark secara mandiri:
```bash
npm run benchmark
```

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
├── commands/                   # /gluttony & /gluttony-ui slash commands
├── docs/                       # Architecture, rules, and migration guides
├── examples/                   # Clean code references
├── hooks/                      # Terminal statusline indicators
├── script/                     # build.js, contrast.js & verify.js
├── skills/                     # Canonical SKILL.md definitions (gluttony & gluttony-ui)
├── test/                       # Automated test suite & benchmark runner
│   └── benchmark/              # Comparative benchmark harness
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

## Quick Installation (No Clone Required)

Install Gluttony directly into your AI environment via marketplace commands:

### Claude Code
```bash
/plugin marketplace add Novazeb/gluttony
/plugin install gluttony@gluttony
```

### OpenAI Codex
```bash
codex plugin add Novazeb/gluttony
```

### Antigravity & Gemini CLI
```bash
antigravity plugin install https://github.com/Novazeb/gluttony
```

---

## Usage

### 1. On-Demand Activation
* **Core Engineering:** Type `/gluttony [lite|full|strict]` in your agent's chat interface.
* **UI & Accessibility:** Type `/gluttony-ui` when designing or building frontends, layouts, or verifying WCAG AA contrast.
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

Run the comparative benchmark suite:
```bash
npm run benchmark
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

MIT License. Copyright (c) 2026 [Novazeb](https://github.com/Novazeb).
