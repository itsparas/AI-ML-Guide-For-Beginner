import React, { useState, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaDice,
  FaClock,
  FaBookOpen,
  FaCheckCircle,
  FaArrowRight,
  FaProjectDiagram,
  FaList,
  FaListUl,
} from "react-icons/fa";
import {
  phasesWithTopics,
  allTopics,
  allTopicIds,
  totalEstimatedHours,
  getRandomQuote,
} from "../utils/dataUtils";
import useProgressStore from "../store/useProgressStore";
import AnimatedBackground from "../components/AnimatedBackground";

const RoadmapGraph = React.lazy(() => import("../components/RoadmapGraph"));

const Home = () => {
  const {
    completedTopics,
    getOverallProgress,
    getPhaseProgress,
    getCurrentPhase,
    getIncompleteTopics,
    completedSubtopics,
    setActiveTrack,
  } = useProgressStore();
  const navigate = useNavigate();
  const [quote] = useState(() => getRandomQuote());
  const [viewMode, setViewMode] = useState("graph"); // 'graph' or 'list'

  // Ensure AI/ML track is active when visiting home
  React.useEffect(() => {
    setActiveTrack("aiml");
  }, [setActiveTrack]);

  const progress = getOverallProgress(allTopicIds);
  const currentPhaseIdx = getCurrentPhase(phasesWithTopics);
  const completedCount = completedTopics.length;
  const totalTopics = allTopics.length;
  const totalSubtopics = allTopics.reduce((sum, t) => sum + t.subtopics.length, 0);
  const completedSubCount = Object.values(completedSubtopics).reduce((sum, arr) => sum + arr.length, 0);

  const handleSurpriseMe = () => {
    const incomplete = getIncompleteTopics(allTopics);
    if (incomplete.length > 0) {
      const random = incomplete[Math.floor(Math.random() * incomplete.length)];
      navigate(`/topic/${random.id}`);
    }
  };

  const stats = [
    {
      icon: <FaBookOpen className="text-primary-400" />,
      value: totalTopics,
      label: "Total Topics",
    },
    {
      icon: <FaCheckCircle className="text-emerald-400" />,
      value: completedCount,
      label: "Completed",
    },
    {
      icon: <FaListUl className="text-cyan-400" />,
      value: `${completedSubCount}/${totalSubtopics}`,
      label: "Subtopics",
    },
    {
      icon: <FaClock className="text-amber-400" />,
      value: `${totalEstimatedHours}h`,
      label: "Total Hours",
    },
    {
      icon: <FaRocket className="text-accent-400" />,
      value: `${progress}%`,
      label: "Progress",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Hero section with animated background */}
      <section className="relative text-center py-12 md:py-16 rounded-3xl overflow-hidden">
        {/* Animated particle background */}
        <div className="absolute inset-0 z-0">
          <AnimatedBackground />
        </div>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-surface-900/30 to-surface-900/80" />

        <div className="relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-2"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary-500/20 text-primary-400 rounded-full border border-primary-500/20">
              🧠 {totalTopics} Topics • {totalEstimatedHours}+ Hours • 11 Phases
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="gradient-text">AI/ML Mastery</span>
            <br />
            <span className="text-2xl md:text-3xl font-medium text-surface-300">
              Roadmap
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-surface-400 max-w-2xl mx-auto mb-6 text-sm md:text-base"
          >
            From absolute beginner to advanced expert — your comprehensive
            self-learning hub with curated videos, real-world explanations, and
            hands-on projects.
          </motion.p>

          {/* Quote */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="glass rounded-2xl p-4 max-w-xl mx-auto mb-6"
          >
            <p className="text-sm italic text-surface-300">"{quote.text}"</p>
            <p className="text-xs text-surface-500 mt-1">— {quote.author}</p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              to={`/phase/${currentPhaseIdx}`}
              className="btn-primary flex items-center gap-2"
            >
              {completedCount === 0 ? "Start Learning" : "Continue Learning"}
              <FaArrowRight className="text-sm" />
            </Link>
            <button
              onClick={handleSurpriseMe}
              className="btn-secondary flex items-center gap-2"
            >
              <FaDice /> Surprise Me
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
      >
        {stats.map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-4 text-center card-glow">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-surface-500">{stat.label}</div>
          </div>
        ))}
      </motion.section>

      {/* Overall progress bar */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Overall Progress</h3>
          <span className="text-sm text-surface-400">
            {completedCount} / {totalTopics} topics
          </span>
        </div>
        <div className="w-full h-3 bg-surface-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        {currentPhaseIdx < phasesWithTopics.length && (
          <p className="text-xs text-surface-500 mt-2">
            📍 You are currently on:{" "}
            <span className="text-primary-400 font-medium">
              {phasesWithTopics[currentPhaseIdx].title}
            </span>
          </p>
        )}
      </motion.section>

      {/* Roadmap section with view toggle */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            <span className="gradient-text">Your Learning Journey</span>
          </h2>
          <div className="flex items-center gap-1 glass rounded-lg p-1">
            <button
              onClick={() => setViewMode("graph")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "graph"
                  ? "bg-primary-500 text-white"
                  : "text-surface-400 hover:text-surface-200"
              }`}
            >
              <FaProjectDiagram className="text-[10px]" /> Graph
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-primary-500 text-white"
                  : "text-surface-400 hover:text-surface-200"
              }`}
            >
              <FaList className="text-[10px]" /> List
            </button>
          </div>
        </div>

        {viewMode === "graph" ? (
          <motion.div
            key="graph"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Suspense
              fallback={
                <div className="w-full h-[700px] glass rounded-2xl flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                    <p className="text-surface-400 text-sm">
                      Loading roadmap graph...
                    </p>
                  </div>
                </div>
              }
            >
              <RoadmapGraph />
            </Suspense>
            <p className="text-xs text-surface-500 mt-3 text-center">
              💡 Scroll to zoom • Drag to pan • Click a phase to explore its
              topics
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {phasesWithTopics.map((phase, idx) => {
              const topicIds = phase.topics.map((t) => t.id);
              const phaseProgress = getPhaseProgress(topicIds);
              const isComplete = phaseProgress === 100;
              const isCurrent = idx === currentPhaseIdx;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="relative mb-4"
                >
                  {/* Connector line */}
                  {idx < phasesWithTopics.length - 1 && (
                    <div className="absolute left-6 top-full w-0.5 h-4 bg-gradient-to-b from-surface-600 to-surface-700 z-0" />
                  )}

                  <Link
                    to={`/phase/${phase.id}`}
                    className={`block glass rounded-2xl p-4 md:p-5 card-glow transition-all duration-300 hover:scale-[1.01] ${
                      isCurrent ? "ring-2 ring-primary-500/50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 ${
                          isComplete ? "bg-emerald-500" : ""
                        }`}
                        style={
                          !isComplete
                            ? {
                                background: `linear-gradient(135deg, ${phase.gradientFrom}, ${phase.gradientTo})`,
                              }
                            : {}
                        }
                      >
                        {isComplete ? <FaCheckCircle /> : phase.id}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-sm md:text-base truncate">
                            {phase.title}
                          </h3>
                          {isCurrent && (
                            <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400 font-semibold">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-surface-400 line-clamp-2 mb-2">
                          {phase.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-surface-500">
                          <span>{phase.topics.length} topics</span>
                          <span>~{phase.estimatedWeeks} weeks</span>
                          <span
                            className={`px-2 py-0.5 rounded-full ${
                              phase.difficulty === "beginner"
                                ? "bg-emerald-400/10 text-emerald-400"
                                : phase.difficulty === "intermediate"
                                  ? "bg-amber-400/10 text-amber-400"
                                  : phase.difficulty === "advanced"
                                    ? "bg-red-400/10 text-red-400"
                                    : "bg-surface-700 text-surface-400"
                            }`}
                          >
                            {phase.difficulty}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-surface-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${phase.gradientFrom}, ${phase.gradientTo})`,
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${phaseProgress}%` }}
                              transition={{ duration: 0.5, delay: 0.05 * idx }}
                            />
                          </div>
                          <span className="text-xs text-surface-400 w-8">
                            {phaseProgress}%
                          </span>
                        </div>
                      </div>

                      <FaArrowRight className="text-surface-600 mt-1 flex-shrink-0" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>
    </motion.div>
  );
};

export default Home;
