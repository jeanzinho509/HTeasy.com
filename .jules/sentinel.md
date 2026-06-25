## 2024-06-25 - Path Traversal in File Deletion
**Vulnerability:** Path traversal vulnerability in `server/controllers/upload.controller.js`'s `deleteImage` endpoint. User input (`imageUrl`) was parsed and appended using `path.join()`, allowing an attacker to pass payloads like `/uploads/../../../../etc/passwd` to delete arbitrary files on the server.
**Learning:** `path.join()` normalizes the path but does not prevent traversal outside the intended directory. This was a known regression point in the application.
**Prevention:** Always use `path.resolve()` for both the base directory and the target user-supplied path, and then strictly enforce boundary checks by ensuring the resolved target string `.startsWith(resolvedBaseDir + path.sep)`.
