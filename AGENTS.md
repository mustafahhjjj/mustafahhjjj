# AGENTS.md

## Cursor Cloud specific instructions

### What this project is
Static, multi-page website for the Turkish K-12 education platform **e-kurs.com** (student/teacher/parent panels, lessons, tests, gamification). It is plain HTML + CSS (`css/`) + vanilla JS (`js/`), plus self-contained PHP API endpoints in `api/`. There is no build system, no `package.json`, and no bundler — files are served as-is. Production deploys to cPanel/Apache (`.cpanel.yml`, `.htaccess`).

### How to run it (development)
Serve the repo root with PHP's built-in server so both static pages and the PHP APIs work:

```
php -S 0.0.0.0:8000 -t /workspace
```

Then open `http://localhost:8000/index.html`. Auth (`js/auth.js`) is a client-side/localStorage demo (no real backend): registering as Öğretmen/Veli or logging in redirects to the relevant panel. Registering as Öğrenci only records a pre-application and does not redirect.

### Non-obvious caveats
- The PHP API files in `api/` are **self-contained and need no database** — they return generated/hardcoded JSON. The `.example.js` files in `api/` are illustrative only. The DB/Redis/WebSocket architecture in `docs/` describes the intended production system, not what runs locally.
- Front-end JS calls the PHP APIs (e.g. `js/test-center.js`, `js/math-practice-engine.js`) but **degrades gracefully** with local fallbacks. Pages still render if served by a static-only server, but for full fidelity use `php -S` so the `/api/*.php` calls succeed.
- `.htaccess` provides extensionless/pretty URL rewrites (e.g. `/siniflar/2-sinif/...`). PHP's built-in server does **not** process `.htaccess`, but nearly all links use explicit `.html` paths, so core flows work without Apache. Use explicit `.html` URLs when testing directly.
- There are no automated tests, linters, or build/CI steps in the repo.
