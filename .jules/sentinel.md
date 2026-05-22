## 2025-05-21 - [CRITICAL] Fix Path Traversal in Image Deletion
**Vulnerability:** The `deleteImage` endpoint in `server/controllers/upload.controller.js` used `path.join(UPLOAD_DIR, urlPath)` directly with user-supplied `imageUrl` input, allowing attackers to delete any file on the server (e.g., `../../.env` or `../../server.js`) via Path Traversal (CWE-22).
**Learning:** `path.join` does not prevent traversing upwards with `../`. If user input controls the path, `path.resolve` must be used, and the resulting absolute path must be explicitly checked against the allowed base directory.
**Prevention:** Always use `path.resolve()` alongside a containment check (e.g., `if (!filePath.startsWith(resolvedUploadDir + path.sep))`) whenever building file system paths using user input.
