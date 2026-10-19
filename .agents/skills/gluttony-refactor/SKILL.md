---
name: gluttony-refactor
description: "Structured refactoring with behavioral contract preservation: rename, extract, inline, consolidate, and move ownership while guaranteeing zero behavioral regression via verification bracketing."
argument-hint: "[path]"
metadata:
  category: "engineering"
  tags: ["refactor", "safe-restructure", "contract-preservation", "verification", "lean"]
---

# Gluttony Refactor

Restructure code while preserving behavior. Every structural edit is bracketed by verification: prove current behavior first, apply the minimal transformation, then prove behavior is unchanged.

---

## 1. Scope & Safety Boundaries

* **Behavior-Preserving Only:** This skill restructures code (rename, extract, inline, move, consolidate) without changing observable behavior. If a refactor requires behavioral changes, stop and clarify with the user.
* **Auto-Escalation:** Automatically escalate to `strict` mode when refactoring touches authentication, payments, data migrations, public APIs, or shared interfaces (`[strict: contract boundary touched]`).
* **Scope Resolution:** If `[path]` is provided, refactor that target. If omitted, detect git modified files (`git diff --name-only`) or ask the user for scope.
* **Destructive Gate:** Require explicit confirmation before deleting files, removing public exports, or consolidating modules that have external consumers.

---

## 2. The Refactor Protocol

Every refactoring operation follows this strict sequence:

### Phase 1: Investigate
1. **Map the blast radius:** Trace all callers, importers, and dependents of the target code. Identify public API surfaces, shared types, and cross-module contracts.
2. **Identify the transformation:** Name the refactoring operation precisely (Extract Function, Inline Variable, Move Module, Rename Symbol, Consolidate Duplicates).
3. **Assess risk:** Classify as low (internal rename), medium (extract/inline with multiple callers), or high (move/consolidate across module boundaries or public API surface).

### Phase 2: Baseline
4. **Establish behavioral proof:** Run existing tests, type checks, or linter passes that cover the target code. Record the baseline result. If no tests exist, state this explicitly and recommend the user add coverage before proceeding (or accept the risk).

### Phase 3: Transform
5. **Apply the smallest structural diff:** Execute the refactoring as the minimal set of edits. One refactoring operation per commit-unit — do not bundle unrelated changes.
6. **Preserve all contracts:** Public function signatures, exported types, API response shapes, database schemas, and configuration keys must remain unchanged unless the user explicitly requests a breaking change.

### Phase 4: Verify
7. **Re-run the baseline:** Execute the same tests, type checks, and linter passes from Phase 2. Compare results.
8. **Disclose gaps:** If verification cannot be run (no test runner, CI-only tests), state unverified status explicitly. Never claim behavioral equivalence without proof.

---

## 3. Supported Refactoring Operations

### 3.1 Extract
* **Extract Function/Method:** Pull a code block into a named function. Callers receive the new function call; behavior is identical.
* **Extract Variable/Constant:** Replace repeated expressions with a named binding.
* **Extract Module/File:** Move a cohesive set of functions or types into a dedicated module. Update all import paths.

### 3.2 Inline
* **Inline Function:** Replace a trivial or single-caller function with its body. Remove the now-dead function.
* **Inline Variable:** Replace a variable used once with its value expression.

### 3.3 Rename
* **Rename Symbol:** Rename a function, variable, type, or file across all references in the workspace. Verify no string-based references (dynamic imports, reflection) are missed.

### 3.4 Move
* **Move Function/Class:** Relocate to a more appropriate module. Update all import paths and re-export if the old path was public.
* **Move File/Directory:** Restructure file layout. Update all references.

### 3.5 Consolidate
* **Merge Duplicates:** Identify near-duplicate implementations and unify into a single function with the superset of behavior. Redirect all callers.
* **Collapse Indirection:** Remove passthrough wrappers, single-implementor interfaces, and delegation chains that add no value.

---

## 4. Anti-Patterns (What NOT to Do)

* **No scope creep:** Do not fix bugs, add features, or change formatting during a refactor. One concern per operation.
* **No speculative generalization:** Do not introduce abstractions, interfaces, or parameterization "for future flexibility" while refactoring.
* **No silent contract breaks:** If a refactor would change a public signature, type, or return value, stop and flag it as a breaking change requiring user approval.
* **No untested consolidation:** Do not merge duplicate code without verifiable proof that callers behave identically after unification.

---

## 5. Output Format

Report each refactoring operation as:

```
### [Operation]: [target]
- **Blast radius:** [N callers, M files]
- **Risk:** [low|medium|high]
- **Baseline:** [test suite / type check result]
- **Diff:** [summary of structural changes]
- **Verification:** [post-refactor test result] | [UNVERIFIED — reason]
```

Conclude with a 1-line summary:
`**Summary:** N operations applied, M files changed, all verifications passed.`
