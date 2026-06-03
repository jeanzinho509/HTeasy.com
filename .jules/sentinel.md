
## 2024-06-03 - [CRITICAL] Fix Privilege Escalation in User Registration
**Vulnerability:** Mass assignment in the `register` function (`server/controllers/auth.controller.js`) allowed any user to set their own role by passing `role: "admin"` in the request body.
**Learning:** Destructuring request bodies without explicit filtering can lead to critical privilege escalation vulnerabilities.
**Prevention:** Never extract sensitive fields (like `role`, `is_admin`) directly from user input during creation/update operations. Hardcode safe defaults.
