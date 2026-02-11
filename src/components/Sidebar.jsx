import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaChevronRight,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { phasesWithTopics } from "../utils/dataUtils";
import useProgressStore from "../store/useProgressStore";

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { completedTopics, getPhaseProgress } = useProgressStore();
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const sidebarContent = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-white/5">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
            AI
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-sm font-bold gradient-text">AI/ML Roadmap</h2>
              <p className="text-[10px] text-surface-500">
                Your Learning Journey
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* Phase list */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
        {phasesWithTopics.map((phase) => {
          const topicIds = phase.topics.map((t) => t.id);
          const progress = getPhaseProgress(topicIds);
          const isExpanded = expandedPhase === phase.id;
          const isActivePhase = location.pathname === `/phase/${phase.id}`;

          return (
            <div key={phase.id} className="mb-0.5">
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                  isActivePhase
                    ? "bg-white/10 border-r-2 border-primary-500"
                    : ""
                }`}
              >
                {!collapsed && (
                  <>
                    <span className="text-[10px] font-bold text-surface-500 w-4">
                      {phase.id}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: phase.color }}
                    />
                    <span className="flex-1 truncate text-xs font-medium">
                      {phase.shortTitle}
                    </span>
                    {progress > 0 && (
                      <span className="text-[10px] text-surface-400">
                        {progress}%
                      </span>
                    )}
                    {isExpanded ? (
                      <FaChevronDown className="text-[8px] text-surface-500" />
                    ) : (
                      <FaChevronRight className="text-[8px] text-surface-500" />
                    )}
                  </>
                )}
                {collapsed && (
                  <div className="mx-auto">
                    <span
                      className="w-3 h-3 rounded-full block"
                      style={{ backgroundColor: phase.color }}
                    />
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
                    {phase.topics.map((topic) => {
                      const isComplete = completedTopics.includes(topic.id);
                      const isActive =
                        location.pathname === `/topic/${topic.id}`;
                      return (
                        <Link
                          key={topic.id}
                          to={`/topic/${topic.id}`}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2 pl-10 pr-3 py-1.5 text-xs transition-colors hover:bg-white/5 ${
                            isActive
                              ? "bg-white/10 text-primary-400"
                              : "text-surface-400"
                          }`}
                        >
                          {isComplete ? (
                            <FaCheck className="text-emerald-400 text-[8px] flex-shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-surface-600 flex-shrink-0" />
                          )}
                          <span className="truncate">{topic.title}</span>
                        </Link>
                      );
                    })}
                    <Link
                      to={`/phase/${phase.id}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 pl-10 pr-3 py-1.5 text-xs text-primary-400 hover:bg-white/5"
                    >
                      View all →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
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

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 z-50 glass border-r border-white/5 md:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-lg hover:bg-white/10"
              >
                <FaTimes />
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
