## 2024-05-24 - Interactive State Deficit
**Learning:** The application entirely lacked visual focus states (`:focus-visible`) for keyboard navigation, and had minimal hover/active feedback for mouse users. This meant interactive elements were completely inaccessible to non-mouse users.
**Action:** Added global focus styles with specific high-contrast overrides for dark backgrounds, along with base transition and hover/active states for buttons and links. In future elements, I must proactively check that focus, hover, and active states are present and have sufficient contrast.
