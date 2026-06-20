## 2025-06-20 - [Fix Mass Assignment Vulnerability during Registration]
**Vulnerability:** A mass assignment vulnerability allowed attackers to create accounts with administrative privileges by passing `role: admin` in the registration request.
**Learning:** The application inadvertently destructured the `role` property from `req.body` and allowed it to override the default user role, leading to critical privilege escalation.
**Prevention:** Hardcode roles on user registration to standard non-privileged defaults and explicitly drop user-supplied privilege fields from requests that do not require or allow elevation.
