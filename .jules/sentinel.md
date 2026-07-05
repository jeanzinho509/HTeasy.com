## 2023-10-25 - Path Traversal in Image Deletion
**Vulnerability:** The `deleteImage` endpoint in `upload.controller.js` was vulnerable to path traversal because it used `path.join(UPLOAD_DIR, urlPath)` without verifying if the resulting path was still inside the intended upload directory boundaries.
**Learning:** Using `path.join` on user-supplied paths without further boundary checks allows users to delete arbitrary files on the filesystem by including `../` in the path.
**Prevention:** Always normalize the concatenated path using `path.resolve` and verify that the resulting absolute path starts with the expected base directory's absolute path before accessing or manipulating the file.
