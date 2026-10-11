# Contributing to Gluttony

Thank you for your interest in contributing to Gluttony!

Gluttony is maintained by [Novazeb](https://github.com/Novazeb) and follows strict lean-engineering principles.

---

## Contribution Rules

1. **The Simplicity Ladder:** All contributions must strictly avoid speculative complexity (*YAGNI*).
2. **Zero Attribution Leaks:** PRs must never introduce code-comments that restate syntax, decorative banners, or third-party tracking.
3. **Automated Verification:** All PRs must pass `npm test` and `npm run verify`.
4. **Step-by-Step Format:** Any documentation or prompt additions must follow numbered actionable steps and cap lists at 5 items.

---

## Submitting Pull Requests

1. Fork the repository at `https://github.com/Novazeb/gluttony`.
2. Create your feature branch (`git checkout -b feat/lean-enhancement`).
3. Run tests locally:
   ```bash
   npm test
   npm run verify
   ```
4. Commit your changes with a conventional commit message (`git commit -m "feat: enhance prompt accuracy"`).
5. Open a Pull Request on GitHub.
