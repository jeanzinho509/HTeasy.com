## 2024-05-13 - [Fix Path Traversal in File Deletion]
**Vulnerability:** Path Traversal (CWE-22) in `upload.controller.js` `deleteImage` endpoint allowing deletion of arbitrary files on the server by supplying path traversal characters (e.g., `../../`) in the `imageUrl` parameter.
**Learning:** `path.join` does not prevent directory traversal if the user-controlled input contains `../`. Simply appending it to a base directory allows it to resolve outside the intended folder.
**Prevention:** Always use `path.resolve` to get the absolute path of the target, and then enforce that the resolved path strictly starts with the absolute path of the base directory plus a path separator.
