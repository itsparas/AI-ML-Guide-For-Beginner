import dsaData from "./dsa/question-section-wise.json";

// Build flat list of all problems with section info
const buildSections = () => {
  return dsaData.sections.map((section, idx) => {
    // Sections can have direct `problems` or `subsections` with problems inside
    let allProblems = [];
    let subsections = null;

    if (section.problems) {
      allProblems = section.problems;
    } else if (section.subsections) {
      subsections = section.subsections.map((sub) => ({
        title: sub.title,
        problems: sub.problems || [],
      }));
      allProblems = section.subsections.flatMap((sub) => sub.problems || []);
    }

    // Assign difficulty counts
    const difficultyCounts = { easy: 0, medium: 0, hard: 0 };
    allProblems.forEach((p) => {
      const d = p.difficulty || "medium";
      if (difficultyCounts[d] !== undefined) difficultyCounts[d]++;
    });

    return {
      id: idx,
      title: section.title,
      problems: allProblems,
      subsections,
      totalProblems: allProblems.length,
      difficultyCounts,
    };
  });
};

export const dsaSections = buildSections();

export const totalDsaProblems = dsaSections.reduce(
  (sum, s) => sum + s.totalProblems,
  0,
);

export const totalDsaSections = dsaSections.length;

// Get all problem IDs
export const allDsaProblemIds = dsaSections.flatMap((s) =>
  s.problems.map((p) => p.id),
);

// Get section by index
export const getDsaSection = (sectionId) =>
  dsaSections.find((s) => s.id === Number(sectionId));

// Section icon mapping
import {
  FaCalculator,
  FaTh,
  FaHashtag,
  FaPlusCircle,
  FaWaveSquare,
  FaExchangeAlt,
  FaSearch,
  FaSortAmountDown,
  FaSearchPlus,
  FaLayerGroup,
  FaStream,
  FaListOl,
  FaLink,
  FaStar,
  FaWindowMaximize,
  FaSlidersH,
  FaRedo,
  FaPuzzlePiece,
  FaTree,
  FaFont,
  FaChartLine,
  FaSuperscript,
  FaCompass,
  FaMicrochip,
  FaProjectDiagram,
  FaSitemap,
  FaSpellCheck,
  FaChartBar,
  FaRulerCombined,
  FaCogs,
  FaSquareRootAlt,
  FaDice,
  FaRandom,
  FaLightbulb,
} from "react-icons/fa";

export const dsaSectionIcons = {
  0: FaCalculator,     // Halwa Problems
  1: FaTh,             // Pattern Printing
  2: FaHashtag,        // HashSet / HashMap
  3: FaPlusCircle,     // Prefix Sum
  4: FaWaveSquare,     // Subarray Sum (Kadane's)
  5: FaExchangeAlt,    // Two Pointers
  6: FaSearch,         // Binary Search
  7: FaSortAmountDown, // Sorting
  8: FaSearchPlus,     // Answer on Binary Search
  9: FaLayerGroup,     // Stack
  10: FaStream,        // Monotonic Stack
  11: FaListOl,        // Queue
  12: FaLink,          // Linked List
  13: FaStar,          // Heap
  14: FaWindowMaximize,// Fixed Sliding Window
  15: FaSlidersH,      // Dynamic Sliding Window
  16: FaRedo,          // Recursion
  17: FaPuzzlePiece,   // Backtracking
  18: FaTree,          // Binary Tree / BST
  19: FaFont,          // String
  20: FaChartLine,     // Dynamic Programming
  21: FaSuperscript,   // Math
  22: FaCompass,       // Geometry
  23: FaMicrochip,     // Bit Manipulation
  24: FaProjectDiagram,// Graph
  25: FaSitemap,       // Disjoint Set Unions
  26: FaSpellCheck,    // Tries
  27: FaChartBar,      // Binary Index Tree
  28: FaRulerCombined, // Sweep Line
  29: FaCogs,          // Design
  30: FaSquareRootAlt, // SQRT Decomposition
  31: FaDice,          // Mo's Algorithm
  32: FaRandom,        // Randomization
  33: FaLightbulb,     // Puzzles
};

// Difficulty color mapping
export const difficultyColors = {
  easy: { bg: "bg-emerald-400/10", text: "text-emerald-400", color: "#34d399" },
  medium: { bg: "bg-amber-400/10", text: "text-amber-400", color: "#fbbf24" },
  hard: { bg: "bg-red-400/10", text: "text-red-400", color: "#f87171" },
};
