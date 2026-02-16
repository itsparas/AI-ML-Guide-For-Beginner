import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaChevronDown, FaLightbulb, FaSearch } from "react-icons/fa";
import useProgressStore from "../store/useProgressStore";

const InteractiveSubtopic = ({ topicId, subtopic, index, phaseColor }) => {
  const {
    toggleSubtopicComplete,
    isSubtopicComplete,
    toggleExpandedSubtopic,
    isSubtopicExpanded,
  } = useProgressStore();

  const complete = isSubtopicComplete(topicId, index);
  const expanded = isSubtopicExpanded(topicId, index);

  // Support both string and object subtopic formats
  const isObject = typeof subtopic === "object" && subtopic !== null;
  const name = isObject ? subtopic.name : subtopic;
  const explanation = isObject ? subtopic.explanation : null;

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(name + " tutorial")}`;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " explained")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`subtopic-card rounded-xl border transition-all duration-300 ${
        complete
          ? "bg-emerald-500/5 border-emerald-500/20"
          : "bg-white/[0.02] border-white/[0.06] hover:border-white/10 hover:bg-white/[0.04]"
      }`}
    >
      {/* Main row */}
      <div className="flex items-center gap-3 p-3 md:p-4">
        {/* Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSubtopicComplete(topicId, index);
          }}
          className={`subtopic-checkbox w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            complete
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
              : "border-2 border-surface-600 hover:border-primary-500 hover:bg-primary-500/10"
          }`}
          title={complete ? "Mark as incomplete" : "Mark as complete"}
        >
          {complete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <FaCheck className="text-[10px]" />
            </motion.div>
          )}
        </button>

        {/* Index badge */}
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{
            backgroundColor: complete
              ? "rgba(16, 185, 129, 0.1)"
              : `${phaseColor}15`,
            color: complete ? "#10b981" : phaseColor,
          }}
        >
          {index + 1}
        </div>

        {/* Subtopic name */}
        <button
          onClick={() => toggleExpandedSubtopic(topicId, index)}
          className="flex-1 text-left"
        >
          <span
            className={`text-sm font-medium transition-colors ${
              complete
                ? "text-emerald-400 line-through opacity-70"
                : "text-surface-200"
            }`}
          >
            {name}
          </span>
        </button>

        {/* Expand toggle */}
        <button
          onClick={() => toggleExpandedSubtopic(topicId, index)}
          className={`p-1.5 rounded-lg transition-all duration-300 text-surface-500 hover:text-surface-300 hover:bg-white/5 ${
            expanded ? "rotate-180 text-primary-400" : ""
          }`}
        >
          <FaChevronDown className="text-xs" />
        </button>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 ml-0 md:ml-[4.25rem]">
              {/* Explanation or fallback tip */}
              <div
                className={`flex items-start gap-2.5 mb-3 p-3 rounded-lg ${
                  explanation
                    ? "bg-white/[0.03] border border-white/[0.06]"
                    : "bg-primary-500/5 border border-primary-500/10"
                }`}
              >
                <FaLightbulb
                  className={`text-sm flex-shrink-0 mt-0.5 ${
                    explanation ? "text-violet-400" : "text-amber-400"
                  }`}
                />
                <p className="text-sm text-surface-300 leading-relaxed">
                  {explanation || (
                    <>
                      Learn <strong className="text-surface-200">{name}</strong>{" "}
                      to strengthen your understanding of this topic. Practice
                      with real examples and projects for best results.
                    </>
                  )}
                </p>
              </div>

              {/* Action links */}
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={googleSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-surface-300 hover:text-surface-100"
                >
                  <FaSearch className="text-xs" /> Search Tutorial
                </a>
                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 transition-all text-red-300 hover:text-red-200"
                >
                  <span className="text-[10px]">▶</span> YouTube
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InteractiveSubtopic;
