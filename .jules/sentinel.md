## 2026-07-07 - [Mass Assignment in User Registration]
**Vulnerability:** A mass assignment vulnerability existed in `server/controllers/auth.controller.js` where the user's role could be passed in the registration payload, allowing privilege escalation.
**Learning:** Destructuring and accepting authorization-related fields (like `role`) directly from `req.body` without verification allows users to bypass authorization logic.
**Prevention:** Hardcode default roles for new users in the API and handle role changes only through dedicated, strictly authorized endpoints.