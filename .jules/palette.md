## 2024-06-13 - Contrasting Focus Indicators on Colored Regions
**Learning:** When adding global `:focus-visible` styles to an application with distinct colored regions (like a blue navbar with `#256AF5` background), the default focus outline (which is often the same brand color) becomes invisible on these regions.
**Action:** Always verify focus indicator contrast against the background it appears on. Add specific overrides (e.g., `.navbar *:focus-visible { outline: 3px solid white; }`) to ensure keyboard navigability remains accessible across all thematic sections of the site.
