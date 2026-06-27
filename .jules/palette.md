## 2026-06-27 - Implement Global Focus Indicators
**Learning:** Global CSS focus indicators (e.g., `:focus-visible`) must explicitly specify contrasting outline colors (e.g., `white`) within regions with dark background colors like the `#256AF5` primary background used in `.navbar` to ensure visibility.
**Action:** Always test keyboard navigation focus visibility on both light and dark backgrounds, adding context-specific `:focus-visible` overrides when global defaults have insufficient contrast.
