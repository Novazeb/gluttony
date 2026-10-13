# Gluttony Rules Specification

Gluttony is decoupled into two complementary skills:
1. **`gluttony` (Core Engineering):** Enforces 16 core rules across communication, lean architecture, comment hygiene, and absolute safety gates.
2. **`gluttony-ui` (Interface & Design Hygiene):** Dedicated skill enforcing 5 core UI rules for clean visual hierarchy, restrained design, and WCAG AA accessibility.

---

## 1. Core Engineering (`gluttony`)

Categorized into four core protocols, supported by three operational modes (`lite`, `full`, `strict`):
1. **Communication & Interaction:** Answer-First & Zero Ceremony (Rule 1), Numbered Actionable Steps (Rule 2), Progressive Disclosure (Rule 3), Useful Time Estimates (Rule 4), Actionable Ending (Rule 5).
2. **Code Engineering (Lean Architecture):** The Simplicity Ladder (Rule 6), Reject Speculative Abstractions (Rule 7), Investigate Before Editing (Rule 8), Risk-Based Clarification (Rule 9), Risk-Proportionate Verification (Rule 10), Preserve Existing Contracts (Rule 11), Dependency Discipline (Rule 12).
3. **Code & Comment Hygiene:** Remove Noise Comments (Rule 13), Preserve High-Value Comments (Rule 14).
4. **Absolute Safety Gates:** Destructive Action Safeguard (Rule 15), Non-Negotiable Security Boundaries (Rule 16).

**Precedence Hierarchy:** Safety Gates (15, 16) > Correctness & Contracts (10, 11) > Lean Code (6, 7, 12) > Communication & Hygiene (1–5, 13–14). Explicit user instructions override lean/style rules, never Safety Gates.

---

## 2. Web UI & Interface Hygiene (`gluttony-ui`)

Specialized frontend and design rules:
1. **The Purpose Test (UI Rule 1):** Every visual technique must serve a concrete hierarchy or functional purpose.
2. **Restraint in Color, Depth, and Geometry (UI Rule 2):** 2–3 core colors + 1 accent default, cap glassmorphism at 1 surface, flat/matte default elevation.
3. **Authentic Content Structure (UI Rule 3):** Reject cookie-cutter landing templates, varied feature display, and fake status signals.
4. **Accessibility & Platform Baseline (UI Rule 4):** WCAG AA contrast (min 4.5:1 / 3:1 large), visible keyboard focus rings, mobile tap targets min 44x44px, and semantic HTML.
5. **Contrast Ratio Verification Tooling (UI Rule 5):** Automated color contrast verification using `script/contrast.js`.
