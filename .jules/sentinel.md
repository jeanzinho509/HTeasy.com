## 2024-05-15 - Path Traversal in Image Deletion
**Vulnerability:** Path traversal vulnerability in `server/controllers/upload.controller.js`'s `deleteImage` function.
**Learning:** `imageUrl` from `req.body` is used to construct `filePath` without validation. `imageUrl.replace('/uploads/', '')` does not prevent directory traversal if the path contains `../`. An attacker could pass `imageUrl: "/uploads/../../server.js"` and delete arbitrary files.
**Prevention:** Properly resolve the target path and validate that it starts with the intended base upload directory.
