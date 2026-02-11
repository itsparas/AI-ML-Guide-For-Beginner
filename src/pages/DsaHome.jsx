import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCheckCircle,
  FaArrowLeft,
  FaCode,
  FaFire,
} from "react-icons/fa";
import {
  dsaSections,
  dsaSectionIcons,
  totalDsaProblems,
  totalDsaSections,
  allDsaProblemIds,
  difficultyColors,
} from "../data/dsaUtils";
import useProgressStore from "../store/useProgressStore";

const DsaHome = () => {
  const {
    setActiveTrack,
    completedDsaProblems,
    getDsaSectionProgress,
    getDsaOverallProgress,
  } = useProgressStore();

  React.useEffect(() => {
    setActiveTrack("dsa");
  }, [setActiveTrack]);

  const overallProgress = getDsaOverallProgress(allDsaProblemIds);
  const totalSolved = completedDsaProblems.length;

  // Difficulty summary
  const totalByDifficulty = { easy: 0, medium: 0, hard: 0 };
  dsaSections.forEach((s) => {
    totalByDifficulty.easy += s.difficultyCounts.easy;
    totalByDifficulty.medium += s.difficultyCounts.medium;
    totalByDifficulty.hard += s.difficultyCounts.hard;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* Back to tracks */}
      <Link
        to="/"
        onClick={() => setActiveTrack(null)}
        className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-surface-200 transition-colors"
      >
        <FaArrowLeft className="text-xs" /> All Tracks
      </Link>

      {/* Hero */}
      <section className="relative rounded-2xl glass border border-white/5 overflow-hidden p-6 md:p-10">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, #34d399, transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white flex-shrink-0">
              <FaCode className="text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-surface-100 mb-1">
                Data Structures & Algorithms
              </h1>
              <p className="text-surface-400 text-sm md:text-base">
                {totalDsaProblems} problems across {totalDsaSections} sections —
                from basics to advanced topics
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-surface-100">{totalDsaProblems}</div>
              <div className="text-[11px] text-surface-500">Total Problems</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-emerald-400">{totalSolved}</div>
              <div className="text-[11px] text-surface-500">Solved</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-emerald-400">{totalByDifficulty.easy}</div>
              <div className="text-[11px] text-surface-500">Easy</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-amber-400">{totalByDifficulty.medium}</div>
              <div className="text-[11px] text-surface-500">Medium</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-red-400">{totalByDifficulty.hard}</div>
              <div className="text-[11px] text-surface-500">Hard</div>
            </div>
          </div>

          {/* Overall progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2.5 bg-surface-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="text-sm font-semibold text-surface-300 w-12 text-right">
              {overallProgress}%
            </span>
          </div>
        </div>
      </section>

      {/* Sections grid */}
      <section>
        <h2 className="text-lg font-bold mb-4">
          <span className="gradient-text">All Sections</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dsaSections.map((section, idx) => {
            const problemIds = section.problems.map((p) => p.id);
            const progress = getDsaSectionProgress(problemIds);
            const solved = problemIds.filter((id) => completedDsaProblems.includes(id)).length;
            const isComplete = progress === 100;
            const SectionIcon = dsaSectionIcons[section.id];

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
              >
                <Link
                  to={`/dsa/section/${section.id}`}
                  className="block glass rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-200 group card-glow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                        isComplete ? "bg-emerald-500/20 text-emerald-400" : ""
                      }`}
                      style={
                        !isComplete
                          ? { backgroundColor: "#34d39915", color: "#34d399" }
                          : {}
                      }
                    >
                      {isComplete ? (
                        <FaCheckCircle className="text-sm" />
                      ) : SectionIcon ? (
                        <SectionIcon className="text-sm" />
                      ) : (
                        <span className="text-xs font-bold">{section.id}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-surface-200 truncate leading-tight mb-0.5">
                        {section.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-surface-500">
                          {section.totalProblems} problems
                        </span>
                        {section.subsections && (
                          <span className="text-[10px] text-surface-600">
                            • {section.subsections.length} sub-sections
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Difficulty badges */}
                  <div className="flex items-center gap-1.5 mb-3">
                    {section.difficultyCounts.easy > 0 && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${difficultyColors.easy.bg} ${difficultyColors.easy.text}`}>
                        E: {section.difficultyCounts.easy}
                      </span>
                    )}
                    {section.difficultyCounts.medium > 0 && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${difficultyColors.medium.bg} ${difficultyColors.medium.text}`}>
                        M: {section.difficultyCounts.medium}
                      </span>
                    )}
                    {section.difficultyCounts.hard > 0 && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${difficultyColors.hard.bg} ${difficultyColors.hard.text}`}>
                        H: {section.difficultyCounts.hard}
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-surface-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-surface-500 w-14 text-right">
                      {solved}/{section.totalProblems}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

export default DsaHome;
