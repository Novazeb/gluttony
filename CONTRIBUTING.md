# Contributing to Gluttony

Thank you for your interest in contributing to Gluttony!

Gluttony is maintained by [Novazeb](https://github.com/Novazeb) and enforces strict lean-engineering principles across all supported development environments.

---

## 1. Scope & Language Support

* **Universal & Language-Agnostic:** Gluttony itself is an AI engineering skill that works across **all programming languages and frameworks** (Python, Rust, Go, TypeScript/JavaScript, C++, Java, PHP, etc.).
* **Internal Test Suite:** This repository uses lightweight Node.js scripts (`script/verify.js` and `test/gluttony.test.js`) solely as an internal meta-test to validate manifest schemas, YAML frontmatter, and rule synchronization.

---

## 2. Contribution Standards

1. **The Simplicity Ladder:** All contributions must strictly reject speculative complexity (*YAGNI*).
2. **Comment & Code Hygiene:** PRs must never introduce code-restating comments, decorative banners, or third-party tracking.
3. **Internal Repository Verification:** All PRs modifying this repository must pass `npm test` and `npm run verify` to ensure platform manifests and YAML headers remain structurally valid.
4. **Structured Format:** Any documentation or prompt additions must follow numbered actionable steps and cap lists at 5 items.
5. **Single Source of Truth (SSOT):** Canonical rules live in `skills/gluttony/SKILL.md` and `skills/gluttony-ui/SKILL.md`. Always run `npm run build` after editing rules to sync platform adapters automatically.

---

## 3. Submitting Pull Requests

1. Fork the repository at `https://github.com/Novazeb/gluttony`.
2. Create your feature branch (`git checkout -b feat/your-improvement`).
3. Compile and verify your changes:
   ```bash
   npm run build      # Synchronizes platform adapters from canonical SKILL.md files
   npm test           # Validates frontmatter, schemas, and contrast logic
   npm run verify     # Validates file integrity and attribution hygiene
   npm run benchmark  # Runs comparative evaluation harness
   ```
4. Commit your changes with a conventional commit message:
   ```bash
   git commit -m "feat(rules): clarify accessibility contrast threshold"
   ```
5. Open a Pull Request on GitHub against the `main` branch.
