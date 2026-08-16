# Taival Tech website

Marketing site for Taival Tech Oy — hand-written static HTML, no framework and
no build step.

Live at **https://taival.tech** (also reachable at
`taivaltech-website.vercel.app`).

## How it gets deployed

Hosted on **Vercel**, connected to this GitHub repo through the Vercel
dashboard. Pushing to `master` triggers a deploy automatically; there is
usually nothing else to do.

Worth knowing: **nothing in this repo references Vercel.** There is no
`vercel.json`, no GitHub Actions workflow, and no CI config, because the
connection lives entirely in Vercel's dashboard. If you are trying to work out
how the site publishes, you will not find the answer by reading these files —
check the Vercel project settings, where the custom domain is configured too.

There is no build step. Vercel serves these files byte-for-byte as they are
committed, so what you see locally is exactly what ships.

## Local preview

```bash
node server.mjs      # then open http://localhost:3456
```

`server.mjs` is a small dependency-free static file server. It resolves paths
relative to the script, so it runs from any working directory, and it reads
files per request — edit a file, refresh the browser, no restart needed.

It exists only for previewing. It plays no part in deployment.

## Layout

```
index.html            Home page: hero, "10x engineer" section, services, about, contact
services/             Service detail pages, with an index at services/
blog/                 Blog index and posts
portfolio/            Portfolio index
assets/               site.css, site.js, hero and clip videos, textures
docs/                 Information-architecture notes
backups/              Dated snapshots of earlier copy and page versions
*.png, iiro.jpg       Top-level hero and profile imagery
```

Each page is standalone and links to `assets/site.css` and `assets/site.js`;
there are no templates or includes, so a change to shared markup such as the
nav has to be repeated in each HTML file.

`assets/site.js` handles the mobile nav drawer, scroll-driven reveal animations
via `IntersectionObserver` (the `reveal` / `reveal-child` classes), and contact
form submission.

## Third-party services

| Service       | Used for                  | Where configured                     |
| ------------- | ------------------------- | ------------------------------------ |
| Vercel        | Hosting, custom domain    | Vercel dashboard                     |
| Formspree     | Contact form submissions  | `form action` in `index.html`        |
| Umami         | Privacy-friendly analytics| Script tag in each page's `<head>`   |
| Google Fonts  | Inter typeface            | `<link>` in each page's `<head>`     |

All are referenced from the HTML by public IDs — there are no secrets or
environment variables in this repo.

## Conventions

- Default branch is `master`, not `main`.
- Commit to `master` only when you are ready for it to be live; every push
  publishes.
