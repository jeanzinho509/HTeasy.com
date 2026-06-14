## 2024-05-18 - Privilege Escalation in Registration
**Vulnerability:** Mass assignment / privilege escalation vulnerability in `server/controllers/auth.controller.js` allowed users to assign themselves administrative roles by including `"role": "admin"` in the registration request.
**Learning:** Destructuring user-supplied bodies directly into database properties without validation can bypass authorization restrictions. The application failed to explicitly separate public registration logic from internal administrative user creation.
**Prevention:** Always use allowlists or hardcode default roles during user self-registration. Never directly map user inputs to sensitive database columns like user roles.
