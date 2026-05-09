## 2025-05-08 - Nested Interactive Elements & Vanilla Focus Management
**Learning:** Found `<button><a>` patterns breaking tab order and screen readers. When using pure HTML/CSS without a UI framework, global keyboard focus states often get overlooked because browsers have removed or minimized default outlines.
**Action:** Always prefer a single semantic tag (`<a>` styled as a button OR `<button>` with JS routing) and ensure a global `*:focus-visible` is implemented early in vanilla CSS projects.
