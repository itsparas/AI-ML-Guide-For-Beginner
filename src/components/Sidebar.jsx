import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaChevronRight,
  FaCheck,
  FaTimes,
  FaHome,
  FaBookmark,
} from "react-icons/fa";
import { phasesWithTopics } from "../utils/dataUtils";
import useProgressStore from "../store/useProgressStore";

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const {
    completedTopics,
    getPhaseProgress,
    mobileSidebarOpen,
    closeMobileSidebar,
    bookmarkedTopics,
  } = useProgressStore();
  const [expandedPhase, setExpandedPhase] = useState(null);

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const handleLinkClick = () => {
    closeMobileSidebar();
  };

  const sidebarContent = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 pb-3 border-b border-white/5">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={handleLinkClick}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20 flex-shrink-0">
            AI
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-sm font-bold gradient-text leading-tight">
                AI/ML Roadmap
              </h2>
              <p className="text-[11px] text-surface-500 leading-tight">
                Your Learning Journey
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* Quick links */}
      {!collapsed && (
        <div className="px-3 pt-3 pb-2 flex gap-2">
          <Link
            to="/"
            onClick={handleLinkClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              location.pathname === "/"
                ? "bg-primary-500/15 text-primary-400"
                : "text-surface-400 hover:bg-white/5 hover:text-surface-200"
            }`}
          >
            <FaHome className="text-[10px]" /> Home
          </Link>
          {bookmarkedTopics.length > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400/70">
              <FaBookmark className="text-[10px]" /> {bookmarkedTopics.length}
            </span>
          )}
        </div>
      )}

      {/* Section label */}
      {!collapsed && (
        <div className="px-4 pt-2 pb-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-surface-500">
            Phases
          </span>
        </div>
      )}

      {/* Phase list */}
      <div className="flex-1 overflow-y-auto pb-4 scrollbar-thin">
        {phasesWithTopics.map((phase) => {
          const topicIds = phase.topics.map((t) => t.id);
          const progress = getPhaseProgress(topicIds);
          const isExpanded = expandedPhase === phase.id;
          const isActivePhase = location.pathname === `/phase/${phase.id}`;
          const isComplete = progress === 100;

          return (
            <div key={phase.id} className="mb-0.5">
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-all duration-200 hover:bg-white/5 ${
                  isActivePhase
                    ? "bg-white/[0.08] border-r-2"
                    : ""
                }`}
                style={isActivePhase ? { borderRightColor: phase.color } : {}}
              >
                {!collapsed ? (
                  <>
                    {/* Phase number badge */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                        isComplete ? "bg-emerald-500/20 text-emerald-400" : ""
                      }`}
                      style={
                        !isComplete
                          ? { backgroundColor: `${phase.color}18`, color: phase.color }
                          : {}
                      }
                    >
                      {isComplete ? <FaCheck className="text-[10px]" /> : phase.id}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="block text-[13px] font-medium truncate leading-tight">
                        {phase.shortTitle}
                      </span>
                    </div>

                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <FaChevronDown className="text-[9px] text-surface-500" />
                      ) : (
                        <FaChevronRight className="text-[9px] text-surface-500" />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mx-auto relative" title={phase.shortTitle}>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold"
                      style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                    >
                      {phase.id}
                    </div>
                    {progress > 0 && progress < 100 && (
                      <div
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                        style={{ backgroundColor: phase.color }}
                      />
                    )}
                    {isComplete && (
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                        <FaCheck className="text-[6px] text-white" />
                      </div>
                    )}
                  </div>
                )}
              </button>

              {/* Topics */}
              <AnimatePresence>
                {isExpanded && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="py-1">
                      {phase.topics.map((topic) => {
                        const isComplete = completedTopics.includes(topic.id);
                        const isActive =
                          location.pathname === `/topic/${topic.id}`;
                        return (
                          <Link
                            key={topic.id}
                            to={`/topic/${topic.id}`}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-2.5 pl-11 pr-3 py-2 text-[13px] transition-all duration-200 hover:bg-white/5 ${
                              isActive
                                ? "bg-white/[0.08] text-primary-400 font-medium"
                                : "text-surface-400 hover:text-surface-200"
                            }`}
                          >
                            {isComplete ? (
                              <FaCheck className="text-emerald-400 text-[9px] flex-shrink-0" />
                            ) : (
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: isActive ? "#818cf8" : "#475569" }}
                              />
                            )}
                            <span className="truncate">{topic.title}</span>
                          </Link>
                        );
                      })}
                      <Link
                        to={`/phase/${phase.id}`}
                        onClick={handleLinkClick}
                        className="flex items-center gap-2 pl-11 pr-3 py-2 text-xs text-primary-400 hover:bg-white/5 font-medium"
                      >
                        View all →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-white/5">
          <div className="text-[10px] text-surface-600 text-center">
            {phasesWithTopics.length} phases • {phasesWithTopics.reduce((s, p) => s + p.topics.length, 0)} topics
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-full z-50 glass border-r border-white/5 transition-all duration-300 ${
          collapsed ? "w-16" : "w-72"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay + sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
              onClick={closeMobileSidebar}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              className="fixed top-0 left-0 h-full w-[280px] z-[60] bg-surface-900/95 backdrop-blur-2xl border-r border-white/10 shadow-2xl md:hidden"
            >
              <button
                onClick={closeMobileSidebar}
                className="absolute top-3 right-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-surface-400 hover:text-surface-200 z-10"
                aria-label="Close sidebar"
              >
                <FaTimes className="text-sm" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
