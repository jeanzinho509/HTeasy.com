## 2024-05-24 - Privilege Escalation via Mass Assignment in User Registration
**Vulnerability:** A critical mass assignment vulnerability in `server/controllers/auth.controller.js` allowed users to register with arbitrary roles (e.g., admin) by simply including a `role` field in the request body, bypassing normal authorization flows.
**Learning:** Destructuring request body properties without an explicit allowlist or omitting sensitive fields directly permits client-controlled data to overwrite critical server-side logic like user roles.
**Prevention:** Never destructure sensitive fields like `role` directly from user input. Always hardcode default values for new resources, or enforce an explicit allowlist/stripping pattern (e.g. `const { role, ...safeBody } = req.body;`) before saving.
