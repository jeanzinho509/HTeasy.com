
## 2024-05-24 - [CRITICAL] Prevent Sensitive File Exposure via Root Static Serving
**Vulnerability:** The application was serving the root directory (`/`) via `express.static`, exposing backend code, configuration files (`package.json`), and critical secrets (`.env`) to the public internet. This resulted in a total compromise of sensitive data.
**Learning:** Never expose a repository root to static file servers. Backend and configuration files must be isolated from the public directory. Always explicitly define safe, isolated directories for `express.static` (like `public/` or `dist/`). If root-serving is absolutely necessary for some reason, enforce strict path-blocking middleware before the `express.static` declaration.
**Prevention:** Architect applications to separate the frontend build artifacts/public assets into their own dedicated directory. Implement strong routing rules to deny requests to internal patterns (e.g., `.*`, `/server/`, `/node_modules/`) by default.
