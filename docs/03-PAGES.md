# Pages Reference

All pages live in `src/pages/`. Each is lazy-loaded in `App.jsx` via `React.lazy()`.

---

## Home.jsx (248 lines) — Route: `/`

**Purpose**: Landing page — track selection hub.

**Sets**: `activeTrack = null` (clears sidebar)

**Sections**:

1. **Hero** — AnimatedBackground + gradient overlay, "CodeAtlas" title, subtitle
2. **Track Cards** — Grid of all 4 tracks with:
   - Icon, name, description, status badge
   - For active tracks: progress bar, completed count, total count
   - For coming-soon tracks: subtrack preview chips
   - Click → navigates to track basePath and sets `activeTrack`

**Data**: Uses `tracks` from `data/tracks.js`, progress from store

---

## AimlHome.jsx (390 lines) — Route: `/aiml`

**Purpose**: AI/ML track dashboard — the main roadmap hub.

**Sets**: `activeTrack = "aiml"`

**Sections**:

1. **Hero** — AnimatedBackground, topic/hours/phases badge, title, inspirational quote, action buttons ("Continue Learning" → current phase, "Surprise Me" → random incomplete topic)
2. **Stats Row** — 5 cards: Total Topics, Completed, Subtopics done, Total Hours, Progress %
3. **Overall Progress Bar** — with current phase indicator text
4. **Roadmap View** — Toggle between:
   - **Graph mode**: `RoadmapGraph` (React Flow zigzag) — lazy-loaded
   - **List mode**: Vertical phase cards with progress bars, connector lines

**Data**: `phasesWithTopics`, `allTopics`, `allTopicIds`, `totalEstimatedHours`, `getRandomQuote`

---

## PhasePage.jsx (268 lines) — Route: `/phase/:phaseId`

**Purpose**: Phase detail page — lists all topics in a specific phase.

**Sets**: `activeTrack = "aiml"`

**Sections**:

1. **Phase Header** — gradient background, phase number, title, description, 4 stat cards (Topics, Weeks, Hours, Level), overall phase progress bar
2. **Difficulty Filter** — Buttons: All, Beginner, Intermediate, Advanced
3. **Topic Cards** — Each card shows:
   - Completion status (checkmark or number)
   - Title, truncated description
   - Meta: estimated hours, difficulty badge, subtopic count
   - Subtopic progress mini-bar
   - Bookmark indicator

---

## TopicPage.jsx (584 lines) — Route: `/topic/:topicId`

**Purpose**: Individual topic detail page — the richest page in the app.

**Sets**: `activeTrack = "aiml"`

**Sections**:

1. **Breadcrumb** — Home > Phase X: {shortTitle} > {topicTitle}
2. **Hero Header** — Phase badge, difficulty badge, completion badge, title, meta (hours/subtopics/videos), bookmark button, subtopic progress bar, "Mark as Complete" button (triggers confetti if whole phase completed)
3. **Two-Column Layout**:
   - **About This Topic** (2/3 width) — full description
   - **Why This Matters** (1/3 width) — importance explanation
4. **ELI5 Toggle** — "Explain Like I'm 5" overlay modal
5. **Interactive Subtopics** — Checklist of subtopics with expand/collapse, Google/YouTube links
6. **YouTube Videos** — Tab-style video selector with embedded iframe player; playlist links
7. **References & Resources** — External links grid
8. **Tags** — Hashtag chips
9. **Prerequisites** — Links to prerequisite topics with completion status
10. **Prev/Next Navigation** — Links to adjacent topics in the same phase

**Confetti Trigger**: When marking a topic complete, checks if all topics in the phase are now done. If so, fires `canvas-confetti`.

---

## DsaHome.jsx (227 lines) — Route: `/dsa`

**Purpose**: DSA track overview — section grid landing page.

**Sets**: `activeTrack = "dsa"`

**Sections**:

1. **Hero** — DSA icon, title, total problems/sections count, stats row (Total, Solved, Easy/Medium/Hard counts), overall progress bar
2. **Sections Grid** — 3-column grid, each section card shows:
   - Section icon, title, problem count, subsection count
   - Difficulty badges (E/M/H counts)
   - Progress bar with solved/total

---

## DsaSectionPage.jsx (343 lines) — Route: `/dsa/section/:sectionId`

**Purpose**: DSA section detail — problem list with checkboxes.

**Sets**: `activeTrack = "dsa"`

**Sections**:

1. **Header** — Section icon, title, stats, difficulty badges, progress bar
2. **Filter Bar** — All, Unsolved, Solved, Easy, Medium, Hard
3. **Problem List** — Two layouts:
   - **With subsections**: Collapsible accordion groups
   - **Without subsections**: Flat list
4. **Each Problem Row**: Checkbox, label, difficulty badge, important star, external links (Problem link, GitHub solution link)

---

## ComingSoonPage.jsx (283 lines) — Route: `/track/:trackId`

**Purpose**: Placeholder page for future tracks (System Design, Development).

**Sets**: `activeTrack = track.id`

**Sections**:

1. **Hero** — Track icon, name, "Coming Soon" badge, description
2. **What to Expect** — Different layout per track:
   - **System Design**: HLD + LLD subtrack cards with expected topic lists
   - **Development**: Language cards (JS, Python, Java, Go) with framework lists
3. **CTA** — "Explore AI/ML Roadmap" fallback link
