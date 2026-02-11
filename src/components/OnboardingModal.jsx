import React from "react";
import { motion } from "framer-motion";
import useProgressStore from "../store/useProgressStore";
import {
  FaRocket,
  FaCheckCircle,
  FaBookmark,
  FaSearch,
  FaChartBar,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChartBar className="text-primary-400" />,
    title: "Track Progress",
    desc: "Mark topics complete and watch your progress grow",
  },
  {
    icon: <FaBookmark className="text-accent-400" />,
    title: "Bookmark Topics",
    desc: "Save topics for quick access later",
  },
  {
    icon: <FaSearch className="text-emerald-400" />,
    title: "Quick Search",
    desc: "Press Ctrl+K to find any topic instantly",
  },
  {
    icon: <FaCheckCircle className="text-amber-400" />,
    title: "Visual Roadmap",
    desc: "See your journey as an interactive flowchart",
  },
];

const OnboardingModal = ({ onClose }) => {
  const setOnboardingSeen = useProgressStore((s) => s.setOnboardingSeen);

  const handleClose = () => {
    setOnboardingSeen();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className="w-full max-w-md glass rounded-3xl p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Rocket icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center animate-float">
          <FaRocket className="text-2xl text-white" />
        </div>

        <h2 className="text-2xl font-bold mb-2 gradient-text">
          Welcome to AI/ML Mastery!
        </h2>
        <p className="text-surface-400 text-sm mb-6">
          Your comprehensive roadmap from absolute beginner to advanced AI/ML
          expert. Track your progress, watch curated tutorials, and master every
          concept.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5"
            >
              <span className="text-lg">{f.icon}</span>
              <span className="text-xs font-semibold">{f.title}</span>
              <span className="text-[10px] text-surface-500">{f.desc}</span>
            </motion.div>
          ))}
        </div>

        <button onClick={handleClose} className="btn-primary w-full">
          Start Learning 🚀
        </button>

        <p className="text-[10px] text-surface-600 mt-3">
          Your progress is saved locally in your browser
        </p>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingModal;
