## 2024-05-20 - Path Traversal in File Deletion
**Vulnerability:** The `deleteImage` API endpoint constructed file deletion paths directly from user input (`req.body.imageUrl`) without path normalization and validation, allowing path traversal attacks (e.g. `imageUrl: "/uploads/../../package.json"`).
**Learning:** Node.js `path.join()` resolves relative segments like `..` but doesn't prevent paths from escaping the intended root directory. Checking if a path is safe requires resolving absolute paths and comparing string prefixes.
**Prevention:** Always use `path.resolve()` to get absolute paths and ensure the targeted file path `startsWith(resolvedBaseDir + path.sep)` to restrict file operations to the intended directory.
