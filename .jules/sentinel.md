## 2023-10-24 - Path Traversal in Image Deletion
**Vulnerability:** The `deleteImage` endpoint in `upload.controller.js` directly appended user-supplied `imageUrl` to the base upload directory using `path.join()`. This allowed attackers to use directory traversal sequences (like `../../../../etc/passwd`) to delete arbitrary files on the server.
**Learning:** `path.join()` resolves `..` sequences but does not restrict the resulting path to the base directory. It's insufficient for secure path handling of user inputs.
**Prevention:** Always use `path.resolve()` on both the base directory and the target file path. Verify that the resolved target path `startsWith(resolvedBaseDir + path.sep)` to prevent both directory traversal and partial directory name matching attacks.
