## 2024-05-24 - Fix Timing Attack in Forgot Password Endpoint
**Vulnerability:** Timing attack vulnerability in the `forgotPassword` endpoint in `server/controllers/auth.controller.js`. The response time varied based on whether the email was found in the database, allowing an attacker to enumerate registered email addresses by measuring the response delay.
**Learning:** Returning a response early or doing fixed-time operations in endpoints that check for user existence helps mitigate timing attacks.
**Prevention:** Ensure that the endpoint responds in constant time, for instance by sending the generic success response before carrying out asynchronous background tasks like generating tokens, invalidating old ones, and sending emails.
