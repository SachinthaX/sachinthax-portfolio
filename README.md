# Nipuna Sachintha Portfolio

Personal portfolio website built with Astro, TypeScript, and plain CSS.

## Live Website

https://www.sachinthax.live/

## Tech Stack

- **Framework:** Astro (`7.4.13`, static output)
- **Language:** TypeScript (`5.9.3`)
- **Styling:** Plain CSS with dark/light design tokens (`tokens.css`, `global.css`)
- **Fonts:** Self-hosted variable `Inter` and `JetBrains Mono` via Fontsource
- **Assets:** Astro `astro:assets` (`sharp` for responsive AVIF/WebP image optimization)

## Requirements

- **Node.js:** `22.23.4` or higher (see `.nvmrc` and `package.json` `engines`)
- **npm:** `9.6.5` or higher

## Commands

```bash
git clone https://github.com/SachinthaX/sachinthax-portfolio.git
cd sachinthax-portfolio
npm install
npm run dev      # Start local dev server
npm run check    # Run Astro & TypeScript diagnostics
npm run build    # Build static site to dist/
npm run preview  # Preview dist/ locally
```

## Project Structure

```text
public/
  favicon.svg                 # Custom "NS" monogram favicon
  og-image.png                # 1200x630 Open Graph / Twitter share card
  robots.txt                  # Crawler directives and sitemap location
  sitemap.xml                 # Static XML sitemap
src/
  assets/
    profile-photo.jpeg        # Source portrait optimized at build time
  components/
    About.astro               # Bio and languages line
    Contact.astro             # Contact links and location
    Credentials.astro         # Certifications and education
    Experience.astro          # Work experience timeline
    Footer.astro              # Site footer
    Hero.astro                # Hero intro, quick facts, and portrait card
    Icon.astro                # Inline SVG icons
    Navbar.astro              # Sticky header, theme toggle, mobile menu
    Projects.astro            # 2x2 project cards
    Skills.astro              # 2x2 skill groups
  data/
    content.ts                # Single source of truth for all site copy
  layouts/
    BaseLayout.astro          # Head SEO/meta, font preloads, theme script, landmarks
  pages/
    index.astro               # Main portfolio page
    404.astro                 # Not-found page
  styles/
    tokens.css                # Design tokens (dark and light themes)
    global.css                # Base styles, utilities, reduced-motion rules
```

## Editing Content

All copy, links, experience entries, projects, skills, certifications, education, and SEO metadata live in `src/data/content.ts`.

### Enabling the CV Download Button

1. Place a public CV PDF (without a phone number or references) at `public/Nipuna-Sachintha-CV.pdf`.
2. Change `SHOW_CV = false` to `SHOW_CV = true` in `src/data/content.ts`.

## Contact

- Email: nipunasachintha77@gmail.com
- GitHub: https://github.com/SachinthaX
- LinkedIn: https://www.linkedin.com/in/h-n-sachintha/
