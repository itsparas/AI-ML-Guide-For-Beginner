import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { searchTopics, roadmapData } from "../utils/dataUtils";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      setResults(searchTopics(query).slice(0, 10));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (topicId) => {
    navigate(`/topic/${topicId}`);
    onClose();
  };

  const getPhaseColor = (phaseId) => {
    const phase = roadmapData.phases.find((p) => p.id === phaseId);
    return phase?.color || "#6366f1";
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "beginner":
        return "text-emerald-400 bg-emerald-400/10";
      case "intermediate":
        return "text-amber-400 bg-amber-400/10";
      case "advanced":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-surface-400 bg-surface-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: -20 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-lg mx-4 glass rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <FaSearch className="text-surface-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, concepts, tools..."
            className="flex-1 bg-transparent outline-none text-sm placeholder-surface-500"
          />
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10">
            <FaTimes className="text-surface-400 text-sm" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            results.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSelect(topic.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getPhaseColor(topic.phase) }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{topic.title}</p>
                  <p className="text-xs text-surface-500 truncate">
                    Phase {topic.phase} • {topic.estimatedHours}h
                  </p>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${getDifficultyColor(topic.difficulty)}`}
                >
                  {topic.difficulty}
                </span>
              </button>
            ))
          ) : query.length > 1 ? (
            <div className="px-4 py-8 text-center text-surface-500 text-sm">
              No topics found for "{query}"
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-surface-500 text-sm">
              Start typing to search topics...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/5 flex justify-between text-[10px] text-surface-500">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>Esc Close</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchModal;
