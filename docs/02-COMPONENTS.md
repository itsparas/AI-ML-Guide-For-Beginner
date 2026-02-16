# Components Reference

All components live in `src/components/`. Each is a React functional component using Framer Motion for animations.

---

## Layout.jsx (182 lines)

**Purpose**: Master layout wrapper — renders header, sidebar, modals, and page content.

**Key Behavior**:

- Only shows sidebar when `activeTrack` is `"aiml"` or `"dsa"`
- Dynamically adjusts content margin based on sidebar collapsed state
- Shows track-specific icon + name in header, or "CodeAtlas" logo when no track
- Toggles between desktop sidebar collapse and mobile sidebar overlay
- **Ctrl+K** opens `SearchModal`; **ESC** closes it
- Shows `OnboardingModal` on first visit (until `onboardingSeen` is set)

**Props**: `children` — the page content rendered via React Router

**State Dependencies**: `useProgressStore` — theme, sidebar state, onboarding, activeTrack

---

## Sidebar.jsx (529 lines)

**Purpose**: Collapsible navigation sidebar with AI/ML phase tree and DSA section list.

**Key Behavior**:

- Renders **different navigation** based on `activeTrack`:
  - `"aiml"` → Phase accordion with expandable topic lists, progress indicators
  - `"dsa"` → Flat section list with problem counts and progress
- Returns `null` when no track is active (landing page)
- **Desktop**: Fixed sidebar (72 = `w-72` expanded, `w-16` collapsed)
- **Mobile**: Slide-in overlay with backdrop blur

**Phase Icons**: Maps phase IDs 0-10 to specific react-icons (Python, Math, Database, Brain, etc.)

**Data Dependencies**: `phasesWithTopics` (from `dataUtils`), `dsaSections` (from `dsaUtils`)

---

## AnimatedBackground.jsx (132 lines)

**Purpose**: Canvas-based particle animation for hero sections.

**How It Works**:

- Creates particles with random position, hue (220-280 range = blue/purple), speed, opacity pulsing
- Draws 3 floating gradient orbs that slowly orbit
- Connects nearby particles (distance < 100px) with faint lines
- Responsive — recalculates on window resize
- Uses `requestAnimationFrame` loop with proper cleanup

**Used In**: `Home.jsx` hero, `AimlHome.jsx` hero

---

## RoadmapGraph.jsx (118 lines)

**Purpose**: Interactive flowchart visualization of all 11 AI/ML phases using React Flow.

**How It Works**:

- Builds nodes in a **zigzag pattern** (alternating x=0 and x=320, y increments by 180)
- Each node is a `PhaseNode` component showing title, progress bar, difficulty badge
- Edges connect phases sequentially; current edge is animated, past edges are green
- Clicking a node navigates to `/phase/:phaseId`
- Includes `MiniMap`, `Controls`, and dot-grid `Background`

**Used In**: `AimlHome.jsx` (lazy-loaded, toggled with Graph/List view mode)

---

## PhaseNode.jsx (132 lines)

**Purpose**: Custom React Flow node for a single phase in the roadmap graph.

**Displays**: Phase number/icon, title, topic count, estimated weeks, description (2-line clamp), progress bar, difficulty badge, "NOW" badge for current phase, glow effect for current phase.

**Props (via `data`)**: `phase`, `progress`, `isComplete`, `isCurrent`, `topicCount`

---

## InteractiveSubtopic.jsx (141 lines)

**Purpose**: Expandable subtopic checklist item with learning resources.

**Key Features**:

- Checkbox to mark subtopic complete (with spring animation)
- Expandable section with quick tip + action links
- **Google Search** link: `google.com/search?q={subtopic} tutorial`
- **YouTube** link: `youtube.com/results?search_query={subtopic} explained`
- Visual states: completed (green + strikethrough), expanded (rotated chevron)

**Props**: `topicId`, `subtopic` (string), `index`, `phaseColor`

---

## ELI5Toggle.jsx (121 lines)

**Purpose**: "Explain Like I'm 5" toggle that opens a full-screen modal with simplified explanation.

**Key Features**:

- Toggle button with animated switch indicator
- Full-screen overlay modal with amber/orange gradient theme
- Displays `eli5` text from topic data
- Closes on backdrop click, ESC key, or close button
- Only renders if `eli5Text` prop is provided

---

## SearchModal.jsx (129 lines)

**Purpose**: Global topic search modal (Ctrl+K shortcut).

**How It Works**:

- Auto-focuses input on open
- Searches topics by title, description, tags, and subtopics (via `searchTopics()`)
- Shows max 10 results with phase color dot, difficulty badge
- Clicking a result navigates to `/topic/:topicId`

---

## OnboardingModal.jsx (103 lines)

**Purpose**: First-visit welcome modal introducing app features.

**Displays**: 4 feature cards (Track Progress, Bookmark Topics, Quick Search, Visual Roadmap), a "Start Learning" CTA button.

**Behavior**: Sets `onboardingSeen: true` in store on close; never shows again.
