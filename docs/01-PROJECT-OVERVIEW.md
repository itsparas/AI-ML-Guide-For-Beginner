# CodeAtlas — Project Overview

## What Is This Project?

**CodeAtlas** is a self-learning roadmap web application that guides users through structured learning tracks (AI/ML, DSA, System Design, Development). It provides curated content, progress tracking, and interactive visual roadmaps.

**Live Title**: "CodeAtlas — Map Your Way Through Tech Mastery"

## Tech Stack

| Layer          | Technology                                | Purpose                                     |
| -------------- | ----------------------------------------- | ------------------------------------------- |
| Framework      | **React 19** + **Vite 7**                 | UI rendering + fast dev server              |
| Styling        | **TailwindCSS 3** (class-based dark mode) | Utility-first CSS with custom design system |
| State          | **Zustand** (with `persist` middleware)   | Global state persisted to localStorage      |
| Routing        | **React Router DOM 7**                    | Client-side routing                         |
| Animation      | **Framer Motion 12**                      | Page transitions, modals, micro-animations  |
| Graphs         | **@xyflow/react** (React Flow)            | Interactive node-based roadmap graph        |
| Icons          | **react-icons** (Font Awesome + Tabler)   | Iconography throughout the UI               |
| Celebration    | **canvas-confetti**                       | Confetti on phase completion                |
| CSS Processing | **PostCSS** + **Autoprefixer**            | CSS transformations                         |

## Directory Structure

```
AIML/
├── index.html              # Entry point (title, meta, SEO)
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite config (react plugin)
├── tailwind.config.js      # Custom colors, fonts, animations
├── postcss.config.js       # PostCSS plugins
├── src/
│   ├── main.jsx            # React DOM render entry
│   ├── App.jsx             # Router, Layout, lazy-loaded pages
│   ├── index.css           # Global styles, glass effects, light mode
│   ├── components/         # 9 reusable UI components
│   ├── pages/              # 7 page-level components
│   ├── data/               # JSON content + utility data helpers
│   │   ├── phases/         # 11 phase JSON files (phase0–phase10)
│   │   └── dsa/            # DSA problem data (question-section-wise.json)
│   ├── store/              # Zustand store (useProgressStore.js)
│   └── utils/              # Data utilities (dataUtils.js)
└── public/                 # Static assets (vite.svg)
```

## Active Learning Tracks

| Track             | Status         | Route                  | Content                              |
| ----------------- | -------------- | ---------------------- | ------------------------------------ |
| **AI / ML**       | ✅ Active      | `/aiml`                | 11 phases, ~73 topics, full content  |
| **DSA**           | ✅ Active      | `/dsa`                 | 34 sections, ~867 problems           |
| **System Design** | 🔒 Coming Soon | `/track/system-design` | HLD + LLD subtracks preview          |
| **Development**   | 🔒 Coming Soon | `/track/development`   | JS/Python/Java/Go frameworks preview |

## Key Routes

| Route                     | Page Component   | Purpose                          |
| ------------------------- | ---------------- | -------------------------------- |
| `/`                       | `Home`           | Landing page — track selection   |
| `/aiml`                   | `AimlHome`       | AI/ML dashboard + roadmap graph  |
| `/phase/:phaseId`         | `PhasePage`      | Phase detail with topic list     |
| `/topic/:topicId`         | `TopicPage`      | Topic detail (videos, ELI5, etc) |
| `/dsa`                    | `DsaHome`        | DSA overview + section grid      |
| `/dsa/section/:sectionId` | `DsaSectionPage` | DSA section with problem list    |
| `/track/:trackId`         | `ComingSoonPage` | Placeholder for future tracks    |

## NPM Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

## Key Design Decisions

1. **All pages are lazy-loaded** via `React.lazy()` for code splitting
2. **State persists to localStorage** under key `"aiml-roadmap-progress"`
3. **Dark mode is default** — toggled via CSS class `dark`/`light` on `<html>`
4. **Sidebar is track-aware** — only renders when a track (aiml/dsa) is active
5. **Content is JSON-driven** — topics, phases, problems are all static JSON data
6. **No backend** — everything runs client-side with browser storage
