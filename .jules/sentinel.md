## 2024-07-04 - Mass Assignment Privilege Escalation

**Vulnerability:** In `server/controllers/auth.controller.js`'s `register` function, a user's role could be passed in `req.body` and assigned directly to the user record without any authorization check, allowing any attacker to arbitrarily register as an admin (`role=admin`).
**Learning:** Destructuring sensitive fields like `role`, `is_admin`, or `permissions` directly from HTTP request bodies into database queries is a classic mass assignment vulnerability. In this case, an implicit default (`role || 'user'`) was present, but didn't prevent malicious input.
**Prevention:** Always hardcode default values for authorization roles on open endpoints like registration. Do not trust client input for role assignments. If role assignment is needed, it must be performed on an authenticated endpoint with its own authorization checks enforcing that only admins can elevate privileges.
