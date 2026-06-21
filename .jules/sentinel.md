## 2026-06-21 - [CRITICAL] Static file serving exposing root directory and secrets
**Vulnerability:** The application was serving the root directory as a static file path (`app.use(express.static(path.join(__dirname, '/')));`). This exposed sensitive files like `.env`, `package.json`, and backend source code directly to the public web via `http://localhost:3000/.env`. Additionally, the `.env` file containing secrets was committed to git.
**Learning:** Combining frontend and backend files in the same directory without a dedicated public folder often leads to path exposure if middleware is configured incorrectly. Tracking `.env` files exposes secrets in version history.
**Prevention:**
1. Always create a dedicated `public` or `dist` directory for frontend assets and restrict static middleware solely to that folder.
2. Ensure `.env` is listed in `.gitignore` from project inception and commit a sanitized `.env.example` file instead.
