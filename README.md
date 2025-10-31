# RD Website Remake

A simple static website (HTML/CSS/JS) for RubidiumData. No build step is required.

## Project structure
- `index.html`: Home page
- `pages/`: Additional pages (`team.html`, `privacy.html`, `imprint.html`)
- `css/styles.css`: Global styles
- `js/main.js`: Behavior (theme toggle, nav active states, animations)
- `assets/`: Images and icons

## Local preview
- Option 1: Open `index.html` directly in your browser.
- Option 2: Serve locally to mimic production hosting:
  - Temporary server: `npx serve` (then open the shown URL)
  - Or Python 3: `python -m http.server 8080` and open `http://localhost:8080/`

## Deployment (Vercel)
This site is static; no build step.

- Git-based (recommended):
  1) Push the repo to GitHub/GitLab/Bitbucket
  2) In Vercel: Import Project → Framework Preset: “Other”
  3) Build Command: leave empty
  4) Output Directory: leave empty (project root)
  5) Deploy
  - Staging: each branch/PR gets a Preview URL automatically

- CLI:
  - `npm i -g vercel`
  - From the project root: `vercel` (Preview)
  - Production: `vercel --prod`

## Theme toggle
- Modes: system → dark → light (cycles on click)
- UI: text label `theme` + icon (desktop/sun/moon)
- Hover: gradient background (same as hero CTA) + scale to 1.05
- Click: quick dip/return animation
- Tooltip: short delay, fixed-position above the toggle (Light mode / Same as system / Dark mode)

## Dark mode specifics
- Portfolio card images: default (no hover) swap to `*-dark.png` in dark/system-dark
- Portfolio card images are dimmed to 70% opacity (non-hover) in dark/system-dark; hover returns to 100%
- Portfolio cards background in dark/system-dark:
  - Non-hover slightly lighter; hover a bit lighter still

## Animations
- Portfolio cards: subtle hover scale (1.01) with eased timing
- Team cards: hover lift + 1.01 scale; fast entrance, stacked layout preserved

## Conventions
- Assets live under `assets/`
- Use root-relative links for pages (e.g., `/pages/team.html`)

## Notes
- No build tools; plain HTML/CSS/JS
- You can customize Vercel with `vercel.json` later (optional)


