
## 2024-05-24 - [CRITICAL] Sensitive File Exposure via Static File Serving
**Vulnerability:** The application was serving the entire root directory statically using `app.use(express.static(path.join(__dirname, '/')));`. This allowed attackers to request sensitive files like `.env`, `package.json`, `server.js`, and database credentials simply by browsing to them directly or using path traversal (e.g., `/%2e%2e/%2e%2e/etc/passwd` or `/.env`).
**Learning:** Even if routing appears straightforward, serving the root directory with static middleware blindly exposes every file and folder in the application root. Attackers can bypass naive checks using URL encoding and case-insensitivity on some file systems.
**Prevention:**
1. Added a custom security middleware *before* the static file server to explicitly block access to sensitive files and directories.
2. The middleware uses `decodeURIComponent(req.path)` to prevent URL-encoding bypasses (e.g., `%2e` for `.`).
3. `path.normalize()` is used to resolve path traversals correctly and extract the true first segment of the requested path.
4. Blocked any file/directory starting with a dot (`.`) and used a strict lowercase denylist for top-level application files (`server.js`, `database/`, etc.).
