import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProgressStore = create(
  persist(
    (set, get) => ({
      // Completed topics (Set stored as array for serialization)
      completedTopics: [],
      // Bookmarked topics
      bookmarkedTopics: [],
      // Theme
      theme: "dark",
      // Onboarding seen
      onboardingSeen: false,
      // Sidebar collapsed
      sidebarCollapsed: false,

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
