import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCheck,
  FaClock,
  FaBookmark,
  FaFilter,
  FaChevronRight,
  FaListUl,
} from "react-icons/fa";
import { getPhaseInfo, getPhaseTopics } from "../utils/dataUtils";
import useProgressStore from "../store/useProgressStore";

const PhasePage = () => {
  const { phaseId } = useParams();
  const phaseInfo = getPhaseInfo(parseInt(phaseId));
  const topics = getPhaseTopics(parseInt(phaseId));
  const { completedTopics, bookmarkedTopics, getPhaseProgress, completedSubtopics } =
    useProgressStore();
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const topicIds = topics.map((t) => t.id);
  const progress = getPhaseProgress(topicIds);

  const filteredTopics = useMemo(() => {
    if (difficultyFilter === "all") return topics;
    return topics.filter((t) => t.difficulty === difficultyFilter);
  }, [topics, difficultyFilter]);

  if (!phaseInfo) {
    return (
      <div className="text-center py-20">
        <p className="text-surface-400">Phase not found</p>
        <Link to="/" className="text-primary-400 mt-2 inline-block">
          ← Back to roadmap
        </Link>
      </div>
    );
  }

  const getDifficultyStyle = (diff) => {
    switch (diff) {
      case "beginner":
        return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";
      case "intermediate":
        return "bg-amber-400/10 text-amber-400 border-amber-400/20";
      case "advanced":
        return "bg-red-400/10 text-red-400 border-red-400/20";
      default:
        return "bg-surface-700 text-surface-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-surface-200 mb-6 transition-colors"
      >
        <FaArrowLeft className="text-xs" /> Back to Roadmap
      </Link>

      {/* Phase header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative rounded-2xl overflow-hidden mb-6"
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background: `linear-gradient(135deg, ${phaseInfo.gradientFrom}, ${phaseInfo.gradientTo})`,
          }}
        />
        <div className="relative glass rounded-2xl p-6 md:p-8 border-0">
          <div className="flex items-start gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${phaseInfo.gradientFrom}, ${phaseInfo.gradientTo})`,
              }}
            >
              {phaseInfo.id}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {phaseInfo.title}
              </h1>
              <p className="text-surface-400 text-base leading-relaxed">{phaseInfo.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: "Topics", value: topics.length, icon: "📚" },
              { label: "Weeks", value: `~${phaseInfo.estimatedWeeks}`, icon: "📅" },
              { label: "Hours", value: `~${topics.reduce((s, t) => s + t.estimatedHours, 0)}`, icon: "⏱" },
              { label: "Level", value: phaseInfo.difficulty, icon: "🎯" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="text-lg mb-0.5">{stat.icon}</div>
                <div className="text-sm font-bold">{stat.value}</div>
                <div className="text-xs text-surface-500">{stat.label}</div>
              </div>
            ))}
          </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-surface-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${phaseInfo.gradientFrom}, ${phaseInfo.gradientTo})`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        </div>
      </motion.div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        <FaFilter className="text-surface-500 text-sm flex-shrink-0" />
        {["all", "beginner", "intermediate", "advanced"].map((d) => (
          <button
            key={d}
            onClick={() => setDifficultyFilter(d)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
              difficultyFilter === d
                ? "bg-primary-500 text-white"
                : "glass hover:bg-white/10"
            }`}
          >
            {d === "all" ? "All" : d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      {/* Topic cards */}
      <div className="grid gap-3">
        {filteredTopics.map((topic, idx) => {
          const isComplete = completedTopics.includes(topic.id);
          const isBookmarked = bookmarkedTopics.includes(topic.id);
          const subsDone = (completedSubtopics[topic.id] || []).length;
          const subsTotal = topic.subtopics.length;
          const subsProgress = subsTotal > 0 ? Math.round((subsDone / subsTotal) * 100) : 0;

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to={`/topic/${topic.id}`}
                className={`block glass rounded-xl p-4 md:p-5 card-glow transition-all duration-300 hover:scale-[1.005] group ${
                  isComplete ? "border-l-3 border-l-emerald-500" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Status indicator */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isComplete
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "text-surface-400"
                    }`}
                    style={
                      !isComplete
                        ? { backgroundColor: `${phaseInfo.color}15`, color: phaseInfo.color }
                        : {}
                    }
                  >
                    {isComplete ? (
                      <FaCheck className="text-sm" />
                    ) : (
                      <span className="text-sm font-bold">{idx + 1}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm md:text-base truncate group-hover:text-primary-400 transition-colors">
                        {topic.title}
                      </h3>
                      {isBookmarked && (
                        <FaBookmark className="text-amber-400 text-xs flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-surface-400 line-clamp-2 mb-3">
                      {topic.description.slice(0, 150)}...
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-sm text-surface-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />{" "}
                        {topic.estimatedHours}h
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full ${getDifficultyStyle(topic.difficulty)}`}
                      >
                        {topic.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaListUl className="text-xs" />{" "}
                        {topic.subtopics.length} subtopics
                      </span>
                    </div>

                    {/* Subtopic progress mini bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-surface-700/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: isComplete
                              ? "#10b981"
                              : `linear-gradient(90deg, ${phaseInfo.gradientFrom}, ${phaseInfo.gradientTo})`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${isComplete ? 100 : subsProgress}%` }}
                          transition={{ duration: 0.5, delay: idx * 0.05 }}
                        />
                      </div>
                      <span className="text-xs text-surface-500 w-14 text-right">
                        {isComplete ? "Done" : `${subsDone}/${subsTotal}`}
                      </span>
                    </div>
                  </div>

                  <FaChevronRight className="text-surface-600 group-hover:text-primary-400 transition-colors mt-1 flex-shrink-0 text-xs" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12 text-surface-500">
          No topics match the selected filter.
        </div>
      )}
    </motion.div>
  );
};

export default PhasePage;
