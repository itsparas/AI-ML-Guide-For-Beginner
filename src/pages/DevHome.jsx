import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaDice,
  FaClock,
  FaBookOpen,
  FaCheckCircle,
  FaArrowRight,
  FaListUl,
} from "react-icons/fa";
import { SiHtml5, SiCss3, SiJavascript } from "react-icons/si";
import {
  devPhasesWithTopics,
  allDevTopics,
  allDevTopicIds,
  totalDevEstimatedHours,
} from "../data/devUtils";
import useProgressStore from "../store/useProgressStore";
import AnimatedBackground from "../components/AnimatedBackground";

const phaseIcons = {
  0: SiHtml5,
  1: SiCss3,
  2: SiJavascript,
};

const DevHome = () => {
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

  React.useEffect(() => {
    setActiveTrack("development");
  }, [setActiveTrack]);

  const progress = getOverallProgress(allDevTopicIds);
  const currentPhaseIdx = getCurrentPhase(devPhasesWithTopics);
  const completedCount = allDevTopicIds.filter((id) =>
    completedTopics.includes(id),
  ).length;
  const totalTopics = allDevTopics.length;
  const totalSubtopics = allDevTopics.reduce(
    (sum, t) => sum + t.subtopics.length,
    0,
  );
  const completedSubCount = allDevTopics.reduce((sum, t) => {
    const completed = completedSubtopics[t.id] || [];
    return sum + completed.length;
  }, 0);

  const handleSurpriseMe = () => {
    const incomplete = getIncompleteTopics(allDevTopics);
    if (incomplete.length > 0) {
      const random = incomplete[Math.floor(Math.random() * incomplete.length)];
      navigate(`/dev/topic/${random.id}`);
    }
  };

  const stats = [
    {
      icon: <FaBookOpen className="text-violet-400" />,
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
      value: `${totalDevEstimatedHours}h`,
      label: "Total Hours",
    },
    {
      icon: <FaRocket className="text-fuchsia-400" />,
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
      {/* Hero section */}
      <section className="relative text-center py-12 md:py-16 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatedBackground />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-surface-900/30 to-surface-900/80" />

        <div className="relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-2"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-violet-500/20 text-violet-400 rounded-full border border-violet-500/20">
              🌐 {totalTopics} Topics • {totalDevEstimatedHours}+ Hours • 3
              Phases
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Web Development
            </span>
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
            Master HTML5, CSS3, and JavaScript from scratch — build stunning,
            interactive websites with curated tutorials, live code examples, and
            hands-on projects.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              to={`/dev/phase/${currentPhaseIdx}`}
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
            className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        {currentPhaseIdx < devPhasesWithTopics.length && (
          <p className="text-xs text-surface-500 mt-2">
            📍 You are currently on:{" "}
            <span className="text-violet-400 font-medium">
              {devPhasesWithTopics[currentPhaseIdx].title}
            </span>
          </p>
        )}
      </motion.section>

      {/* Phase cards */}
      <section>
        <h2 className="text-xl font-bold mb-6">
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Your Learning Journey
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {devPhasesWithTopics.map((phase, idx) => {
            const topicIds = phase.topics.map((t) => t.id);
            const phaseProgress = getPhaseProgress(topicIds);
            const isComplete = phaseProgress === 100;
            const isCurrent = idx === currentPhaseIdx;
            const PhaseIcon = phaseIcons[phase.id] || FaBookOpen;

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx }}
                className="relative mb-4"
              >
                {idx < devPhasesWithTopics.length - 1 && (
                  <div className="absolute left-6 top-full w-0.5 h-4 bg-gradient-to-b from-surface-600 to-surface-700 z-0" />
                )}

                <Link
                  to={`/dev/phase/${phase.id}`}
                  className={`block glass rounded-2xl p-4 md:p-5 card-glow transition-all duration-300 hover:scale-[1.01] ${
                    isCurrent ? "ring-2 ring-violet-500/50" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0 ${
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
                      {isComplete ? <FaCheckCircle /> : <PhaseIcon />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm md:text-base truncate">
                          {phase.title}
                        </h3>
                        {isCurrent && (
                          <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold">
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
                        <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400">
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
                            transition={{
                              duration: 0.5,
                              delay: 0.05 * idx,
                            }}
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
      </section>
    </motion.div>
  );
};

export default DevHome;
