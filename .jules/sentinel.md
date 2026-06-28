## 2024-05-24 - Mass Assignment Vulnerability Regression

**Vulnerability:** A mass assignment/privilege escalation vulnerability in `server/controllers/auth.controller.js` during user registration was reintroduced. The `role` property from the request body destructuring was being accepted, allowing any user to register themselves as an admin or other privileged role.

**Learning:** Destructuring request bodies indiscriminately (`const { name, email, password, phone, role } = req.body;`) in endpoints that create or modify user accounts can inadvertently allow attackers to overwrite sensitive fields that shouldn't be user-controllable, leading to privilege escalation regressions if previous fixes are undone or lost.

**Prevention:** Always hardcode default values for sensitive fields like `userRole` (e.g., `const userRole = 'user';`) in publicly accessible creation endpoints like `/register` and never include sensitive properties in request body destructuring for user input without explicit allowlisting/sanitization and authorization checks.
