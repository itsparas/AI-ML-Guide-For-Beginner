import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaLock,
  FaChevronRight,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";
import { tracks } from "../data/tracks";
import { allTopicIds } from "../utils/dataUtils";
import { totalDsaProblems, allDsaProblemIds, totalDsaSections } from "../data/dsaUtils";
import useProgressStore from "../store/useProgressStore";
import AnimatedBackground from "../components/AnimatedBackground";

const Home = () => {
  const {
    setActiveTrack,
    getOverallProgress,
    completedTopics,
    getDsaOverallProgress,
    completedDsaProblems,
  } = useProgressStore();

  React.useEffect(() => {
    setActiveTrack(null);
  }, [setActiveTrack]);

  const aimlProgress = getOverallProgress(allTopicIds);
  const dsaProgress = getDsaOverallProgress(allDsaProblemIds);

  const trackStats = {
    aiml: {
      progress: aimlProgress,
      completed: completedTopics.length,
      total: allTopicIds.length,
      unit: "topics",
      extra: "11 phases",
    },
    dsa: {
      progress: dsaProgress,
      completed: completedDsaProblems.length,
      total: totalDsaProblems,
      unit: "problems",
      extra: `${totalDsaSections} sections`,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto space-y-10"
    >
      {/* Hero */}
      <section className="relative text-center py-16 md:py-24 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatedBackground />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-surface-900/30 to-surface-900/80" />

        <div className="relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-3"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary-500/20 text-primary-400 rounded-full border border-primary-500/20">
              Multiple Learning Tracks
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="gradient-text">Mastery Roadmap</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-surface-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            Your comprehensive self-learning hub — pick a track and master it
            from beginner to expert with curated content, problem sets, and
            structured roadmaps.
          </motion.p>
        </div>
      </section>

      {/* Track Cards */}
      <section>
        <h2 className="text-xl font-bold mb-6">
          <span className="gradient-text">Choose Your Track</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tracks.map((track, idx) => {
            const TrackIcon = track.Icon;
            const isActive = track.status === "active";
            const stats = trackStats[track.id];

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.08 }}
              >
                <Link
                  to={isActive ? track.basePath : `/track/${track.id}`}
                  onClick={() => isActive && setActiveTrack(track.id)}
                  className="block group"
                >
                  <div
                    className="relative overflow-hidden rounded-2xl glass border border-white/5 p-6 transition-all duration-300 hover:border-white/10 hover:shadow-xl card-glow"
                    style={{
                      "--glow-color": track.color,
                    }}
                  >
                    {/* Background gradient */}
                    <div
                      className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(ellipse at 20% 50%, ${track.color}, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: `${track.color}15`,
                            color: track.color,
                          }}
                        >
                          <TrackIcon className="text-2xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-surface-100 truncate">
                              {track.name}
                            </h3>
                            {!isActive && (
                              <span
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0"
                                style={{
                                  backgroundColor: `${track.color}15`,
                                  color: track.color,
                                }}
                              >
                                <FaLock className="text-[8px]" /> Soon
                              </span>
                            )}
                          </div>
                          <p className="text-[13px] text-surface-400 leading-relaxed line-clamp-2">
                            {track.description}
                          </p>
                        </div>
                      </div>

                      {/* Stats for active tracks */}
                      {isActive && stats && (
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1.5 text-xs text-surface-400">
                            <FaBookOpen className="text-[10px]" style={{ color: track.color }} />
                            <span>{stats.total} {stats.unit}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-surface-400">
                            <FaCheckCircle className="text-[10px] text-emerald-400" />
                            <span>{stats.completed} done</span>
                          </div>
                          <div className="text-xs text-surface-500">
                            {stats.extra}
                          </div>
                        </div>
                      )}

                      {/* Progress bar for active tracks */}
                      {isActive && stats && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex-1 h-1.5 bg-surface-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: track.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${stats.progress}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                            />
                          </div>
                          <span className="text-xs text-surface-400 w-8 text-right">
                            {stats.progress}%
                          </span>
                        </div>
                      )}

                      {/* Sub-tracks preview for coming-soon */}
                      {!isActive && track.subtracks && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {track.subtracks.map((st) => (
                            <span
                              key={st.id}
                              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.06] text-surface-400"
                            >
                              {st.shortName || st.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 group-hover:gap-2.5"
                          style={{ color: track.color }}
                        >
                          {isActive ? "Continue Learning" : "Preview Track"}
                          <FaArrowRight className="text-[10px]" />
                        </span>

                        {isActive && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 font-medium">
                            Available
                          </span>
                        )}
                      </div>
                    </div>
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

export default Home;
