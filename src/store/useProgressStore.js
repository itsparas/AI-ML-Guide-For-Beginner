import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProgressStore = create(
  persist(
    (set, get) => ({
      // Completed topics (Set stored as array for serialization)
      completedTopics: [],
      // Bookmarked topics
      bookmarkedTopics: [],
      // Completed subtopics: { topicId: [subtopicIndex, ...] }
      completedSubtopics: {},
      // Expanded subtopics (UI state, not persisted but we keep it here for simplicity)
      expandedSubtopics: {},
      // Theme
      theme: "dark",
      // Onboarding seen
      onboardingSeen: false,
      // Sidebar collapsed
      sidebarCollapsed: false,
      // Mobile sidebar open
      mobileSidebarOpen: false,
      // ELI5 mode
      eli5Mode: false,
      // Active track
      activeTrack: null,
      // DSA completed problem IDs
      completedDsaProblems: [],

      // Actions
      toggleTopicComplete: (topicId) => {
        const current = get().completedTopics;
        if (current.includes(topicId)) {
          set({ completedTopics: current.filter((id) => id !== topicId) });
        } else {
          set({ completedTopics: [...current, topicId] });
        }
      },

      isTopicComplete: (topicId) => {
        return get().completedTopics.includes(topicId);
      },

      toggleBookmark: (topicId) => {
        const current = get().bookmarkedTopics;
        if (current.includes(topicId)) {
          set({ bookmarkedTopics: current.filter((id) => id !== topicId) });
        } else {
          set({ bookmarkedTopics: [...current, topicId] });
        }
      },

      isBookmarked: (topicId) => {
        return get().bookmarkedTopics.includes(topicId);
      },

      toggleSubtopicComplete: (topicId, subtopicIdx) => {
        const current = get().completedSubtopics;
        const topicSubs = current[topicId] || [];
        const updated = topicSubs.includes(subtopicIdx)
          ? topicSubs.filter((i) => i !== subtopicIdx)
          : [...topicSubs, subtopicIdx];
        set({ completedSubtopics: { ...current, [topicId]: updated } });
      },

      isSubtopicComplete: (topicId, subtopicIdx) => {
        const subs = get().completedSubtopics[topicId] || [];
        return subs.includes(subtopicIdx);
      },

      getSubtopicProgress: (topicId, totalSubtopics) => {
        const subs = get().completedSubtopics[topicId] || [];
        return totalSubtopics > 0 ? Math.round((subs.length / totalSubtopics) * 100) : 0;
      },

      toggleExpandedSubtopic: (topicId, subtopicIdx) => {
        const key = `${topicId}-${subtopicIdx}`;
        const current = get().expandedSubtopics;
        set({ expandedSubtopics: { ...current, [key]: !current[key] } });
      },

      isSubtopicExpanded: (topicId, subtopicIdx) => {
        const key = `${topicId}-${subtopicIdx}`;
        return get().expandedSubtopics[key] || false;
      },

      toggleEli5Mode: () => set({ eli5Mode: !get().eli5Mode }),

      setActiveTrack: (trackId) => set({ activeTrack: trackId }),

      // DSA actions
      toggleDsaProblemComplete: (problemId) => {
        const current = get().completedDsaProblems;
        if (current.includes(problemId)) {
          set({ completedDsaProblems: current.filter((id) => id !== problemId) });
        } else {
          set({ completedDsaProblems: [...current, problemId] });
        }
      },

      isDsaProblemComplete: (problemId) => {
        return get().completedDsaProblems.includes(problemId);
      },

      getDsaSectionProgress: (problemIds) => {
        const completed = get().completedDsaProblems;
        const done = problemIds.filter((id) => completed.includes(id)).length;
        return problemIds.length > 0
          ? Math.round((done / problemIds.length) * 100)
          : 0;
      },

      getDsaOverallProgress: (allProblemIds) => {
        const completed = get().completedDsaProblems;
        const done = allProblemIds.filter((id) => completed.includes(id)).length;
        return allProblemIds.length > 0
          ? Math.round((done / allProblemIds.length) * 100)
          : 0;
      },

      toggleTheme: () => {
        const newTheme = get().theme === "dark" ? "light" : "dark";
        set({ theme: newTheme });
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        }
      },

      setOnboardingSeen: () => set({ onboardingSeen: true }),

      toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),

      toggleMobileSidebar: () => set({ mobileSidebarOpen: !get().mobileSidebarOpen }),
      closeMobileSidebar: () => set({ mobileSidebarOpen: false }),

      // Computed
      getPhaseProgress: (phaseTopicIds) => {
        const completed = get().completedTopics;
        const done = phaseTopicIds.filter((id) =>
          completed.includes(id),
        ).length;
        return phaseTopicIds.length > 0
          ? Math.round((done / phaseTopicIds.length) * 100)
          : 0;
      },

      getOverallProgress: (allTopicIds) => {
        const completed = get().completedTopics;
        const done = allTopicIds.filter((id) => completed.includes(id)).length;
        return allTopicIds.length > 0
          ? Math.round((done / allTopicIds.length) * 100)
          : 0;
      },

      getCurrentPhase: (phasesWithTopics) => {
        const completed = get().completedTopics;
        for (let i = 0; i < phasesWithTopics.length; i++) {
          const phaseTopicIds = phasesWithTopics[i].topics.map((t) => t.id);
          const allDone = phaseTopicIds.every((id) => completed.includes(id));
          if (!allDone) return i;
        }
        return phasesWithTopics.length - 1;
      },

      getIncompleteTopics: (allTopics) => {
        const completed = get().completedTopics;
        return allTopics.filter((t) => !completed.includes(t.id));
      },
    }),
    {
      name: "aiml-roadmap-progress",
    },
  ),
);

export default useProgressStore;
