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
  FaPython,
  FaDatabase,
  FaBrain,
  FaNetworkWired,
  FaLanguage,
  FaEye,
  FaGamepad,
  FaDocker,
  FaRocket,
  FaLaptopCode,
  FaArrowLeft,
} from "react-icons/fa";
import { TbMathFunction } from "react-icons/tb";
import { phasesWithTopics } from "../utils/dataUtils";
import {
  dsaSections,
  dsaSectionIcons,
  allDsaProblemIds,
} from "../data/dsaUtils";
import useProgressStore from "../store/useProgressStore";

const phaseIconMap = {
  0: FaPython,
  1: TbMathFunction,
  2: FaDatabase,
  3: FaBrain,
  4: FaNetworkWired,
  5: FaLanguage,
  6: FaEye,
  7: FaGamepad,
  8: FaDocker,
  9: FaRocket,
  10: FaLaptopCode,
};

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const {
    completedTopics,
    getPhaseProgress,
    mobileSidebarOpen,
    closeMobileSidebar,
    bookmarkedTopics,
    activeTrack,
    completedDsaProblems,
    getDsaSectionProgress,
  } = useProgressStore();
  const [expandedPhase, setExpandedPhase] = useState(null);

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const handleLinkClick = () => {
    closeMobileSidebar();
  };

  // ── AI/ML Phase Navigation ──
  const aimlNavigation = (
    <>
      {/* Header */}
      <div
        className={`border-b border-white/5 ${collapsed ? "p-2 pb-3" : "px-4 py-5"}`}
      >
        <Link
          to="/aiml"
          className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}
          onClick={handleLinkClick}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20 flex-shrink-0">
            AI
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-sm font-bold gradient-text leading-tight mb-1">
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
        <div className="px-3 pt-2.5 pb-1 flex gap-1.5">
          <Link
            to="/aiml"
            onClick={handleLinkClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              location.pathname === "/aiml"
                ? "bg-primary-500/15 text-primary-400"
                : "text-surface-400 hover:bg-white/5 hover:text-surface-200"
            }`}
          >
            <FaHome className="text-[10px]" /> Home
          </Link>
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-surface-400 hover:bg-white/5 hover:text-surface-200 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" /> Tracks
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
        <div className="px-4 pt-1.5 pb-1.5">
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
          const PhaseIcon = phaseIconMap[phase.id];

          return (
            <div
              key={phase.id}
              className="mb-0.5"
              style={{ overflow: "visible" }}
            >
              {!collapsed ? (
                <button
                  onClick={() => togglePhase(phase.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-all duration-200 hover:bg-white/5 ${
                    isActivePhase ? "bg-white/[0.08] border-r-2" : ""
                  }`}
                  style={isActivePhase ? { borderRightColor: phase.color } : {}}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isComplete ? "bg-emerald-500/20 text-emerald-400" : ""
                    }`}
                    style={
                      !isComplete
                        ? {
                            backgroundColor: `${phase.color}18`,
                            color: phase.color,
                          }
                        : {}
                    }
                  >
                    {isComplete ? (
                      <FaCheck className="text-[10px]" />
                    ) : PhaseIcon ? (
                      <PhaseIcon className="text-sm" />
                    ) : (
                      <span className="text-[11px] font-bold">{phase.id}</span>
                    )}
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
                </button>
              ) : (
                <Link
                  to={`/phase/${phase.id}`}
                  onClick={handleLinkClick}
                  className="flex items-center justify-center py-2.5 px-1.5 relative group transition-all duration-200 hover:bg-white/5"
                  style={
                    isActivePhase
                      ? { backgroundColor: "rgba(255,255,255,0.08)" }
                      : {}
                  }
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg ${
                      isComplete
                        ? "bg-emerald-500/20 text-emerald-400"
                        : isActivePhase
                          ? "ring-2 ring-offset-1 ring-offset-surface-900"
                          : ""
                    }`}
                    style={{
                      backgroundColor: isComplete
                        ? undefined
                        : `${phase.color}18`,
                      color: isComplete ? undefined : phase.color,
                    }}
                  >
                    {isComplete ? (
                      <FaCheck className="text-sm" />
                    ) : PhaseIcon ? (
                      <PhaseIcon className="text-base" />
                    ) : (
                      <span className="text-xs font-bold">{phase.id}</span>
                    )}
                  </div>
                  <span className="fixed left-20 px-3 py-2 rounded-lg bg-surface-800/95 backdrop-blur-sm border border-white/20 text-sm font-medium text-surface-100 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-[9999] shadow-xl">
                    {phase.shortTitle}
                  </span>
                </Link>
              )}

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
                                style={{
                                  backgroundColor: isActive
                                    ? "#818cf8"
                                    : "#475569",
                                }}
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
            {phasesWithTopics.length} phases •{" "}
            {phasesWithTopics.reduce((s, p) => s + p.topics.length, 0)} topics
          </div>
        </div>
      )}
    </>
  );

  // ── DSA Section Navigation ──
  const dsaNavigation = (
    <>
      {/* Header */}
      <div
        className={`border-b border-white/5 ${collapsed ? "p-2 pb-3" : "px-4 py-5"}`}
      >
        <Link
          to="/dsa"
          className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}
          onClick={handleLinkClick}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex-shrink-0">
            DS
          </div>
          {!collapsed && (
            <div>
              <h2
                className="text-sm font-bold leading-tight mb-1"
                style={{ color: "#34d399" }}
              >
                DSA Roadmap
              </h2>
              <p className="text-[11px] text-surface-500 leading-tight">
                867 Problems • 34 Sections
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* Quick links */}
      {!collapsed && (
        <div className="px-3 pt-2.5 pb-1 flex gap-1.5">
          <Link
            to="/dsa"
            onClick={handleLinkClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              location.pathname === "/dsa"
                ? "bg-emerald-500/15 text-emerald-400"
                : "text-surface-400 hover:bg-white/5 hover:text-surface-200"
            }`}
          >
            <FaHome className="text-[10px]" /> Overview
          </Link>
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-surface-400 hover:bg-white/5 hover:text-surface-200 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" /> Tracks
          </Link>
        </div>
      )}

      {/* Section label */}
      {!collapsed && (
        <div className="px-4 pt-1.5 pb-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-surface-500">
            Sections
          </span>
        </div>
      )}

      {/* Section list */}
      <div className="flex-1 overflow-y-auto pb-4 scrollbar-thin">
        {dsaSections.map((section) => {
          const problemIds = section.problems.map((p) => p.id);
          const progress = getDsaSectionProgress(problemIds);
          const isActiveSection =
            location.pathname === `/dsa/section/${section.id}`;
          const isComplete = progress === 100;
          const SectionIcon = dsaSectionIcons[section.id];

          return (
            <div key={section.id} style={{ overflow: "visible" }}>
              {!collapsed ? (
                <Link
                  to={`/dsa/section/${section.id}`}
                  onClick={handleLinkClick}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-all duration-200 hover:bg-white/5 ${
                    isActiveSection ? "bg-white/[0.08] border-r-2" : ""
                  }`}
                  style={isActiveSection ? { borderRightColor: "#34d399" } : {}}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                      isComplete ? "bg-emerald-500/20 text-emerald-400" : ""
                    }`}
                    style={
                      !isComplete
                        ? { backgroundColor: "#34d39918", color: "#34d399" }
                        : {}
                    }
                  >
                    {isComplete ? (
                      <FaCheck className="text-[9px]" />
                    ) : SectionIcon ? (
                      <SectionIcon className="text-xs" />
                    ) : (
                      <span className="text-[9px] font-bold">{section.id}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[12px] font-medium truncate leading-tight">
                      {section.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-surface-500 flex-shrink-0">
                    {section.totalProblems}
                  </span>
                </Link>
              ) : (
                <Link
                  to={`/dsa/section/${section.id}`}
                  onClick={handleLinkClick}
                  className="flex items-center justify-center py-2 px-1.5 relative group transition-all duration-200 hover:bg-white/5"
                  style={
                    isActiveSection
                      ? { backgroundColor: "rgba(255,255,255,0.08)" }
                      : {}
                  }
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${
                      isComplete ? "bg-emerald-500/20 text-emerald-400" : ""
                    }`}
                    style={
                      !isComplete
                        ? { backgroundColor: "#34d39918", color: "#34d399" }
                        : {}
                    }
                  >
                    {isComplete ? (
                      <FaCheck className="text-xs" />
                    ) : SectionIcon ? (
                      <SectionIcon className="text-xs" />
                    ) : (
                      <span className="text-[9px] font-bold">{section.id}</span>
                    )}
                  </div>
                  <span className="fixed left-20 px-3 py-2 rounded-lg bg-surface-800/95 backdrop-blur-sm border border-white/20 text-sm font-medium text-surface-100 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-[9999] shadow-xl">
                    {section.title}
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-white/5">
          <div className="text-[10px] text-surface-600 text-center">
            {completedDsaProblems.length} / {allDsaProblemIds.length} problems
            solved
          </div>
        </div>
      )}
    </>
  );

  // Pick content based on active track
  const getSidebarContent = () => {
    if (activeTrack === "aiml") return aimlNavigation;
    if (activeTrack === "dsa") return dsaNavigation;
    return null;
  };

  const sidebarContent = (
    <nav className="flex flex-col h-full" style={{ overflowX: "visible" }}>
      {getSidebarContent()}
    </nav>
  );

  // Don't render sidebar when no track is active (landing page) or for unsupported tracks
  if (!activeTrack || !getSidebarContent()) {
    return null;
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-full z-50 glass border-r border-white/5 transition-all duration-300 ${
          collapsed ? "w-16" : "w-72"
        }`}
        style={{ overflowX: "visible" }}
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
