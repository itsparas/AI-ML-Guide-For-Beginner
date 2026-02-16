# State Management & Utilities

---

## useProgressStore.js (Zustand Store)

**File**: `src/store/useProgressStore.js`  
**Persistence Key**: `"aiml-roadmap-progress"` (localStorage)

### State Shape

```js
{
  // --- AI/ML Progress ---
  completedTopics: [],          // Array of topic IDs (e.g., ["python-programming", "git-github"])
  bookmarkedTopics: [],         // Array of topic IDs
  completedSubtopics: {},       // { topicId: [subtopicIndex, ...] }
  expandedSubtopics: {},        // { topicId: [subtopicIndex, ...] } (UI state)

  // --- DSA Progress ---
  completedDsaProblems: [],     // Array of DSA problem IDs

  // --- UI State ---
  theme: "dark",                // "dark" | "light"
  sidebarCollapsed: false,      // Desktop sidebar state
  onboardingSeen: false,        // First-visit modal dismissed
  activeTrack: null,            // "aiml" | "dsa" | null
}
```

### Actions

| Action                               | Description                                       |
| ------------------------------------ | ------------------------------------------------- |
| `toggleTopic(topicId)`               | Add/remove topic from completedTopics             |
| `toggleBookmark(topicId)`            | Add/remove topic from bookmarkedTopics            |
| `toggleSubtopic(topicId, idx)`       | Add/remove subtopic index from completedSubtopics |
| `toggleExpandSubtopic(topicId, idx)` | Toggle subtopic expansion (non-persistent)        |
| `toggleDsaProblem(problemId)`        | Add/remove DSA problem from completedDsaProblems  |
| `toggleTheme()`                      | Switch between "dark" and "light"                 |
| `toggleSidebar()`                    | Toggle desktop sidebar collapsed state            |
| `setOnboardingSeen()`                | Mark onboarding as seen                           |
| `setActiveTrack(trackId)`            | Set current track ("aiml", "dsa", or null)        |
| `resetTrackProgress(trackId)`        | Clear all progress for a specific track           |
| `resetAllProgress()`                 | Clear all data from store                         |

### Computed Getters

| Getter                                    | Returns                                     |
| ----------------------------------------- | ------------------------------------------- |
| `isTopicCompleted(topicId)`               | Boolean                                     |
| `isBookmarked(topicId)`                   | Boolean                                     |
| `isSubtopicCompleted(topicId, idx)`       | Boolean                                     |
| `getSubtopicProgress(topicId, totalSubs)` | `{ completed: N, total: M, percentage: P }` |
| `getPhaseProgress(phaseTopicIds)`         | `{ completed: N, total: M, percentage: P }` |
| `isDsaProblemCompleted(problemId)`        | Boolean                                     |
| `getDsaSectionProgress(problemIds)`       | `{ completed: N, total: M, percentage: P }` |
| `getOverallDsaProgress(allProblemIds)`    | `{ completed: N, total: M, percentage: P }` |

### Theme Side Effects

The `toggleTheme` action directly manipulates `document.documentElement.classList`, toggling `"dark"` and `"light"` CSS classes on `<html>`.

---

## dataUtils.js

**File**: `src/utils/dataUtils.js`  
**Purpose**: Aggregates all 11 phase JSON files with roadmap metadata.

### How It Works

1. Imports all phase JSON files (phase0–phase10) and `roadmap.json`
2. Creates `phaseDataMap` — maps phase ID → topic array
3. Merges each `roadmap.json` phase entry with its topics → `phasesWithTopics`
4. Flattens all topics → `allTopics`, `allTopicIds`

### Exports

| Export                      | Type     | Description                                          |
| --------------------------- | -------- | ---------------------------------------------------- |
| `phasesWithTopics`          | Array    | Phase metadata + nested `topics` array               |
| `allTopics`                 | Array    | Flat array of all ~73 topic objects                  |
| `allTopicIds`               | Array    | Flat array of all topic ID strings                   |
| `totalEstimatedHours`       | Number   | Sum of all `estimatedHours` across all topics        |
| `getTopicById(id)`          | Function | Lookup a single topic by ID                          |
| `getPhaseForTopic(topicId)` | Function | Find which phase a topic belongs to                  |
| `searchTopics(query)`       | Function | Search topics by title, description, tags, subtopics |
| `getRandomQuote()`          | Function | Random quote from `metadata.json`                    |

### Data Flow Diagram

```
roadmap.json (phase metadata)
     │
     ├── phase0.json ──┐
     ├── phase1.json ──┤
     ├── ...           ├── dataUtils.js ─► phasesWithTopics ─► Components
     ├── phase10.json ──┘                ─► allTopics
     │                                   ─► searchTopics()
     │
metadata.json ─────────────────────────► getRandomQuote()

question-section-wise.json ─► dsaUtils.js ─► dsaSections ─► DSA Components
                                           ─► getDsaSection()
```
