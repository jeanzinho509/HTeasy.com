## 2024-05-24 - Timing Attack in Authentication Endpoints

**Vulnerability:**
The `login` endpoint in `server/controllers/auth.controller.js` leaked the existence of user accounts due to a timing attack. When a user was not found, the endpoint skipped the computationally expensive `bcrypt.compare()` step, causing the response to return significantly faster than when verifying a valid account password. An attacker could exploit this time difference to enumerate existing emails on the platform.

**Learning:**
Authentication endpoints must consistently execute the same set of expensive cryptographic operations regardless of whether the requested resource (such as a user account) exists. Short-circuiting verification logic inadvertently leaks state through response timing discrepancies.

**Prevention:**
Always introduce a dummy hashing comparison step when lookup fails. A pre-generated dummy bcrypt hash should be used in conjunction with `bcrypt.compare(password, DUMMY_HASH)` before returning an unauthorized response, ensuring consistent execution time across both positive and negative code paths.
