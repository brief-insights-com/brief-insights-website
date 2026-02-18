# BriefInsights — Landing Website

Marketing landing page for **BriefInsights**, an Intelligent Document Processing company based in Berlin, Germany. The product, **BriefXtract**, helps debt counselors cut document-processing time by 90% — from ~150 minutes per case down to ~15 minutes.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** (build tool & dev server)
- **Tailwind CSS** + **shadcn/ui** (styling & components)
- **Framer Motion** (animations)
- **react-i18next** (internationalisation — EN/DE)
- **React Query** (async state)

## Project structure

```
src/
├── assets/          # Images and video files
├── components/      # Shared components (Navbar, BentoGrid, DemoModal, …)
│   └── ui/          # shadcn/ui primitives
├── hooks/           # Custom React hooks
├── pages/
│   └── Index.tsx    # Main landing page (all sections)
└── main.tsx         # App entry point
```

## Getting started

Node.js 18+ and npm are required.

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot-reload |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |

## Page sections

| Section | Description |
|---|---|
| **Hero** | Full-screen background video with headline and CTAs |
| **Stats Bar** | Key metrics (90% time saved, ~15 min per case, 4,000+ counselors) |
| **Problem** | Parallax imagery illustrating manual document chaos |
| **Features** | Product demo video + bento-grid feature cards |
| **Before / After** | Side-by-side comparison with animated time-reduction bars |
| **About** | Company mission, team placeholders, and contact |
| **Footer** | Email CTA and GDPR / zero-data-retention notice |

## Internationalisation

Translations live under `src/i18n/` (or wherever the locale JSON files are stored). The language switcher in the navbar toggles between English and German at runtime via `react-i18next`.

## Contact

**info@brief-insights.com** · Berlin, Germany
