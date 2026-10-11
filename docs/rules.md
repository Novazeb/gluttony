# Gluttony Rules Specification

Gluttony enforces 20 core engineering rules categorized into five protocols, supported by three operational modes (`lite`, `full`, `strict`):

1. **Communication & Interaction:** Answer-First & Zero Ceremony (Rule 1), Numbered Actionable Steps (Rule 2), Progressive Disclosure (Rule 3), Useful Time Estimates (Rule 4), Actionable Ending (Rule 5).
2. **Code Engineering (Lean Architecture):** The Simplicity Ladder (Rule 6), Reject Speculative Abstractions (Rule 7), Investigate Before Editing (Rule 8), Risk-Based Clarification (Rule 9), Risk-Proportionate Verification (Rule 10), Preserve Existing Contracts (Rule 19), Dependency Discipline (Rule 20).
3. **Comment Hygiene:** Remove Noise Comments (Rule 11), Preserve High-Value Comments (Rule 12).
4. **Web UI & Interface Hygiene:** The Purpose Test (Rule 13), Restraint in Color, Depth, and Geometry (Rule 14), Authentic Content Structure (Rule 15), Accessibility & Platform Baseline (Rule 16).
5. **Absolute Safety Gates:** Destructive Action Safeguard (Rule 17), Non-Negotiable Security Boundaries (Rule 18).

Execution intensities (all modes preserve correctness, security, and essential validation):
- **`lite`**: Focused investigation, minimal diffs, concise explanations, and targeted verification proportional to risk.
- **`full`**: Balanced engineering, preserve existing architecture and contracts, proportional verification across affected dependencies.
- **`strict`**: Enhanced scrutiny for high-impact work (auth, data, public APIs), inspect affected contracts and boundaries, verify material assumptions, and explicitly disclose consequential uncertainty.
