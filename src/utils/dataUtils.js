import roadmapData from "../data/roadmap.json";
import phase0 from "../data/phases/phase0.json";
import phase1 from "../data/phases/phase1.json";
import phase2 from "../data/phases/phase2.json";
import phase3 from "../data/phases/phase3.json";
import phase4 from "../data/phases/phase4.json";
import phase5 from "../data/phases/phase5.json";
import phase6 from "../data/phases/phase6.json";
import phase7 from "../data/phases/phase7.json";
import phase8 from "../data/phases/phase8.json";
import phase9 from "../data/phases/phase9.json";
import phase10 from "../data/phases/phase10.json";
import metadata from "../data/metadata.json";

const phaseDataMap = {
  0: phase0,
  1: phase1,
  2: phase2,
  3: phase3,
  4: phase4,
  5: phase5,
  6: phase6,
  7: phase7,
  8: phase8,
  9: phase9,
  10: phase10,
};

// All topics flat array
export const allTopics = Object.values(phaseDataMap).flat();

// All topic IDs
export const allTopicIds = allTopics.map((t) => t.id);

// Get topics for a phase
export const getPhaseTopics = (phaseId) => phaseDataMap[phaseId] || [];

// Get topic by id
export const getTopicById = (topicId) =>
  allTopics.find((t) => t.id === topicId);

// Get phase info by id
export const getPhaseInfo = (phaseId) =>
  roadmapData.phases.find((p) => p.id === phaseId);

// Phases with topics
export const phasesWithTopics = roadmapData.phases.map((phase) => ({
  ...phase,
  topics: phaseDataMap[phase.id] || [],
}));

// Total estimated hours
export const totalEstimatedHours = allTopics.reduce(
  (sum, t) => sum + (t.estimatedHours || 0),
  0,
);

// Random quote
export const getRandomQuote = () => {
  const quotes = metadata.quotes;
  return quotes[Math.floor(Math.random() * quotes.length)];
};

// Search topics
export const searchTopics = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allTopics.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.subtopics.some((st) => st.toLowerCase().includes(q)),
  );
};

// Filter topics
export const filterTopics = (difficulty, phaseId) => {
  let filtered = allTopics;
  if (difficulty && difficulty !== "all") {
    filtered = filtered.filter((t) => t.difficulty === difficulty);
  }
  if (phaseId !== undefined && phaseId !== null && phaseId !== "all") {
    filtered = filtered.filter((t) => t.phase === parseInt(phaseId));
  }
  return filtered;
};

export { roadmapData, metadata };
