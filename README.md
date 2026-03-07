# roydev.xyz

For the essence — villain, not hero.

## Stack

- [Hexo](https://hexo.io/) 8.x — Static site generator
- Custom theme (`themes/roydevxyz`) — Minimal black & white design
- [Pretendard](https://github.com/orioncactus/pretendard) — Web font
- [Font Awesome](https://fontawesome.com/) 6.x — Brand icons

## Structure

```
source/
├── _posts/          # Blog posts (post_asset_folder enabled)
├── article/         # Article page (paginated post list)
├── villain/         # Villain page (about / personal trace)
└── robots.txt

themes/roydevxyz/
├── layout/          # EJS templates
│   ├── index.ejs    # Hero (landing)
│   ├── article.ejs  # Article (blog list + JS pagination)
│   ├── villain.ejs  # Villain (values, interests, careers, contacts)
│   ├── post.ejs     # Single post
│   └── partials/    # head, header, footer
├── languages/       # i18n (en, ko)
└── source/          # CSS, JS, static assets
```

## Features

- Light / Dark mode (`prefers-color-scheme`)
- English / Korean language toggle
- Client-side pagination (20 posts per page, grouped by YYYY.MM)
- SEO: sitemap, RSS (Atom), Open Graph, Twitter Card, canonical URL
- Post asset folder for per-post images

## Development

```bash
npm install
npx hexo server
```

## Deployment

Push to `master` triggers GitHub Actions (`.github/workflows/deploy.yml`).
