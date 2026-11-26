# Implementation Plan — `sachinthax-portfolio` Redesign

**Branch:** `redesign` (only)  
**Target Stack:** Astro `7.4.13` (`output: 'static'`) deployed on Vercel (Node `22.x`)  
**Design & Concept:** Concept C (Modular Developer Grid), emerald accent (`#34d399` dark / `#047857` light), OS-first theme toggle with `localStorage`  
**Inputs:** [audit.md](file:///f:/nipun/Desktop/web/sachinthax-portfolio/docs/audit.md), [content-brief.md](file:///f:/nipun/Desktop/web/sachinthax-portfolio/docs/content-brief.md), [design-direction.md](file:///f:/nipun/Desktop/web/sachinthax-portfolio/docs/design-direction.md), [redesign-concepts.md](file:///f:/nipun/Desktop/web/sachinthax-portfolio/docs/redesign-concepts.md)

---

## Changes after Stage 1

After completing Stage 1 on Astro `5.18.2` / Node `20.19.0`, `npm audit` reported 9 vulnerabilities (1 critical, 7 high) whose fixes required upgrading to Astro 7 and Node `>=22.23.4`. The following amendments and upgrade changes were approved and applied before Stage 2:

1. **Runtime & Astro Upgrade:** Switched local runtime to Node `v22.23.4` (`.nvmrc`: `22.23.4`, `package.json` `engines`: `node >=22.23.4`, `npm >=9.6.5`) and upgraded `astro` from `5.18.2` to **`7.4.13`** (Vite `8.3.8`, `sharp` `0.35.5`, `zod` `4.6.7`). Clean `npm install` now yields **0 vulnerabilities** and **0 engine warnings**.
2. **TypeScript & Font Choices Retained:** Pinned `typescript` to `"5.9.3"` (`@astrojs/check@0.9.12` requires `^5.0.0 || ^6.0.0`, excluding `7.0.2`). Kept `@fontsource-variable/inter` (`5.3.0`) and `@fontsource-variable/jetbrains-mono` (`5.3.0`) with CSS imports and `?url` preloads instead of Astro 7's built-in Fonts API.
3. **Astro Config & Compiler Alignment:** Set `compressHTML: true` in `astro.config.mjs` to preserve HTML inline whitespace instead of Astro 7's new `'jsx'` default, and replaced `@astrojs/sitemap` with a static `public/sitemap.xml`.
4. **Approved Feature Amendments:** Hero email link uses `mailto:nipunasachintha77@gmail.com`; `"lint"` replaced with `"check": "astro check"`; nav links remain visible and usable without JavaScript (mobile menu collapse scoped to `.js` class added on `<html>` in the inline `<head>` script); added `src/pages/404.astro`.

---

## 1. Verified Dependency List

Local runtime observed: **Node `v22.23.4`**, **npm `10.9.9`**.  
`package.json` `"engines"` enforces `"node": ">=22.23.4"` and `"npm": ">=9.6.5"`, matching `astro@7.4.13` and `.nvmrc` (`22.23.4`).

### Production / Core Dependencies (`dependencies`)

| Package | Pinned Version | Locked (`package-lock.json`) | Node Engine Requirement | Purpose & Status |
| --- | --- | --- | --- | --- |
| `astro` | `"7.4.13"` | `7.4.13` | `>=22.23.4` (`npm >=9.6.5`) | Core static site builder (Vite `8.3.8`, Rust compiler). **Verified clean install.** |
| `@fontsource-variable/inter` | `"5.3.0"` | `5.3.0` | `null` | Self-hosted variable `Inter` font (`100–900` weights; `inter-latin-wght-normal.woff2`). |
| `@fontsource-variable/jetbrains-mono` | `"5.3.0"` | `5.3.0` | `null` | Self-hosted variable `JetBrains Mono` font (`100–800` weights; `jetbrains-mono-latin-wght-normal.woff2`). |

### Optional / Dev Tooling

| Package | Pinned Version | Locked (`package-lock.json`) | Node Engine Requirement | Notes |
| --- | --- | --- | --- | --- |
| `sharp` *(optional dep of `astro@7.4.13`)* | `^0.35.4` | `0.35.5` | `>=20.9.0` | Installed automatically via `astro`'s `optionalDependencies`; powers `astro:assets` WebP/AVIF transforms and PNG generation. |
| `@astrojs/check` *(dev)* | `"0.9.12"` | `0.9.12` | `null` | Runs `npm run check` (`astro check`) across `.astro` and `.ts` files. |
| `typescript` *(dev)* | `"5.9.3"` | `5.9.3` | `>=14.17` | Pinned within `@astrojs/check@0.9.12`'s peer range (`^5.0.0 \|\| ^6.0.0`), avoiding `7.0.2`. |

### Intentionally Excluded (Zero Icon, Sitemap & ESLint Bloat)

- **No icon package:** The 7 required UI/brand icons (`github`, `linkedin`, `mail`, `sun`, `moon`, `menu`, `close`) live in `src/components/Icon.astro` as inline `<svg>` paths.
- **No `@astrojs/sitemap`:** Single-route site uses a static `public/sitemap.xml` for `https://www.sachinthax.live/`.
- **No ESLint packages:** `package.json` uses `"check": "astro check"` instead of `"lint"`.
- **Audit result after clean install:** `npm audit` reports **0 vulnerabilities**.

---

## 2. Target Folder Structure

```text
sachinthax-portfolio/
├── .gitignore                       # Ignores node_modules/, .astro/, dist/, .env*
├── .nvmrc                           # 22.23.4
├── astro.config.mjs                 # Static output, site URL, compressHTML: true
├── package.json                     # Exact pinned Astro 7.4.13 + check/build scripts + engines
├── package-lock.json                # Clean lockfile (0 vulnerabilities)
├── README.md                        # Updated stack, setup, canonical & LinkedIn URLs
├── tsconfig.json                    # Extends astro/tsconfigs/strict
├── docs/
│   ├── audit.md
│   ├── content-brief.md
│   ├── design-direction.md
│   ├── redesign-concepts.md
│   └── redesign-plan.md
├── public/
│   ├── favicon.svg                  # Custom "NS" SVG monogram favicon
│   ├── og-image.png                 # 1200x630 PNG social preview card
│   ├── robots.txt                   # Allow all + Sitemap: https://www.sachinthax.live/sitemap.xml
│   └── sitemap.xml                  # Static XML sitemap for https://www.sachinthax.live/
│   # (Nipuna-Sachintha-SE.pdf deleted; Nipuna-Sachintha-CV.pdf added later by owner)
└── src/
    ├── assets/
    │   └── profile-photo.jpeg       # Kept source photo (processed via astro:assets)
    ├── components/
    │   ├── About.astro
    │   ├── Contact.astro
    │   ├── Credentials.astro        # Combined Certifications and Education section
    │   ├── Experience.astro
    │   ├── Footer.astro
    │   ├── Hero.astro
    │   ├── Icon.astro               # Inline SVG sprites for 7 allowed icons
    │   ├── Navbar.astro
    │   ├── Projects.astro
    │   └── Skills.astro
    ├── data/
    │   └── content.ts               # Single source of truth (matches content-brief.md + SHOW_CV flag)
    ├── layouts/
    │   └── BaseLayout.astro         # <head>, preloads, SEO/JSON-LD, inline theme + .js script, landmarks
    ├── pages/
    │   ├── index.astro              # Assembles sections in exact required order
    │   └── 404.astro                # Simple 404 page matching theme/design and linking home
    └── styles/
        ├── global.css               # Reset, typography, layout utilities, no-JS nav support, focus styles
        └── tokens.css               # Dark & light CSS custom properties, spacing, radii
```

---

## 3. Component List, Props, and Content Usage

| Component / Page | Props | Content / Data Used (`src/data/content.ts`) | Role & Structure |
| --- | --- | --- | --- |
| `BaseLayout.astro` | `title: string`, `description: string`, `canonical: string`, `ogImage: string` | `siteMeta`, `identity`, `navigation` | Document shell; renders `<head>` metadata, font preloads, JSON-LD `Person`, inline script adding `.js` to `<html>` + resolving theme, skip link, `<Navbar />`, `<main id="main-content">`, and `<Footer />` as sibling landmarks. |
| `Navbar.astro` | `brandName: string`, `links: NavLink[]` | `identity.name`, `navigation` | Sticky top `<header>` with brand link (`#home`), `<nav aria-label="Primary navigation">`, theme toggle button (`sun`/`moon`), and mobile menu toggle (`menu`/`close`). Links remain visible without JS; drawer collapse styles apply only under `html.js`. |
| `Icon.astro` | `name: 'github' \| 'linkedin' \| 'mail' \| 'sun' \| 'moon' \| 'menu' \| 'close'`, `size?: number`, `class?: string` | None | Renders accessible inline `<svg aria-hidden="true">` icons; zero external dependencies. |
| `Hero.astro` | `eyebrow: string`, `headline: string`, `subheading: string`, `primaryCta: CtaLink`, `cvCta: CvConfig`, `quickFacts: string[]`, `identity: Identity` | `hero`, `identity`, `SHOW_CV` | 2-cell modular grid: left cell holds eyebrow, `<h1>`, subheading, CTA buttons (`Download CV` rendered only when `SHOW_CV === true`), and GitHub, LinkedIn, and Email (`mailto:nipunasachintha77@gmail.com`) icon links; right cell holds compact `--surface` summary card with `<Picture priority ... />` (`profile-photo.jpeg`), location, 3 quick facts, and availability. |
| `About.astro` | `id: string`, `eyebrow: string`, `heading: string`, `paragraphs: string[]`, `languages: LanguageItem[]` | `about` | Constrained `720px` readable prose block (`3` paragraphs) followed by one compact monospace line at the end for `English: Professional proficiency` and `Sinhala: Native proficiency`. |
| `Experience.astro` | `id: string`, `eyebrow: string`, `heading: string`, `items: ExperienceItem[]` | `experience` | Vertical timeline rail connecting bordered `--surface` role cards (`NoLoopTech` Oct–Nov 2026 ended; `RV Pool Shop` May–Jul 2026), each with monospace date badge and `720px`-capped bullet list. |
| `Projects.astro` | `id: string`, `eyebrow: string`, `heading: string`, `items: ProjectItem[]` | `projects` | `2x2` equal-height card grid (`Mushroom Cultivation App`, `RV Pool Shop`, `EventEase`, `CookMate`). Renders subtitle, title, 2-line description, and monospace tech chips. Link row is omitted when a project has no public links. |
| `Skills.astro` | `id: string`, `eyebrow: string`, `heading: string`, `groups: SkillGroup[]` | `skillGroups` | `2x2` grid of 4 flat cards (`Languages`, `Frameworks and Libraries`, `Databases`, `Cloud, DevOps and Tools`) displaying text-only monospace chips (no brand icons, no percentage bars). |
| `Credentials.astro` | `id: string`, `eyebrow: string`, `heading: string`, `certifications: CertificationItem[]`, `education: EducationItem[]` | `certifications`, `education` | Combined `"Certifications and Education"` section in a 2-column split: 5 text-only certification rows (title, issuer, date; no links) + 2 education rows (degree and years only; no university/school name). |
| `Contact.astro` | `id: string`, `eyebrow: string`, `heading: string`, `description: string`, `identity: Identity` | `contact`, `identity` | Bordered banner with headline, invite copy, and 4 contact rows: Email (`Icon name="mail"`), GitHub (`Icon name="github"`), LinkedIn (`Icon name="linkedin"`), and plain-text Location (`Gampaha, Sri Lanka`, no icon). |
| `Footer.astro` | `ownerName: string` | `identity.name` | Semantic `<footer>` rendering `(c) {year} Nipuna Sachintha`. |
| `404.astro` | Uses `BaseLayout.astro` | `siteMeta`, `identity` | Simple not-found page matching dark/light tokens, clear heading/message, and primary button linking back to `/`. |

---

## 4. Data Module Design (`src/data/content.ts`)

All copy from [content-brief.md](file:///f:/nipun/Desktop/web/sachinthax-portfolio/docs/content-brief.md) is centralized in `src/data/content.ts`, with TypeScript interfaces enforcing schema consistency and excluding any forbidden fields (no phone numbers, no references, no university names, no metrics).

```ts
export const SHOW_CV = false; // Flip to true once public/Nipuna-Sachintha-CV.pdf is supplied

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  repoUrl?: string;
  demoUrl?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
}

export interface EducationItem {
  degree: string;
  period: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}
```

**Planned exports in `src/data/content.ts`:**
- `siteMeta`: `title` (`"Nipuna Sachintha | Full-Stack Developer"`), `description`, `canonical` (`"https://www.sachinthax.live/"`), `ogImage` (`"/og-image.png"`), `ogImageAlt`, `favicon` (`"/favicon.svg"`).
- `identity`: `name`, `handle` (`"SachinthaX"`), `role` (`"Full-Stack Developer"`), `descriptor` (`"IT graduate"`), `location` (`"Gampaha, Sri Lanka"`), `email` (`"nipunasachintha77@gmail.com"`), `github` (`"https://github.com/SachinthaX"`), `linkedin` (`"https://www.linkedin.com/in/h-n-sachintha/"`), `siteUrl` (`"https://www.sachinthax.live/"`), `availability`.
- `navigation`: `About` (`#about`), `Experience` (`#experience`), `Projects` (`#projects`), `Skills` (`#skills`), `Credentials` (`#credentials`), `Contact` (`#contact`).
- `hero`: `eyebrow`, `headline`, `subheading`, `primaryCta`, `cvCta` (`{ label: "Download CV", href: "/Nipuna-Sachintha-CV.pdf" }`), `quickFacts` (`["Full-Stack Development", "CI/CD and Deployment", "Cloud and Networking Basics"]`).
- `about`: `eyebrow`, `heading`, `paragraphs` (exact 3 paragraphs), `languages` (`English: Professional proficiency`, `Sinhala: Native proficiency`).
- `experience`: 2 entries (`NoLoopTech` `Oct 2026 to Nov 2026`, `RV Pool Shop` `May 2026 to Jul 2026`).
- `projects`: 4 entries (`Mushroom Cultivation App`, `RV Pool Shop`, `EventEase`, `CookMate`) with `repoUrl` / `demoUrl` omitted (`undefined`).
- `skillGroups`: Exact 4 groups (`Languages`, `Frameworks and Libraries`, `Databases`, `Cloud, DevOps and Tools`) with exact items.
- `certifications`: Exact 5 entries (`title`, `issuer`, `date`; no links).
- `education`: Exact 2 entries (`BSc (Hons) in Information Technology`, `2022 to 2026 (completed)`; `G.C.E. Advanced Level (Physical Science, Mathematics)`, `2020`) — zero institution names.
- `contact`: `eyebrow`, `heading` (`"Let's work together"`), `text`.

---

## 5. Design Tokens & Contrast Verification

### CSS Custom Properties (`src/styles/tokens.css`)

```css
:root {
  color-scheme: dark light;

  /* Spacing scale (4/8px base) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */

  /* Layout & radii */
  --container-max: 1100px;
  --prose-max: 720px;
  --nav-height: 64px;
  --radius-card: 12px;
  --radius-control: 8px;
  --radius-pill: 999px;

  /* Typography */
  --font-sans: "Inter Variable", "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono Variable", "JetBrains Mono", ui-monospace, monospace;
}

/* Default / Dark theme */
:root,
[data-theme="dark"] {
  color-scheme: dark;
  --bg: #0b0f14;
  --surface: #11161d;
  --surface-hover: #161d26;
  --border: #1f2733;
  --border-control: #57667a;
  --text: #e6edf3;
  --muted: #8b98a9;
  --accent: #34d399;
  --accent-hover: #6ee7b7;
  --accent-text: #04130d;
  --accent-soft: #0f241f;
}

/* Light theme */
[data-theme="light"] {
  color-scheme: light;
  --bg: #fafbfc;
  --surface: #ffffff;
  --surface-hover: #f1f5f9;
  --border: #e2e8f0;
  --border-control: #7b8ba1;
  --text: #0f172a;
  --muted: #475569;
  --accent: #047857;
  --accent-hover: #065f46;
  --accent-text: #ffffff;
  --accent-soft: #ecfdf5;
}
```

### Computed WCAG 2.1 Contrast Audit

| Pair | Dark Hex Pair | Dark Ratio | Light Hex Pair | Light Ratio | WCAG Result |
| --- | --- | --- | --- | --- | --- |
| Primary text on page `--bg` | `#e6edf3` / `#0b0f14` | **16.27:1** | `#0f172a` / `#fafbfc` | **17.23:1** | Pass AAA (`>=7:1`) |
| Primary text on `--surface` | `#e6edf3` / `#11161d` | **15.37:1** | `#0f172a` / `#ffffff` | **17.85:1** | Pass AAA (`>=7:1`) |
| Primary text on `--surface-hover` | `#e6edf3` / `#161d26` | **14.36:1** | `#0f172a` / `#f1f5f9` | **16.30:1** | Pass AAA (`>=7:1`) |
| Muted text on `--bg` | `#8b98a9` / `#0b0f14` | **6.55:1** | `#475569` / `#fafbfc` | **7.31:1** | Pass AA / AAA |
| Muted text on `--surface` | `#8b98a9` / `#11161d` | **6.19:1** | `#475569` / `#ffffff` | **7.58:1** | Pass AA / AAA |
| Muted text on `--surface-hover` | `#8b98a9` / `#161d26` | **5.79:1** | `#475569` / `#f1f5f9` | **6.92:1** | Pass AA (`>=4.5:1`) |
| `--accent` link/label on `--bg` | `#34d399` / `#0b0f14` | **10.00:1** | `#047857` / `#fafbfc` | **5.29:1** | Pass AA (`>=4.5:1`) |
| `--accent` link/label on `--surface` | `#34d399` / `#11161d` | **9.45:1** | `#047857` / `#ffffff` | **5.48:1** | Pass AA (`>=4.5:1`) |
| `--accent-hover` on `--bg` | `#6ee7b7` / `#0b0f14` | **12.61:1** | `#065f46` / `#fafbfc` | **7.42:1** | Pass AAA (`>=7:1`) |
| `--accent-text` on `--accent` (CTA) | `#04130d` / `#34d399` | **9.89:1** | `#ffffff` / `#047857` | **5.48:1** | Pass AA (`>=4.5:1`) |
| `--accent-text` on `--accent-hover` | `#04130d` / `#6ee7b7` | **12.48:1** | `#ffffff` / `#065f46` | **7.68:1** | Pass AAA (`>=7:1`) |
| `--accent` on `--accent-soft` (badge) | `#34d399` / `#0f241f` | **8.45:1** | `#047857` / `#ecfdf5` | **5.21:1** | Pass AA (`>=4.5:1`) |
| Focus ring `--accent` on `--bg` | `#34d399` / `#0b0f14` | **10.00:1** | `#047857` / `#fafbfc` | **5.29:1** | Pass UI (`>=3:1`) |
| Interactive `--border-control` on `--bg` / `--surface` | `#57667a` / `#0b0f14`, `#11161d` | **3.28:1** / **3.10:1** | `#7b8ba1` / `#fafbfc`, `#ffffff` | **3.35:1** / **3.47:1** | Pass UI (`>=3:1`) |
| Decorative card `--border` on `--bg` *(non-interactive)* | `#1f2733` / `#0b0f14` | **1.28:1** | `#e2e8f0` / `#fafbfc` | **1.19:1** | Decorative divider only (`--surface` contrast + padding separate cards) |

---

## 6. Font & Image Plan

### Self-Hosted Font Plan (Fontsource + `?url` Preloads)
1. Import `@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono` in `src/layouts/BaseLayout.astro` (kept on Fontsource packages rather than Astro 7's built-in Fonts API).
2. Import the verified Latin `.woff2` files via Vite `?url` imports in `BaseLayout.astro` frontmatter:
   - `@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url`
   - `@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url`
3. Emit `<link rel="preload" href={...} as="font" type="font/woff2" crossorigin />` in `<head>`. Both Fontsource `@font-face` declarations already use `font-display: swap`.

### Image & Brand Asset Plan (Astro 7 `astro:assets`)
1. **Profile Photo (`src/assets/profile-photo.jpeg`, `1920x2560`, `958.6 KB`):**
   - Rendered via Astro's `<Picture>` in `Hero.astro`: `width={112}`, `height={112}`, `densities={[1, 2]}`, `formats={['avif', 'webp']}`, `layout="fixed"`, `fit="cover"`, `position="center 20%"`, `quality={82}`, and **`priority`** (in Astro 5.10+ / 7, `priority` sets `loading="eager"`, `decoding="sync"`, and `fetchpriority="high"`).
   - **Astro 6/7 `astro:assets` behavior:** Sharp `0.35.5` applies cropping by default without needing manual cropping workarounds, **never upscales** beyond source bounds (`1920x2560` easily provides `112px` and `224px`), and emits virtual CSS hash classes + `data-astro-image` attributes instead of inline `style` attributes for responsive styles.
2. **Favicon (`public/favicon.svg`):**
   - Minimal geometric `"NS"` monogram SVG (`32x32` viewBox, `#0b0f14` rounded-square background, `#34d399` border/monogram).
3. **Open Graph Social Card (`public/og-image.png`, `1200x630`):**
   - Raster PNG generated via `sharp` (`0.35.5`) matching Concept C's dark theme (`#0b0f14`) + emerald accent (`#34d399`), `"Nipuna Sachintha — Full-Stack Developer"`, and `"www.sachinthax.live"`.

---

## 7. SEO Plan

1. **Title & Meta (`BaseLayout.astro`):**
   - `<title>Nipuna Sachintha | Full-Stack Developer</title>`
   - `<meta name="description" content="Portfolio of Nipuna Sachintha, an IT graduate and full-stack developer from Sri Lanka. Web applications, deployment, CI/CD, and cloud basics." />`
   - `<meta name="author" content="Nipuna Sachintha" />`
   - `<meta name="theme-color" content="#0b0f14" />` (kept synced with active theme on toggle).
2. **Canonical URL:**
   - `<link rel="canonical" href="https://www.sachinthax.live/" />`
   - `site: 'https://www.sachinthax.live'` and `trailingSlash: 'ignore'` in `astro.config.mjs`.
3. **Open Graph & Twitter Card:**
   - `og:type="website"`, `og:site_name="Nipuna Sachintha"`, `og:title`, `og:description`, `og:url="https://www.sachinthax.live/"`, `og:image="https://www.sachinthax.live/og-image.png"`, `og:image:width="1200"`, `og:image:height="630"`, `og:image:alt`.
   - `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`.
4. **Static Sitemap & Robots (`public/sitemap.xml` & `public/robots.txt`):**
   - `public/sitemap.xml` declares `https://www.sachinthax.live/` cleanly with zero integration dependencies.
   - `public/robots.txt`:
     ```text
     User-agent: *
     Allow: /

     Sitemap: https://www.sachinthax.live/sitemap.xml
     ```
   - `src/pages/404.astro` includes `<meta name="robots" content="noindex" />` and `<title>404 — Page Not Found | Nipuna Sachintha</title>`.
5. **Structured Data (`application/ld+json`):**
   - `Person` schema in `<head>` on the home page: `name`, `alternateName` (`"SachinthaX"`), `jobTitle` (`"Full-Stack Developer"`), `url` (`"https://www.sachinthax.live/"`), `email` (`"mailto:nipunasachintha77@gmail.com"`), `address` (`"Gampaha"`, `"LK"`), `sameAs` (`["https://github.com/SachinthaX", "https://www.linkedin.com/in/h-n-sachintha/"]`). No university, phone, street address, or references.

---

## 8. Accessibility & Compiler Safety Plan

- **Landmark Hierarchy:** `<header>`, `<main id="main-content">`, and `<footer>` are direct children of `<body>`. Each `<section>` uses `aria-labelledby`.
- **Skip Link:** First focusable element in `<body>` is `<a href="#main-content" class="skip-link">Skip to main content</a>`.
- **No-JS Navigation & Theme Script:**
  - Inline `<script is:inline>` in `<head>` immediately runs `document.documentElement.classList.add('js')` and resolves `localStorage.getItem('theme')` vs `matchMedia('(prefers-color-scheme: light)').matches` (falling back to `dark`) before first paint.
  - Because mobile drawer collapse and the mobile toggle button are scoped to `html.js` rules (`html.js .nav-toggle`, `html.js .nav-links`), **navigation links remain visible, wrapped cleanly, and 100% usable when JavaScript is disabled**.
  - When JS is active, mobile menu closes on link click, `Escape` (restoring focus), outside click, or resize `>= 768px`; theme toggle keeps `aria-pressed` / `aria-label` synced.
- **Focus & Interactive Affordance:**
  - Global `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }`.
  - External links use `target="_blank" rel="noopener noreferrer"` with explicit `aria-label` / `(opens in new tab)` sr-only text; inline SVGs carry `aria-hidden="true"`.
- **Zero `opacity: 0` Trap & Reduced Motion:**
  - All sections render at `opacity: 1` by default; `scroll-behavior: smooth` and `@media (hover: hover)` transforms are wrapped in `@media (prefers-reduced-motion: no-preference)`.
- **Astro 7 Rust Compiler & Markup Rules:**
  - Astro 7's Rust compiler (`@astrojs/compiler-rs`) rejects unclosed HTML/component tags and stops silently restructuring invalid HTML (such as block elements inside `<p>`). All components must keep strictly valid HTML nesting and explicit closing tags.
  - `compressHTML: true` is set in `astro.config.mjs` to preserve single spaces between inline tags across lines (`compressHTML: 'jsx'` is otherwise Astro 7's default).

---

## 9. Ordered Task List & Acceptance Criteria

### Stage 0 — Branch Check & Leftover Cleanup *(Done — `bf94293`)*
- **Tasks:** Confirmed branch `redesign`; removed Vite template assets, old React files, and `public/Nipuna-Sachintha-SE.pdf`.
- **Acceptance criteria:** `redesign` active; zero legacy Vite files or old CV PDF remain.

### Stage 1 — Astro Scaffold, Upgrade to Node 22 & Astro 7 *(Done — `5f0486a`, upgraded in `Upgrade to Node 22 and Astro 7`)*
- **Tasks:** Configured Node `22.23.4` (`.nvmrc` & `engines`), installed `astro@7.4.13`, `@fontsource-variable/inter@5.3.0`, `@fontsource-variable/jetbrains-mono@5.3.0`, `@astrojs/check@0.9.12`, and `typescript@5.9.3` (plus `sharp@0.35.5`), configured `astro.config.mjs` (`output: 'static'`, `compressHTML: true`) and `tsconfig.json`, and verified clean install, audit, check, and build.
- **Acceptance criteria:** `npm audit` = `0 vulnerabilities`; `npm run check` and `npm run build` pass with 0 errors/warnings.

### Stage 2 — Design Tokens, Base Layout, Theme Script, & Chrome
- **Tasks:** Create `src/styles/tokens.css`, `src/styles/global.css`, `src/components/Icon.astro`, `src/layouts/BaseLayout.astro` (with inline `<head>` `.js` + theme script, font preloads, SEO tags, JSON-LD, skip link), `src/components/Navbar.astro`, and `src/components/Footer.astro`.
- **Acceptance criteria:** `data-theme="dark"` / `"light"` switch cleanly with zero FOUC; `<header>`, `<main>`, and `<footer>` are sibling landmarks; nav links stay visible when JS is disabled and collapse cleanly when `html.js` is present; `npm run check` and `npm run build` pass.

### Stage 3 — Single-Source Content Module & Custom Assets
- **Tasks:** Create `src/data/content.ts` populated strictly from `content-brief.md` (`SHOW_CV = false`, `NoLoopTech` ended `Oct 2026 to Nov 2026`, `projects` without links, no university names). Generate `public/favicon.svg` (`NS` monogram), `public/og-image.png` (`1200x630`), `public/sitemap.xml`, and `public/robots.txt`.
- **Acceptance criteria:** Zero occurrences of phone numbers, references, university names, or invented metrics/links; `og-image.png` is valid `1200x630` PNG; `sitemap.xml` and `robots.txt` valid; `npm run check` and `npm run build` pass.

### Stage 4 — Section Components & Page Assembly
- **Tasks:** Implement `Hero.astro` (including `<Picture priority ... />`), `About.astro`, `Experience.astro`, `Projects.astro`, `Skills.astro`, `Credentials.astro`, `Contact.astro`, `src/pages/index.astro`, and `src/pages/404.astro`.
- **Acceptance criteria:** Exact section order matches `design-direction.md`; Hero displays 3 quick facts + GitHub/LinkedIn/Email icons and hides `Download CV` (`SHOW_CV = false`); About ends with Languages line; Projects show 4 cards with no link rows; Skills show 4 text-chip groups; Certifications & Education share one section; `/404` matches design and links home; `npm run check` and `npm run build` pass.

### Stage 5 — Verification, Documentation, & Build Audit
- **Tasks:** Update `README.md` (`https://www.sachinthax.live/`, `https://www.linkedin.com/in/h-n-sachintha/`, Node `22.23.4`, Astro 7 stack, `npm run check`). Run `npm run check` and `npm run build`; verify `dist/index.html`, `dist/404.html`, `dist/sitemap.xml`, and `dist/robots.txt`; test across `320px`, `768px`, `1024px`, and `1440px` in dark, light, reduced-motion, and JS-disabled modes; run Lighthouse checks targeting `>= 95` across all 4 categories.
- **Acceptance criteria:** `npm run check` and `npm run build` pass; zero horizontal overflow at `320px`; nav usable with JS disabled; Lighthouse >= 95 across categories (with local-preview vs production nuances noted if any).

---

## 10. Vercel Deployment Notes

- **Required Node.js Version (`22.x`):** Because `astro@7.4.13` requires `node >= 22.23.4`, **Vercel Project Settings → Node.js Version MUST be set to `22.x`** (building on `20.x` will fail). `.nvmrc` (`22.23.4`) and `package.json` `"engines"` (`>=22.23.4`) reinforce this.
- **Framework Preset:** Change the existing Vercel project's **Framework Preset** from **Vite** to **Astro** in Vercel Project Settings → *Build and Deployment*.
- **Build & Output Settings:**
  - **Install Command:** `npm ci` (or `npm install`)
  - **Build Command:** `npm run build` (`astro build`)
  - **Output Directory:** `dist` (pure static output: `index.html`, `404.html`, `/_astro/*`, `sitemap.xml`, `robots.txt`, `og-image.png`, `favicon.svg`).
- **Domain & Preview Workflow:** Preview `redesign` on Vercel's branch preview URL first, then merge `redesign` into `main` for production at `https://www.sachinthax.live/` (keeping the existing apex `sachinthax.live` → `www.sachinthax.live` `307` redirect).

---

## 11. Risks & Open Clarifications

1. **Vercel Project Settings (`Node.js Version` & `Framework Preset`):** When pushing `redesign`, verify the existing Vercel dashboard configuration uses **Node `22.x`** and **Astro** preset so builds do not fail on old Node `20.x` or Vite defaults.
2. **Astro 7 Rust Compiler Strictness:** All `.astro` templates must have matching closing tags and valid HTML nesting (e.g., no `<div>` inside `<p>`), otherwise the Rust compiler fails the build or outputs unadjusted markup.
3. **`astro:assets` Default Cropping & Virtual Classes:** Astro 7 applies cropping by default and emits virtual CSS classes + `data-astro-image` attributes instead of inline `style` attributes; verify Hero portrait framing (`position="center 20%"`) visually in Stage 4/5.
4. **Hero `SHOW_CV = false` Visual Balance:** With `Download CV` hidden initially, Hero displays one CTA button (`View Projects`). Ensure spacing handles both 1 button now and 2 buttons once `SHOW_CV` becomes `true`.
5. **Location & Card Styling Within Icon Rule:** Since icons are limited to `GitHub`, `LinkedIn`, `Email`, `theme toggle`, and `menu`, `Gampaha, Sri Lanka` and Certifications/Education cards will rely on typography and borders without extra icons.
