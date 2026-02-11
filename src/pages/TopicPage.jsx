import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FaArrowLeft,
  FaCheck,
  FaClock,
  FaBookmark,
  FaRegBookmark,
  FaExternalLinkAlt,
  FaYoutube,
  FaChevronLeft,
  FaChevronRight,
  FaTag,
} from "react-icons/fa";
import { getTopicById, getPhaseInfo, getPhaseTopics } from "../utils/dataUtils";
import useProgressStore from "../store/useProgressStore";

const TopicPage = () => {
  const { topicId } = useParams();
  const topic = getTopicById(topicId);
  const {
    toggleTopicComplete,
    isTopicComplete,
    toggleBookmark,
    isBookmarked,
    completedTopics,
  } = useProgressStore();

  const complete = isTopicComplete(topicId);
  const bookmarked = isBookmarked(topicId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [topicId]);

  // Navigation between topics
  const phaseTopics = topic ? getPhaseTopics(topic.phase) : [];
  const currentIdx = phaseTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentIdx > 0 ? phaseTopics[currentIdx - 1] : null;
  const nextTopic =
    currentIdx < phaseTopics.length - 1 ? phaseTopics[currentIdx + 1] : null;

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
        return "bg-emerald-400/10 text-emerald-400";
      case "intermediate":
        return "bg-amber-400/10 text-amber-400";
      case "advanced":
        return "bg-red-400/10 text-red-400";
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
      className="max-w-4xl mx-auto"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-surface-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-surface-200 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          to={`/phase/${topic.phase}`}
          className="hover:text-surface-200 transition-colors"
        >
          Phase {topic.phase}: {phaseInfo?.shortTitle}
        </Link>
        <span>/</span>
        <span className="text-surface-200">{topic.title}</span>
      </div>

      {/* Topic header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-2xl p-6 md:p-8 mb-6"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: phaseInfo?.color }}
              />
              <span className="text-xs text-surface-500">
                Phase {topic.phase}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyStyle(topic.difficulty)}`}
              >
                {topic.difficulty}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              {topic.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-surface-400">
              <span className="flex items-center gap-1">
                <FaClock className="text-xs" /> {topic.estimatedHours} hours
              </span>
              <span>{topic.subtopics.length} subtopics</span>
              <span>{topic.youtubeVideos.length} videos</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => toggleBookmark(topicId)}
              className={`p-2 rounded-lg transition-colors ${
                bookmarked
                  ? "bg-amber-400/20 text-amber-400"
                  : "glass hover:bg-white/10 text-surface-400"
              }`}
              title={bookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        </div>

        {/* Mark as complete button */}
        <button
          onClick={handleToggleComplete}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
            complete
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
              : "btn-primary"
          }`}
        >
          {complete ? (
            <span className="flex items-center justify-center gap-2">
              <FaCheck /> Completed ✓
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FaCheck /> Mark as Complete
            </span>
          )}
        </button>
      </motion.div>

      {/* Description */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          📝 <span>About This Topic</span>
        </h2>
        <p className="text-sm text-surface-300 leading-relaxed whitespace-pre-line">
          {topic.description}
        </p>
      </motion.section>

      {/* Why it matters */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl p-6 mb-6 border-l-4 border-primary-500"
      >
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          🎯 <span>Why This Matters</span>
        </h2>
        <p className="text-sm text-surface-300 leading-relaxed">
          {topic.whyItMatters}
        </p>
      </motion.section>

      {/* Subtopics checklist */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          📂 <span>Topics to Cover</span>
        </h2>
        <div className="grid gap-2">
          {topic.subtopics.map((subtopic, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="w-5 h-5 rounded border border-surface-600 flex items-center justify-center text-[10px] text-surface-500">
                {idx + 1}
              </div>
              <span className="text-sm text-surface-300">{subtopic}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* YouTube Videos */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          🎥 <span>Recommended Videos</span>
        </h2>
        <div className="grid gap-4">
          {topic.youtubeVideos.map((video, idx) => {
            const videoId = getYouTubeId(video.url);
            const isPlaylist = video.url.includes("playlist");
            return (
              <div
                key={idx}
                className="rounded-xl overflow-hidden bg-surface-800/50"
              >
                {videoId && !isPlaylist ? (
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.title}
                      className="w-full h-full"
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
                    className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors"
                  >
                    <FaYoutube className="text-red-500 text-2xl flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{video.title}</p>
                      <p className="text-xs text-surface-500">
                        {video.channel} • {isPlaylist ? "Playlist" : "Video"}
                      </p>
                    </div>
                    <FaExternalLinkAlt className="text-surface-500 text-xs" />
                  </a>
                )}
                <div className="p-3 border-t border-white/5">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    {video.title}
                    <FaExternalLinkAlt className="text-xs text-surface-500" />
                  </a>
                  <p className="text-xs text-surface-500">{video.channel}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* References */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          🔗 <span>References & Resources</span>
        </h2>
        <div className="grid gap-2">
          {topic.references.map((ref, idx) => (
            <a
              key={idx}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 flex-shrink-0">
                <FaExternalLinkAlt className="text-xs" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium group-hover:text-primary-400 transition-colors truncate">
                  {ref.title}
                </p>
                <p className="text-xs text-surface-500 truncate">{ref.url}</p>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Tags */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <FaTag className="text-sm" /> <span>Tags</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white/5 text-xs text-surface-400 border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Prerequisites */}
      {topic.prerequisites.length > 0 && (
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold mb-3">📋 Prerequisites</h2>
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
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    preComplete
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "glass hover:bg-white/10"
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

      {/* Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="flex justify-between gap-4 mt-8"
      >
        {prevTopic ? (
          <Link
            to={`/topic/${prevTopic.id}`}
            className="flex-1 glass rounded-xl p-4 hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-2 text-xs text-surface-500 mb-1">
              <FaChevronLeft className="text-[8px]" /> Previous
            </div>
            <p className="text-sm font-medium group-hover:text-primary-400 transition-colors truncate">
              {prevTopic.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextTopic ? (
          <Link
            to={`/topic/${nextTopic.id}`}
            className="flex-1 glass rounded-xl p-4 hover:bg-white/10 transition-colors group text-right"
          >
            <div className="flex items-center justify-end gap-2 text-xs text-surface-500 mb-1">
              Next <FaChevronRight className="text-[8px]" />
            </div>
            <p className="text-sm font-medium group-hover:text-primary-400 transition-colors truncate">
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
