<<<<<<< HEAD
# About_me
=======
# Wang Xiugang — Personal Portfolio Website

A bilingual (English/Chinese) personal portfolio website for Wang Xiugang, Data Analyst & AI Enthusiast.

## Tech Stack

- Pure HTML5 + CSS3 + Vanilla JavaScript
- No frameworks, no build tools
- Single-page scrolling layout
- Deployable directly to GitHub Pages

## File Structure

```
Xiugang-Website/
├── index.html          # Main HTML (all 6 sections)
├── css/
│   └── style.css       # All styles (design tokens, layout, responsive)
├── js/
│   └── main.js         # I18N, Nav, ScrollSpy, Animations
├── assets/
│   └── images/         # Place profile photo here (replace avatar placeholder)
└── README.md
```

## Features

- **Bilingual** — EN/中文 toggle with localStorage persistence
- **Responsive** — Mobile-first, single breakpoint at 768px
- **Smooth navigation** — Scroll spy highlights active section
- **Animations** — IntersectionObserver card entrance animations
- **No dependencies** — Opens directly in browser, no server needed

## Sections

1. **Hero** — Name, title, tagline, CTA buttons
2. **About** — Bio paragraphs + DSTI education card
3. **Skills** — Badge grid (Python, R, SQL, Power BI, ETL, Statistics…)
4. **Experience** — CGN timeline card with bullet points
5. **Projects** — 3-column cards (ETL Pipeline, R Analysis, Power BI Dashboard)
6. **Contact** — Email and LinkedIn links

## Customization Checklist

Before publishing, update the following in `index.html`:

- [ ] **Email address** — search `your.email@example.com`
- [ ] **LinkedIn URL** — search `your-profile`
- [ ] **Work dates** — update `2020 – 2023` in Experience section
- [ ] **Profile photo** — place image in `assets/images/`, update avatar in Hero
- [ ] **Bio text** — review and personalize the About section paragraphs
- [ ] **Footer year** — update `© 2024` if needed

## GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. Site will be live at `https://<username>.github.io/<repo-name>/`

## Local Preview

Simply open `index.html` in any browser — no server required.
>>>>>>> f206350 (Initial portfolio site for Wang Xiugang)
