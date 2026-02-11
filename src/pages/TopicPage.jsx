import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FaCheck,
  FaClock,
  FaBookmark,
  FaRegBookmark,
  FaExternalLinkAlt,
  FaYoutube,
  FaChevronLeft,
  FaChevronRight,
  FaTag,
  FaLayerGroup,
  FaListUl,
  FaPlay,
} from "react-icons/fa";
import { getTopicById, getPhaseInfo, getPhaseTopics } from "../utils/dataUtils";
import useProgressStore from "../store/useProgressStore";
import InteractiveSubtopic from "../components/InteractiveSubtopic";
import ELI5Toggle from "../components/ELI5Toggle";

const TopicPage = () => {
  const { topicId } = useParams();
  const topic = getTopicById(topicId);
  const {
    setActiveTrack,
    toggleTopicComplete,
    isTopicComplete,
    toggleBookmark,
    isBookmarked,
    completedTopics,
    getSubtopicProgress,
    completedSubtopics,
  } = useProgressStore();

  const complete = isTopicComplete(topicId);
  const bookmarked = isBookmarked(topicId);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);

  useEffect(() => {
    setActiveTrack("aiml");
  }, [setActiveTrack]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveVideoIdx(0);
  }, [topicId]);

  // Navigation between topics
  const phaseTopics = topic ? getPhaseTopics(topic.phase) : [];
  const currentIdx = phaseTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentIdx > 0 ? phaseTopics[currentIdx - 1] : null;
  const nextTopic =
    currentIdx < phaseTopics.length - 1 ? phaseTopics[currentIdx + 1] : null;

  // Subtopic progress
  const subtopicProgress = topic
    ? getSubtopicProgress(topicId, topic.subtopics.length)
    : 0;
  const completedSubCount = topic
    ? (completedSubtopics[topicId] || []).length
    : 0;

  // Check if phase completed after marking topic
  const handleToggleComplete = () => {
    toggleTopicComplete(topicId);
    if (!complete) {
      // Check if this completes the phase
      const phaseTopicIds = phaseTopics.map((t) => t.id);
      const newCompleted = [...completedTopics, topicId];
      const allDone = phaseTopicIds.every((id) => newCompleted.includes(id));
      if (allDone) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#6366f1", "#a855f7", "#ec4899", "#10b981", "#f59e0b"],
        });
      }
    }
  };

  if (!topic) {
    return (
      <div className="text-center py-20">
        <p className="text-surface-400">Topic not found</p>
        <Link to="/" className="text-primary-400 mt-2 inline-block">
          ← Back to roadmap
        </Link>
      </div>
    );
  }

  const phaseInfo = getPhaseInfo(topic.phase);

  const getDifficultyStyle = (diff) => {
    switch (diff) {
      case "beginner":
        return "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20";
      case "intermediate":
        return "bg-amber-400/10 text-amber-400 border border-amber-400/20";
      case "advanced":
        return "bg-red-400/10 text-red-400 border border-red-400/20";
      default:
        return "bg-surface-700 text-surface-400";
    }
  };

  const getYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/playlist\?list=)([^&\s]+)/,
    );
    return match ? match[1] : null;
  };

  return (
    <motion.div
      key={topicId}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-surface-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-surface-200 transition-colors">
          Home
        </Link>
        <span className="text-surface-600">/</span>
        <Link
          to={`/phase/${topic.phase}`}
          className="hover:text-surface-200 transition-colors"
        >
          Phase {topic.phase}: {phaseInfo?.shortTitle}
        </Link>
        <span className="text-surface-600">/</span>
        <span className="text-surface-200 font-medium">{topic.title}</span>
      </div>

      {/* === HERO HEADER === */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative rounded-2xl overflow-hidden mb-6"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${phaseInfo?.gradientFrom || "#6366f1"}, ${phaseInfo?.gradientTo || "#a855f7"})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-900/80 to-surface-900/40" />

        <div className="relative glass rounded-2xl p-6 md:p-8 border-0">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-white/90"
                  style={{
                    backgroundColor: `${phaseInfo?.color}30`,
                    borderLeft: `3px solid ${phaseInfo?.color}`,
                  }}
                >
                  <FaLayerGroup className="text-[10px]" />
                  Phase {topic.phase}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${getDifficultyStyle(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
                {complete && (
                  <span className="text-xs px-2.5 py-1 rounded-lg font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    ✓ Completed
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                {topic.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-surface-400 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <FaClock className="text-xs text-primary-400" /> {topic.estimatedHours} hours
                </span>
                <span className="flex items-center gap-1.5">
                  <FaListUl className="text-xs text-accent-400" /> {topic.subtopics.length} subtopics
                </span>
                <span className="flex items-center gap-1.5">
                  <FaPlay className="text-xs text-red-400" /> {topic.youtubeVideos.length} videos
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => toggleBookmark(topicId)}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  bookmarked
                    ? "bg-amber-400/20 text-amber-400 shadow-lg shadow-amber-500/10"
                    : "glass hover:bg-white/10 text-surface-400 hover:text-amber-400"
                }`}
                title={bookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
          </div>

          {/* Subtopic progress bar */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-surface-400">
                Subtopic Progress: <span className="text-surface-200 font-medium">{completedSubCount}/{topic.subtopics.length}</span>
              </span>
              <span className="text-surface-300 font-semibold">{subtopicProgress}%</span>
            </div>
            <div className="w-full h-2 bg-surface-700/60 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${phaseInfo?.gradientFrom || "#6366f1"}, ${phaseInfo?.gradientTo || "#a855f7"})`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${subtopicProgress}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </div>

          <button
            onClick={handleToggleComplete}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              complete
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25"
                : "btn-primary"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <FaCheck />
              {complete ? "Completed ✓" : "Mark as Complete"}
            </span>
          </button>
        </div>
      </motion.div>

      {/* === TWO COLUMN LAYOUT === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-sm">📝</span>
            <span>About This Topic</span>
          </h2>
          <p className="text-base text-surface-300 leading-relaxed whitespace-pre-line">
            {topic.description}
          </p>
        </motion.section>

        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-6 border-l-4"
          style={{ borderLeftColor: phaseInfo?.color || "#6366f1" }}
        >
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center text-sm">🎯</span>
            <span>Why This Matters</span>
          </h2>
          <p className="text-base text-surface-300 leading-relaxed">
            {topic.whyItMatters}
          </p>
        </motion.section>
      </div>

      {/* === ELI5 TOGGLE === */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.18 }}
      >
        <ELI5Toggle eli5Text={topic.eli5} />
      </motion.div>

      {/* === INTERACTIVE SUBTOPICS === */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">📂</span>
            <span>Topics to Cover</span>
          </h2>
          <div className="flex items-center gap-2 text-xs text-surface-400">
            <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-medium">
              {completedSubCount} done
            </span>
            <span>of {topic.subtopics.length}</span>
          </div>
        </div>
        <div className="grid gap-2">
          {topic.subtopics.map((subtopic, idx) => (
            <InteractiveSubtopic
              key={idx}
              topicId={topicId}
              subtopic={subtopic}
              index={idx}
              phaseColor={phaseInfo?.color || "#6366f1"}
            />
          ))}
        </div>
      </motion.section>

      {/* === YOUTUBE VIDEOS === */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-sm">🎥</span>
          <span>Recommended Videos</span>
        </h2>

        {topic.youtubeVideos.length > 1 && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {topic.youtubeVideos.map((video, idx) => (
              <button
                key={idx}
                onClick={() => setActiveVideoIdx(idx)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeVideoIdx === idx
                    ? "bg-red-500/20 text-red-300 border border-red-500/20"
                    : "bg-white/5 text-surface-400 hover:bg-white/10 border border-transparent"
                }`}
              >
                {video.channel}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-4">
          {topic.youtubeVideos.map((video, idx) => {
            const videoId = getYouTubeId(video.url);
            const isPlaylist = video.url.includes("playlist");
            const isActive = idx === activeVideoIdx;

            return (
              <AnimatePresence key={idx} mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="rounded-xl overflow-hidden bg-surface-800/50 border border-white/5"
                  >
                    {videoId && !isPlaylist ? (
                      <div className="aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={video.title}
                          className="w-full h-full rounded-t-xl"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors"
                      >
                        <div className="w-14 h-14 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0">
                          <FaYoutube className="text-red-500 text-2xl" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold mb-1">{video.title}</p>
                          <p className="text-xs text-surface-500">
                            {video.channel} • {isPlaylist ? "📋 Playlist" : "▶ Video"}
                          </p>
                        </div>
                        <FaExternalLinkAlt className="text-surface-500 text-xs" />
                      </a>
                    )}
                    <div className="p-4 border-t border-white/5">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold hover:text-primary-400 transition-colors inline-flex items-center gap-2"
                      >
                        {video.title}
                        <FaExternalLinkAlt className="text-[10px] text-surface-500" />
                      </a>
                      <p className="text-xs text-surface-500 mt-0.5">{video.channel}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {topic.youtubeVideos.length > 1 && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-surface-500 mb-3 font-medium uppercase tracking-wider">All Videos</p>
            <div className="grid gap-2">
              {topic.youtubeVideos.map((video, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVideoIdx(idx)}
                  className={`flex items-center gap-3 p-2.5 rounded-lg text-left transition-all ${
                    activeVideoIdx === idx
                      ? "bg-red-500/10 border border-red-500/15"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activeVideoIdx === idx ? "bg-red-500/20 text-red-400" : "bg-white/5 text-surface-500"
                  }`}>
                    <FaYoutube className="text-xs" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{video.title}</p>
                    <p className="text-xs text-surface-500">{video.channel}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.section>

      {/* === REFERENCES === */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-sm">🔗</span>
          <span>References & Resources</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {topic.references.map((ref, idx) => (
            <a
              key={idx}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                <FaExternalLinkAlt className="text-xs" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium group-hover:text-primary-400 transition-colors truncate">
                  {ref.title}
                </p>
                <p className="text-xs text-surface-600 truncate mt-0.5">
                  {ref.url.replace(/^https?:\/\//, "").split("/")[0]}
                </p>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      {/* === TAGS === */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <FaTag className="text-sm text-surface-400" /> <span>Tags</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-surface-400 border border-white/5 hover:bg-white/10 hover:text-surface-200 transition-colors cursor-default"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.section>

      {/* === PREREQUISITES === */}
      {topic.prerequisites.length > 0 && (
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-sm">📋</span>
            <span>Prerequisites</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {topic.prerequisites.map((preId) => {
              const preTopic = getTopicById(preId);
              const preComplete = preTopic
                ? completedTopics.includes(preId)
                : false;
              return preTopic ? (
                <Link
                  key={preId}
                  to={`/topic/${preId}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    preComplete
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                      : "glass hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {preComplete && <FaCheck className="text-[8px]" />}
                  {preTopic.title}
                </Link>
              ) : null;
            })}
          </div>
        </motion.section>
      )}

      {/* === NAVIGATION === */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="flex justify-between gap-4 mt-8 mb-4"
      >
        {prevTopic ? (
          <Link
            to={`/topic/${prevTopic.id}`}
            className="flex-1 glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group border border-white/5 hover:border-white/10"
          >
            <div className="flex items-center gap-2 text-sm text-surface-500 mb-1">
              <FaChevronLeft className="text-[8px]" /> Previous
            </div>
            <p className="text-sm font-semibold group-hover:text-primary-400 transition-colors truncate">
              {prevTopic.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextTopic ? (
          <Link
            to={`/topic/${nextTopic.id}`}
            className="flex-1 glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group text-right border border-white/5 hover:border-white/10"
          >
            <div className="flex items-center justify-end gap-2 text-sm text-surface-500 mb-1">
              Next <FaChevronRight className="text-[8px]" />
            </div>
            <p className="text-sm font-semibold group-hover:text-primary-400 transition-colors truncate">
              {nextTopic.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </motion.div>
    </motion.div>
  );
};

export default TopicPage;
