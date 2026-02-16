import phase0 from "./dev/phases/phase0.json";
import phase1 from "./dev/phases/phase1.json";
import phase2 from "./dev/phases/phase2.json";
import devRoadmapData from "./dev/roadmap.json";

// Phase data map — mirrors dataUtils.js pattern
const devPhaseDataMap = {
  0: phase0,
  1: phase1,
  2: phase2,
};

// Aggregate all topics
export const allDevTopics = Object.values(devPhaseDataMap).flat();
export const allDevTopicIds = allDevTopics.map((t) => t.id);

// Get topics for a specific phase
export const getDevPhaseTopics = (phaseId) => devPhaseDataMap[phaseId] || [];

// Get a single topic by its unique ID
export const getDevTopicById = (topicId) =>
  allDevTopics.find((t) => t.id === topicId);

// Get phase metadata from roadmap
export const getDevPhaseInfo = (phaseId) =>
  devRoadmapData.phases.find((p) => p.id === phaseId);

// Phases with their topics merged in — used by DevHome and Sidebar
export const devPhasesWithTopics = devRoadmapData.phases.map((phase) => ({
  ...phase,
  topics: devPhaseDataMap[phase.id] || [],
}));

// Total estimated hours across all dev topics
export const totalDevEstimatedHours = allDevTopics.reduce(
  (sum, t) => sum + (t.estimatedHours || 0),
  0,
);

// Search dev topics by query string
export const searchDevTopics = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allDevTopics.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q))),
  );
};

// Filter dev topics by phase and/or difficulty
export const filterDevTopics = ({ phase, difficulty } = {}) => {
  return allDevTopics.filter((t) => {
    if (phase !== undefined && t.phase !== phase) return false;
    if (difficulty && t.difficulty !== difficulty) return false;
    return true;
  });
};

// Export the roadmap data directly for pages that need it
export { devRoadmapData };
