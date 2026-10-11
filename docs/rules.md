# Gluttony Rules Specification

Gluttony enforces 18 core engineering rules categorized into five protocols:

1. **Communication & Interaction:** Answer-First, No Ceremony, 1-2-3 Steps, Max 5 Items, Concrete Time Estimates, Next Concrete Step.
2. **Code Engineering:** The Simplicity Ladder (YAGNI, Local Reuse, Standard Library First, Native Features, Smallest Diff), Reject Speculative Abstractions, Read Before Write, Stop Guessing, Single Runnable Verification.
3. **Comment Hygiene:** Delete code-echoing comments, banner dividers, and decorative emoji. Preserve architectural and security rationale.
4. **Web UI Hygiene:** The Purpose Test, Restraint in color/gradients/glassmorphism, Authentic layout hierarchy, WCAG AA contrast (min 4.5:1), visible focus rings, mobile tap targets min 44x44px.
5. **Absolute Safety Gates:** Mandatory explicit confirmation before destructive commands (`rm -rf`, `git reset --hard`, `git push --force`, `drop table`). Never compromise security or validation boundaries.
