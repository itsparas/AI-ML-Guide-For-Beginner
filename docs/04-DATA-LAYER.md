# Data Layer Reference

All content data lives in `src/data/`. The app is **entirely JSON-driven** with zero backend.

---

## Data Architecture

```
src/data/
├── tracks.js               # Track definitions (AI/ML, DSA, System Design, Dev)
├── roadmap.json            # AI/ML roadmap metadata (11 phases)
├── metadata.json           # YouTube channels, quotes, difficulty levels
├── phases/                 # AI/ML topic content (11 files)
│   ├── phase0.json         # Prerequisites & Foundations (6 topics)
│   ├── phase1.json         # Mathematics for AI/ML (5 topics)
│   ├── phase2.json         # Data Handling & Preprocessing (7 topics)
│   ├── phase3.json         # ML Fundamentals (8 topics)
│   ├── phase4.json         # Deep Learning (8 topics)
│   ├── phase5.json         # NLP (7 topics)
│   ├── phase6.json         # Computer Vision (6 topics)
│   ├── phase7.json         # Reinforcement Learning (6 topics)
│   ├── phase8.json         # MLOps & Deployment (7 topics)
│   ├── phase9.json         # Specializations (8 topics)
│   └── phase10.json        # Projects & Portfolio (5 topics)
├── dsa/
│   └── question-section-wise.json   # ~867 DSA problems (280KB)
└── dsaUtils.js             # DSA data processing + icon mapping
```

---

## tracks.js

Exports an array of **4 track objects**:

```js
{
  id: "aiml",            // Unique identifier
  name: "AI / ML",       // Display name
  shortName: "AI/ML",    // Compact label
  description: "...",    // One-liner
  Icon: FaBrain,         // React-icon component
  color: "#818cf8",      // Brand color (hex)
  gradient: "from-indigo-500 to-purple-500",  // Tailwind gradient
  status: "active" | "coming-soon",
  badge: "AI",           // 2-char badge
  basePath: "/aiml",     // Route base
  subtracks: null | [...]  // null for active tracks, array for coming-soon
}
```

**Exports**: `tracks`, `getTrackById(id)`, `activeTrackData`, `comingSoonTracks`

---

## roadmap.json

Top-level AI/ML roadmap with **11 phase metadata objects**:

```json
{
  "title": "AI/ML Roadmap",
  "subtitle": "From Absolute Beginner to Advanced Expert",
  "totalPhases": 11,
  "phases": [
    {
      "id": 0,
      "slug": "prerequisites",
      "title": "Prerequisites & Foundations",
      "shortTitle": "Foundations",
      "description": "...",
      "icon": "FaPython",         // String key (resolved to component in Sidebar)
      "color": "#3B82F6",
      "gradientFrom": "#3B82F6",
      "gradientTo": "#06B6D4",
      "difficulty": "beginner" | "intermediate" | "advanced" | "all",
      "estimatedWeeks": 4,
      "topicCount": 6
    }
  ]
}
```

**Phases 0-10**: Prerequisites → Mathematics → Data Handling → ML Fundamentals → Deep Learning → NLP → Computer Vision → Reinforcement Learning → MLOps → Specializations → Projects

---

## Phase JSON Files (phase0.json — phase10.json)

Each phase file is a **JSON array of topic objects**:

```json
{
  "id": "python-programming", // Unique slug used in routes
  "title": "Python Programming",
  "phase": 0, // Phase index
  "difficulty": "beginner",
  "estimatedHours": 30,
  "description": "Long-form description (500+ words)...",
  "whyItMatters": "Importance explanation...",
  "eli5": "Explain Like I'm 5 text...",
  "subtopics": [
    // Array of strings
    "Variables, Data Types & Type Casting",
    "Strings, Lists, Tuples, Sets, Dictionaries"
  ],
  "youtubeVideos": [
    {
      "title": "...",
      "url": "https://youtube.com/...",
      "channel": "freeCodeCamp"
    }
  ],
  "references": [
    {
      "title": "Official Python Tutorial",
      "url": "https://docs.python.org/..."
    }
  ],
  "prerequisites": [], // Array of topic IDs
  "tags": ["python", "programming"]
}
```

**Total**: ~73 topics across 11 phases, each with rich descriptions, ELI5 text, subtopics, videos, and references.

---

## question-section-wise.json (DSA)

Single JSON file with **34 sections** containing ~867 problems:

```json
{
  "sections": [
    {
      "title": "Halwa Problems",
      "problems": [
        {
          "id": "unique-id",
          "label": "Problem Name",
          "difficulty": "easy" | "medium" | "hard",
          "important": true | false,
          "link": "https://leetcode.com/...",
          "solution": "https://github.com/..."   // Optional
        }
      ]
    },
    {
      "title": "Binary Tree / BST",
      "subsections": [              // Some sections use subsections
        {
          "title": "Binary Tree Basics",
          "problems": [...]
        }
      ]
    }
  ]
}
```

**34 Sections**: Halwa Problems, Pattern Printing, HashSet/HashMap, Prefix Sum, Kadane's, Two Pointers, Binary Search, Sorting, Answer on BS, Stack, Monotonic Stack, Queue, Linked List, Heap, Fixed/Dynamic Sliding Window, Recursion, Backtracking, Binary Tree/BST, String, DP, Math, Geometry, Bit Manipulation, Graph, DSU, Tries, BIT, Sweep Line, Design, SQRT Decomposition, Mo's Algorithm, Randomization, Puzzles

---

## metadata.json

Static metadata used across the app:

- **youtubeChannels** (12): 3Blue1Brown, StatQuest, Karpathy, Sentdex, freeCodeCamp, Krish Naik, Stanford, MIT OCW, DeepLearning.AI, Two Minute Papers, Yannic Kilcher, CodeEmporium
- **quotes** (16): Inspirational AI/ML quotes displayed in `AimlHome` hero
- **difficultyLevels** (3): beginner/intermediate/advanced with colors

---

## dsaUtils.js

Processes the raw DSA JSON into structured sections:

**Exports**:

- `dsaSections` — Array of processed section objects with difficulty counts
- `totalDsaProblems` — Sum of all problems (~867)
- `totalDsaSections` — Number of sections (34)
- `allDsaProblemIds` — Flat array of all problem IDs
- `getDsaSection(id)` — Lookup section by index
- `dsaSectionIcons` — Map of section index → react-icon component (34 icons)
- `difficultyColors` — `{ easy: {...}, medium: {...}, hard: {...} }`
