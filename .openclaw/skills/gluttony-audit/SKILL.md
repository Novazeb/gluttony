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
* **Frontend Projects:** For UI-specific bloat (dead CSS, orphaned components, gratuitous animations), combine with [`gluttony-ui strict`](../gluttony-ui/SKILL.md) mode.
* **Scope Resolution:** If `[path]` is provided, audit that target file or directory. If omitted or empty, detect git modified files (`git diff --name-only`) or inspect the workspace repository root.

---

## 2. The 3 Audit Axes

### Axis 1: YAGNI, Speculation & Architectural Indirection
* **Single-Implementor Interfaces:** Interfaces or abstract types implemented by only one class/module (e.g., `IUserService` -> `UserService`).
* **Speculative Abstractions & Generic Wrappers:** Unused generic wrappers, multi-driver adapters where only one provider exists, or premature Factory/Builder classes.
* **Dead Code & Unused Exports:** Exported helpers, types, or configuration options not consumed by any caller in the workspace.
* **Pointless Indirection:** Passthrough functions or multi-layer delegation chains that perform no data transformation.

### Axis 2: Dependency Bloat vs Native/Stdlib
* **Redundant Utility Libraries:** Dependencies solvable via native platform features or standard library.
  * **Node.js:** `lodash` → ES2020+ (`flatMap`, `structuredClone`); `moment` → `Intl.DateTimeFormat`; `axios` → native `fetch` (Node 18+); `chalk` → `node:util.styleText`; `mkdirp`/`rimraf` → `fs.mkdirSync`/`fs.rmSync` with `{ recursive: true }`.
  * **Python:** `requests` → `urllib.request`; `six` → drop (Python 2 compat); `pathlib2` → `pathlib`; `typing-extensions` on 3.11+ → `typing`.
  * **Go:** `github.com/pkg/errors` → `fmt.Errorf` with `%w`; `io/ioutil` → `io`/`os` (deprecated since Go 1.16).

### Axis 3: Comment Hygiene & Boilerplate Slop
* **Code Paraphrasing Comments:** Comments that restate what the code clearly expresses (`// increment count`, `// return response`, `// initialize variable`).
* **Decorative Dividers & Headers:** ASCII banners, section dividers (`// ====================`, `/* --- CONTROLLERS --- */`).
* **Emoji & Visual Noise:** Emoji in source code comments or logs.
* **Vague / Non-Actionable Comments:** TODOs lacking concrete owner, context, or issue link. (Preserve ONLY non-obvious *WHY* comments).

---

## 3. Output Schema (Ranked Punch-List)

Output findings grouped strictly by severity. Exactly one line per finding formatted as:
`- \`<path>:<line>\` — <issue/bloat> → <lean fix/native replacement>`

Conclude with exactly one line summary of impact:
`**Summary:** X findings (Y high, Z medium, W low), estimated ~N lines pruned, M dependencies removed.`

### Example Output
```markdown
### High
- `src/utils/date.ts:12` — dependency `moment` → replace with native `Intl.DateTimeFormat`
- `src/services/wrapper.ts:1-45` — passthrough wrapper with no transformation → remove wrapper, call service directly

### Medium
- `src/services/user.ts:4` — single-implementor interface `IUserService` → remove interface, use concrete class directly

### Low
- `src/api/auth.ts:45` — code-paraphrasing comment `// validate token` → remove redundant comment

**Summary:** 4 findings (2 high, 1 medium, 1 low), estimated ~60 lines pruned, 1 dependency removed.
```
