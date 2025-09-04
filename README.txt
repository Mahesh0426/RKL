
RPL Mapping System — Static Prototype
=====================================

Generated: 2025-09-04T12:42:36

What you get
------------
- Multi-page static site: Landing, Dashboard, Mappings, Requests, Users, Contact
- Vanilla HTML/CSS/JS (no frameworks)
- Light/Dark mode (saved in localStorage)
- Mappings table with search/filter and CSV export
- Requests submission demo (localStorage)
- Users admin view (read-only)
- Mock data in /data/mock.json

How to run
----------
Open `index.html` in your browser. For the best experience with `fetch(...)` of local files,
either use:
- A simple local server: `python -m http.server` from this folder, then open http://localhost:8000
- Or drag the entire folder into an editor with live server (e.g., VS Code + Live Server).

Folder structure
----------------
/assets        Logo
/css           Shared styles
/data          Mock JSON
/js            Shared + page scripts
*.html         Pages
