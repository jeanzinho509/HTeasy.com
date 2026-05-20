
## 2024-05-18 - Path Traversal in File Deletion
**Vulnerability:** The `deleteImage` controller accepted an `imageUrl` without validating that the resolved target path remained within the intended `uploads` directory, allowing arbitrary file deletion via `../../` payloads.
**Learning:** Functions that map user-provided paths (even partial ones extracted from URLs) to the filesystem must always validate the absolute resolved path against an expected base directory.
**Prevention:** Always use `path.resolve()` and `String.prototype.startsWith()` to ensure the target file path resides within the intended directory before performing any filesystem operations like `fs.unlinkSync()`.
