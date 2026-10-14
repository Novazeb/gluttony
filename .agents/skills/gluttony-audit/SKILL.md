---
name: gluttony-audit
description: "Passive, read-only codebase auditor: scans for YAGNI violations, speculative abstractions, redundant dependencies, and AI comment slop. Outputs a ranked deletion punch-list."
argument-hint: "[path]"
metadata:
  category: "audit"
  tags: ["yagni", "code-audit", "lean", "dependency-trimming", "anti-bloat"]
---

# Gluttony Audit

Strictly passive, read-only over-engineering and bloat auditor. Identifies code and dependencies that should not exist, and outputs a single-line-per-finding deletion punch-list.

---

## 1. Absolute Scope & Safety Boundaries

* **Strictly Read-Only:** NEVER modify, create, or delete files. Tool execution is restricted to read, search, and non-mutating inspection commands.
* **Not a General Code Review:** Do NOT inspect bugs, logic errors, runtime performance, security vulnerabilities, or code formatting. Focus exclusively on bloat, speculative architecture, unnecessary dependencies, and comment noise.
* **Scope Resolution:** If `[path]` is provided, audit that target file or directory. If omitted or empty, detect git modified files (`git diff --name-only`) or inspect the workspace repository root.

---

## 2. The 3 Audit Axes

### Axis 1: YAGNI, Speculation & Architectural Indirection
* **Single-Implementor Interfaces:** Interfaces or abstract types implemented by only one class/module (e.g., `IUserService` -> `UserService`).
* **Speculative Abstractions & Generic Wrappers:** Unused generic wrappers, multi-driver adapters where only one provider exists, or premature Factory/Builder classes.
* **Dead Code & Unused Exports:** Exported helpers, types, or configuration options not consumed by any caller in the workspace.
* **Pointless Indirection:** Passthrough functions or multi-layer delegation chains that perform no data transformation.

### Axis 2: Dependency Bloat vs Native/Stdlib
* **Redundant Utility Libraries:** Dependencies solvable via native platform features or standard library:
  * `lodash` / `underscore` -> Native ES2020+ methods (`flatMap`, `Object.fromEntries`, `structuredClone`).
  * `moment` / `dayjs` -> Native `Intl.DateTimeFormat` or `Date`.
  * `axios` / `got` / `node-fetch` -> Native `fetch` (Node 18+, modern browser runtimes).
  * `chalk` / `picocolors` -> Native ANSI escape sequences or `node:util.styleText`.
  * `mkdirp` / `rimraf` -> Native `fs.mkdirSync(path, { recursive: true })` / `fs.rmSync(path, { recursive: true, force: true })`.

### Axis 3: Comment Hygiene & Boilerplate Slop
* **Code Paraphrasing Comments:** Comments that restate what the code clearly expresses (`// increment count`, `// return response`, `// initialize variable`).
* **Decorative Dividers & Headers:** ASCII banners, section dividers (`// ====================`, `/* --- CONTROLLERS --- */`).
* **Emoji & Visual Noise:** Emoji in source code comments or logs.
* **Vague / Non-Actionable Comments:** TODOs lacking concrete owner, context, or issue link. (Preserve ONLY non-obvious *WHY* comments).

---

## 3. Output Schema (Ranked Punch-List)

Output findings grouped strictly by severity. Exactly one line per finding formatted as:
`- \`<path>:<line>\` — <masalah/bloat> → <solusi pangkas/alternatif native>`

Conclude with exactly one line summary of impact:
`**Ringkasan:** X temuan (Y high, Z medium, W low), estimasi ~N baris bisa dipangkas, M dependensi bisa dihapus.`

### Example Output
```markdown
### High
- `src/utils/date.ts:12` — dependensi `moment` → ganti native `Intl.DateTimeFormat`
- `src/services/wrapper.ts:1-45` — passthrough wrapper tanpa transformasi → hapus wrapper, panggil service langsung

### Medium
- `src/services/user.ts:4` — interface `IUserService` implementor tunggal → hapus interface, gunakan class langsung

### Low
- `src/api/auth.ts:45` — komentar paraphrase `// validate token` → hapus komentar

**Ringkasan:** 4 temuan (2 high, 1 medium, 1 low), estimasi ~60 baris bisa dipangkas, 1 dependensi bisa dihapus.
```
