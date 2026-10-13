# Adopting Gluttony in an Existing Project

This guide outlines how to migrate an existing codebase to Gluttony principles without breaking existing business logic.

---

## 3-Step Adoption Process

1. **Phase 1: Code Comment Cleanup (~5 minutes)**
   * Scan for comments that restate code syntax (`// set variable`, `// return result`).
   * Delete decorative banners (`// ==================`) and emoji.
   * Retain only comments explaining *why* (security boundaries, domain rules, platform quirks).

2. **Phase 2: Dependency & Abstraction Audit (~15 minutes)**
   * Inspect dependencies in `package.json` / `requirements.txt`.
   * Replace trivial one-function packages with standard library or native web primitives (e.g. native `fetch`, native `<dialog>`).
   * Remove interfaces with only 1 implementation and unneeded factory layers.

3. **Phase 3: Embed Universal Guardrails (~2 minutes)**
   * Copy `AGENTS.md`, `CLAUDE.md`, or `.cursor/rules/gluttony.mdc` into your project root.
   * Verify that your AI assistant enforces the 16 core Gluttony rules automatically (plus `gluttony-ui` for frontend tasks).
