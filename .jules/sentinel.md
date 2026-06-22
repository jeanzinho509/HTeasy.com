## 2024-06-22 - Mass Assignment Privilege Escalation Regression
**Vulnerability:** Mass assignment in user registration allowed users to register with admin privileges by including `role: "admin"` in the request body.
**Learning:** This specific vulnerability was previously resolved but re-appeared as a regression. Destructuring `role` directly from `req.body` and falling back to it bypassed intended limitations.
**Prevention:** Hardcode default user roles on registration and strictly control inputs destructured from the request body. Ensure there are continuous checks against regressions in sensitive authentication endpoints.
