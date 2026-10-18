---
name: gluttony-ui
description: "High-precision Web UI & interface design hygiene: eliminates generic AI slop, enforces WCAG AA accessibility, authentic visual hierarchy, and deliberate minimalist design."
argument-hint: "[lite|full|strict]"
metadata:
  category: "design"
  tags: ["ui-ux", "clean-ui", "accessibility", "wcag", "minimalism"]
---

# Gluttony UI

Clean, accessible, purpose-driven user interfaces. Eliminate generic AI templates, monotonic cyan-purple gradients, and fake visual signals. Every visual element must serve a concrete hierarchy or functional purpose.

---

## Modes of Operation

Gluttony UI supports three execution intensities via `[lite|full|strict]`:

* **`lite`**: Focused visual tweaks. Minimal CSS and component diffs, targeted color or spacing adjustments without restructuring page layout.
* **`full`** (default): Standard balanced UI engineering. Purpose-driven layout hierarchy, WCAG AA compliance, visible focus states, and mobile touch targets.
* **`strict`**: Maximum accessibility and visual rigor. Mandatory WCAG AA contrast verification via `script/contrast.js`, complete keyboard navigation focus traps, explicit ARIA role validation, and full mobile reflow verification.

---

## Scope Boundary
Apply UI hygiene rules strictly to UI components and views you build or modify. Leave existing styling in untouched code untouched. Project design tokens, established component libraries (Tailwind, Radix, shadcn), and explicit user design requests override default styling constraints.

---

## Core UI Rules

### Rule 1: The Purpose Test
* Every visual technique (gradients, shadows, blurs, animations) must serve a concrete hierarchy or functional purpose.
* If a visual element exists merely "to look tech" or as an "AI template default", delete it.

### Rule 2: Restraint in Color, Depth, and Geometry
* **Default Color Palette:** Limit palettes to 2–3 core colors + 1 deliberate accent. Avoid unmotivated generic AI gradients (e.g. blue-to-purple / cyan glows) and background radial glow orbs unless project design tokens mandate them.
* **Cap Glassmorphism:** Limit `backdrop-filter: blur()` to at most 1 surface by default (e.g. floating navigation).
* **Proportionate Radii:** Avoid making every button, card, and input a pill shape (`rounded-full`). Use deliberate, proportionate radius scales.
* **Matte & Flat Elevation:** Flat/matte elevation by default. Reserve drop shadows exclusively for true elevated layers (modals, dropdown menus).

### Rule 3: Authentic Content Structure
* **Reject Cookie-Cutter Landing Templates:** Layouts must reflect actual content needs, not an arbitrary template sequence (`Hero -> 3 Cards -> Fake Testimonials -> FAQ -> Footer`).
* **Varied Feature Hierarchy:** Flagship features deserve prominent display (full-width or interactive previews), while minor features belong in concise lists.
* **Reject Fake Decorative Signals:** Do not use pulsing green dots that do not reflect real server status, generic sparkle/lightning icons, or emoji inside button text.

### Rule 4: Accessibility & Platform Baseline
* **Color Contrast (WCAG AA):** Minimum contrast ratio of 4.5:1 for standard text and 3:1 for large text.
* **Keyboard Navigation:** All interactive elements must show a distinct, visible focus ring when navigated via `Tab`.
* **Mobile Tap Targets:** Interactive elements must have a minimum touch target size of 44x44 pixels on mobile viewports.
* **Semantic & Assistive Support:** Maintain valid semantic HTML, accessible name computation, logical focus order, and respect user motion preferences (`prefers-reduced-motion`).

### Rule 5: Contrast Ratio Verification Tooling
* Verify color combinations using the built-in zero-dependency contrast utility:
  ```bash
  node script/contrast.js "#FFFFFF" "#111827" --target=normal
  ```
* Never guess contrast ratios when selecting text and background colors for custom themes.

---

## Bloat Auditing

For passive read-only audits of UI component bloat (unused imports, dead CSS, orphaned components), run the [`gluttony-audit`](../gluttony-audit/SKILL.md) skill against the frontend directory.
