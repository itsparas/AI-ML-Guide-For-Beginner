import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLock,
  FaBell,
  FaArrowLeft,
  FaChevronRight,
  FaCode,
  FaServer,
  FaLaptopCode,
  FaLayerGroup,
  FaCubes,
} from "react-icons/fa";
import { getTrackById } from "../data/tracks";
import useProgressStore from "../store/useProgressStore";

const ComingSoonPage = () => {
  const { trackId } = useParams();
  const { setActiveTrack } = useProgressStore();
  const track = getTrackById(trackId);

  React.useEffect(() => {
    if (track) {
      setActiveTrack(track.id);
    }
  }, [track, setActiveTrack]);

  if (!track) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-surface-200 mb-2">Track not found</h2>
          <Link to="/" className="text-primary-400 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const TrackIcon = track.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back link */}
      <Link
        to="/"
        onClick={() => setActiveTrack(null)}
        className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-surface-200 transition-colors mb-6"
      >
        <FaArrowLeft className="text-xs" /> Back to Home
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl glass border border-white/5 p-8 md:p-12 mb-8">
        {/* Background gradient */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${track.color}, transparent 70%)`,
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: `${track.color}15`,
              color: track.color,
            }}
          >
            <TrackIcon className="text-4xl" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-surface-100">
                {track.name}
              </h1>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: `${track.color}15`,
                  color: track.color,
                }}
              >
                <FaLock className="text-[9px]" /> Coming Soon
              </span>
            </div>
            <p className="text-surface-400 text-sm md:text-base max-w-xl leading-relaxed">
              {track.description}
            </p>
          </div>
        </div>
      </div>

      {/* Structure Preview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-surface-200 mb-4 flex items-center gap-2">
          <FaLayerGroup className="text-sm" style={{ color: track.color }} />
          What to Expect
        </h2>

        {/* DSA — topic-based flat list */}
        {track.id === "dsa" && track.expectedStructure && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {track.expectedStructure.items.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-white/5 group hover:border-white/10 transition-all"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{
                    backgroundColor: `${track.color}12`,
                    color: track.color,
                  }}
                >
                  {idx + 1}
                </div>
                <span className="text-sm text-surface-300 font-medium">{item}</span>
                <FaLock className="ml-auto text-[10px] text-surface-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        )}

        {/* System Design — HLD / LLD sub-tracks */}
        {track.id === "system-design" && track.subtracks && (
          <div className="space-y-6">
            {track.subtracks.map((subtrack, stIdx) => (
              <motion.div
                key={subtrack.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stIdx * 0.15 }}
                className="rounded-2xl glass border border-white/5 overflow-hidden"
              >
                {/* Sub-track header */}
                <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${subtrack.color}15`,
                      color: subtrack.color,
                    }}
                  >
                    {subtrack.id === "hld" ? (
                      <FaServer className="text-lg" />
                    ) : (
                      <FaCubes className="text-lg" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-surface-200">
                      {subtrack.name}
                    </h3>
                    <p className="text-[11px] text-surface-500">{subtrack.description}</p>
                  </div>
                  <span
                    className="ml-auto text-[10px] font-medium px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${subtrack.color}12`,
                      color: subtrack.color,
                    }}
                  >
                    {subtrack.expectedTopics.length} topics
                  </span>
                </div>
                {/* Topics list */}
                <div className="px-3 py-2">
                  {subtrack.expectedTopics.map((topic, tIdx) => (
                    <div
                      key={topic}
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.03] transition-colors"
                    >
                      <span
                        className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{
                          backgroundColor: `${subtrack.color}10`,
                          color: subtrack.color,
                        }}
                      >
                        {tIdx + 1}
                      </span>
                      <span className="text-[13px] text-surface-400">{topic}</span>
                      <FaLock className="ml-auto text-[9px] text-surface-700" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Development — Language → Framework hierarchy */}
        {track.id === "development" && track.subtracks && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {track.subtracks.map((lang, lIdx) => (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: lIdx * 0.1 }}
                className="rounded-2xl glass border border-white/5 overflow-hidden group hover:border-white/10 transition-all"
              >
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${lang.color}15`,
                      color: lang.color,
                    }}
                  >
                    <FaCode className="text-sm" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-surface-200">{lang.name}</h3>
                    <p className="text-[10px] text-surface-500">
                      {lang.frameworks.length} frameworks
                    </p>
                  </div>
                </div>
                <div className="px-3 py-2">
                  {lang.frameworks.map((fw) => (
                    <div
                      key={fw}
                      className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/[0.03] transition-colors"
                    >
                      <FaChevronRight
                        className="text-[8px] flex-shrink-0"
                        style={{ color: lang.color }}
                      />
                      <span className="text-[13px] text-surface-400">{fw}</span>
                      <FaLock className="ml-auto text-[9px] text-surface-700" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl glass border border-white/5 p-6 text-center"
      >
        <FaBell className="text-2xl mx-auto mb-3" style={{ color: track.color }} />
        <h3 className="text-base font-semibold text-surface-200 mb-1">
          We're building this track
        </h3>
        <p className="text-sm text-surface-400 mb-4 max-w-md mx-auto">
          The {track.shortName} roadmap is currently under development. In the meantime,
          check out the AI/ML track which is fully available.
        </p>
        <Link
          to="/aiml"
          onClick={() => setActiveTrack("aiml")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${track.color}, ${track.color}cc)`,
          }}
        >
          Explore AI/ML Roadmap <FaChevronRight className="text-[10px]" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoonPage;
