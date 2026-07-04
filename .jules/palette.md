## 2024-06-25 - [Context-Aware Focus Styles]
**Learning:** Standard `:focus-visible` outlines (using the brand color) often fail accessibility contrast ratios when applied to interactive elements situated within components sharing the same brand color background (like a primary `.navbar`).
**Action:** When implementing global focus styles, always evaluate their contrast against primary and secondary background regions. Define context-specific overrides (e.g., `.navbar :focus-visible { outline: white }`) to ensure keyboard navigability remains visible across the entire application interface.
