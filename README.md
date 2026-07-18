# Luke To — Personal Website

A static personal website in a cyberpunk / glitch aesthetic — near-black background, neon green/magenta/cyan accents, Orbitron display headings over JetBrains Mono body text, chamfered corners, CRT scanlines, and RGB-split glitch effects. Built with plain HTML, CSS, and JavaScript — **no framework and no build step**. Content is sourced verbatim from the résumé (`resume.pdf`).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure and content |
| `styles.css` | Design tokens, cyberpunk theme, layout, animations, responsive rules |
| `script.js` | Smooth-scroll nav, scroll reveal/spy, back-to-top button |
| `resume.pdf` | Downloadable résumé (linked from the hero blurb) |

## Local preview

No build step is needed — just serve the folder over HTTP so relative links and the PDF download work correctly:

```bash
cd Personalwebsite
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser. (Opening `index.html` directly via `file://` mostly works too, but a local server matches how it behaves once deployed.)

## Deploy to GitHub Pages

This site is served directly from the repository root — no `gh-pages` branch or build pipeline required.

1. **Create the repo and push.** From inside the `Personalwebsite` folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. **Enable Pages.** On GitHub, go to the repo's **Settings → Pages**.
   - Under **Source**, choose **Deploy from a branch**.
   - Set **Branch** to `main` and the folder to **`/ (root)`**, then click **Save**.
3. **Wait ~1 minute**, then reload the Pages settings screen. Your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

Tip: name the repo `<your-username>.github.io` and the site publishes at that root URL with no repo suffix.

To use a custom domain later, add it under Settings → Pages → Custom domain and create the matching DNS records.

## Editing content

All text lives in `index.html`. Each experience, leadership, and project entry is a `<details>` block — edit the `<summary>` line for the title/org/dates and the `<ul class="bullets">` for the details. Colors, fonts, shadows, and motion timing are CSS variables at the top of `styles.css` (`:root { ... }`).

## Accessibility & behavior notes

- Expandable entries use native `<details>/<summary>`, so keyboard support (Tab + Enter/Space) and expanded-state semantics work with no extra JavaScript. The slide/fade animation is pure CSS (`interpolate-size` + `::details-content`); older browsers get instant open/close.
- All animations (glitch effects, entrance flickers, dropdown slides, hover motion) are disabled automatically when the visitor has **`prefers-reduced-motion: reduce`** set.
- Nav is keyboard-navigable with visible focus outlines; there is a skip-to-content link for screen-reader/keyboard users.
- Layout is responsive down to ~375px (hero columns stack, nav wraps, no horizontal scroll, tap targets ≥44px).

## Placeholder links to fill in

The résumé contains no repo/demo URLs for the projects, so these are marked as placeholders in `index.html` (`<a href="#" data-placeholder="true">`) and styled as dashed red `[404]` chips. Replace the `href` (and remove the `data-placeholder` attribute) once real links exist:

- **CarbonFootprint Tracker** — repo / demo
- **RAG Q&A Agent** — repo / demo
- **Tecovirimat Redesign** — writeup / poster
