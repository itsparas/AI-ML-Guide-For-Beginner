import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaCheck,
  FaExternalLinkAlt,
  FaGithub,
  FaChevronDown,
  FaChevronRight,
  FaStar,
  FaFilter,
} from "react-icons/fa";
import { getDsaSection, dsaSectionIcons, difficultyColors } from "../data/dsaUtils";
import useProgressStore from "../store/useProgressStore";

const DsaSectionPage = () => {
  const { sectionId } = useParams();
  const section = getDsaSection(sectionId);
  const {
    setActiveTrack,
    completedDsaProblems,
    toggleDsaProblemComplete,
    getDsaSectionProgress,
  } = useProgressStore();
  const [expandedSub, setExpandedSub] = useState(null);
  const [filter, setFilter] = useState("all"); // all, easy, medium, hard, unsolved, solved

  React.useEffect(() => {
    setActiveTrack("dsa");
  }, [setActiveTrack]);

  if (!section) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-surface-200 mb-2">Section not found</h2>
          <Link to="/dsa" className="text-emerald-400 hover:underline text-sm">
            ← Back to DSA
          </Link>
        </div>
      </div>
    );
  }

  const SectionIcon = dsaSectionIcons[section.id];
  const problemIds = section.problems.map((p) => p.id);
  const progress = getDsaSectionProgress(problemIds);
  const solved = problemIds.filter((id) => completedDsaProblems.includes(id)).length;

  const filterProblem = (problem) => {
    if (filter === "all") return true;
    if (filter === "solved") return completedDsaProblems.includes(problem.id);
    if (filter === "unsolved") return !completedDsaProblems.includes(problem.id);
    return problem.difficulty === filter;
  };

  const ProblemRow = ({ problem, index }) => {
    const isComplete = completedDsaProblems.includes(problem.id);
    const diff = problem.difficulty || "medium";
    const dc = difficultyColors[diff] || difficultyColors.medium;

    return (
      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.015 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isComplete
            ? "bg-emerald-500/[0.06] border border-emerald-500/10"
            : "glass border border-white/5 hover:border-white/10"
        }`}
      >
        {/* Checkbox */}
        <button
          onClick={() => toggleDsaProblemComplete(problem.id)}
          className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isComplete
              ? "bg-emerald-500 text-white"
              : "border border-surface-600 hover:border-emerald-400 hover:bg-emerald-400/10"
          }`}
        >
          {isComplete && <FaCheck className="text-[10px]" />}
        </button>

        {/* Problem info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium truncate ${
                isComplete ? "text-surface-400 line-through" : "text-surface-200"
              }`}
            >
              {problem.label}
            </span>
            {problem.important && (
              <FaStar className="text-[10px] text-amber-400 flex-shrink-0" title="Important" />
            )}
          </div>
        </div>

        {/* Difficulty badge */}
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase flex-shrink-0 ${dc.bg} ${dc.text}`}
        >
          {diff}
        </span>

        {/* Links */}
        <div className="flex items-center gap-1.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
          {problem.question && problem.question !== "-" && (
            <a
              href={problem.question}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-surface-400 hover:text-primary-400"
              title="Problem Link"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          )}
          {problem.solution && problem.solution !== "-" && (
            <a
              href={problem.solution}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-surface-400 hover:text-emerald-400"
              title="Solution"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="text-[11px]" />
            </a>
          )}
        </div>
      </motion.div>
    );
  };

  const renderProblems = (problems) => {
    const filtered = problems.filter(filterProblem);
    if (filtered.length === 0) {
      return (
        <div className="text-center py-8 text-surface-500 text-sm">
          No problems match this filter.
        </div>
      );
    }
    return (
      <div className="space-y-1.5">
        {filtered.map((problem, idx) => (
          <ProblemRow key={problem.id} problem={problem} index={idx} />
        ))}
      </div>
    );
  };

  const filters = [
    { id: "all", label: "All" },
    { id: "unsolved", label: "Unsolved" },
    { id: "solved", label: "Solved" },
    { id: "easy", label: "Easy", color: "#34d399" },
    { id: "medium", label: "Medium", color: "#fbbf24" },
    { id: "hard", label: "Hard", color: "#f87171" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back */}
      <Link
        to="/dsa"
        className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-surface-200 transition-colors mb-5"
      >
        <FaArrowLeft className="text-xs" /> All Sections
      </Link>

      {/* Header */}
      <div className="glass rounded-2xl border border-white/5 p-6 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#34d39915", color: "#34d399" }}
          >
            {SectionIcon ? (
              <SectionIcon className="text-xl" />
            ) : (
              <span className="text-sm font-bold">{section.id}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-surface-100 mb-1">
              {section.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-surface-400">
              <span>{section.totalProblems} problems</span>
              <span>•</span>
              <span className="text-emerald-400">{solved} solved</span>
              {section.subsections && (
                <>
                  <span>•</span>
                  <span>{section.subsections.length} sub-sections</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Difficulty badges */}
        <div className="flex items-center gap-2 mb-4">
          {section.difficultyCounts.easy > 0 && (
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${difficultyColors.easy.bg} ${difficultyColors.easy.text}`}>
              Easy: {section.difficultyCounts.easy}
            </span>
          )}
          {section.difficultyCounts.medium > 0 && (
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${difficultyColors.medium.bg} ${difficultyColors.medium.text}`}>
              Medium: {section.difficultyCounts.medium}
            </span>
          )}
          {section.difficultyCounts.hard > 0 && (
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${difficultyColors.hard.bg} ${difficultyColors.hard.text}`}>
              Hard: {section.difficultyCounts.hard}
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-surface-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <span className="text-sm font-medium text-surface-300 w-12 text-right">
            {progress}%
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-thin">
        <FaFilter className="text-[10px] text-surface-500 flex-shrink-0" />
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0 ${
              filter === f.id
                ? "bg-emerald-500/15 text-emerald-400"
                : "text-surface-400 hover:bg-white/5"
            }`}
            style={
              filter === f.id && f.color
                ? { backgroundColor: `${f.color}15`, color: f.color }
                : {}
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Problems */}
      {section.subsections ? (
        <div className="space-y-4">
          {section.subsections.map((sub, subIdx) => {
            const subProblems = sub.problems.filter(filterProblem);
            const subTotal = sub.problems.length;
            const subSolved = sub.problems.filter((p) =>
              completedDsaProblems.includes(p.id),
            ).length;
            const isExpanded = expandedSub === subIdx || expandedSub === null;

            return (
              <div key={subIdx} className="glass rounded-xl border border-white/5 overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedSub(expandedSub === subIdx ? -1 : subIdx)
                  }
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.03] transition-colors"
                >
                  {isExpanded ? (
                    <FaChevronDown className="text-[10px] text-surface-500" />
                  ) : (
                    <FaChevronRight className="text-[10px] text-surface-500" />
                  )}
                  <span className="text-sm font-semibold text-surface-200 flex-1">
                    {sub.title}
                  </span>
                  <span className="text-[11px] text-surface-500">
                    {subSolved}/{subTotal}
                  </span>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3">
                        {subProblems.length > 0 ? (
                          <div className="space-y-1.5">
                            {subProblems.map((problem, idx) => (
                              <ProblemRow
                                key={problem.id}
                                problem={problem}
                                index={idx}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-surface-500 text-xs">
                            No problems match this filter.
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ) : (
        renderProblems(section.problems)
      )}
    </motion.div>
  );
};

export default DsaSectionPage;
