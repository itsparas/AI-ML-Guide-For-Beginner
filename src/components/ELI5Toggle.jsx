import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChild, FaGraduationCap, FaTimes } from "react-icons/fa";
import useProgressStore from "../store/useProgressStore";

const ELI5Toggle = ({ eli5Text }) => {
  const { eli5Mode, toggleEli5Mode } = useProgressStore();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && eli5Mode) {
        toggleEli5Mode();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [eli5Mode, toggleEli5Mode]);

  if (!eli5Text) return null;

  return (
    <>
      {/* Toggle button - always visible */}
      <div className="mb-6">
        <button
          onClick={toggleEli5Mode}
          className={`w-full group flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            eli5Mode
              ? "bg-amber-500/15 text-amber-300 border border-amber-500/20 shadow-lg shadow-amber-500/10"
              : "glass hover:bg-white/10 text-surface-400 hover:text-surface-200"
          }`}
        >
          <div className={`transition-transform duration-300 ${eli5Mode ? "scale-110" : "group-hover:scale-110"}`}>
            {eli5Mode ? <FaChild className="text-amber-400" /> : <FaGraduationCap />}
          </div>
          <span>{eli5Mode ? "Hide Simple Explanation" : "Explain Like I'm 5"}</span>
          <div
            className={`relative w-8 h-4 rounded-full transition-colors duration-300 ${
              eli5Mode ? "bg-amber-500" : "bg-surface-600"
            }`}
          >
            <motion.div
              className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm"
              animate={{ left: eli5Mode ? "1rem" : "0.125rem" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </button>
      </div>

      {/* Full-screen ELI5 overlay */}
      <AnimatePresence>
        {eli5Mode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={toggleEli5Mode}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-3xl relative"
            >
              {/* Close button */}
              <button
                onClick={toggleEli5Mode}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 transition-colors text-surface-400 hover:text-surface-200 z-10"
                aria-label="Close explanation"
              >
                <FaTimes className="text-lg" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                    <FaChild className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-amber-400">
                      Simple Explanation
                    </h3>
                    <p className="text-xs text-surface-400 mt-0.5">Understanding it like a 5-year-old 🧒</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-8 right-20 text-5xl opacity-10">🌟</div>
                <div className="absolute bottom-8 left-8 text-4xl opacity-10">💡</div>

                {/* ELI5 Text */}
                <div className="relative rounded-2xl p-6 md:p-8 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 border border-amber-500/20">
                  <p className="text-base md:text-lg text-surface-200 leading-relaxed whitespace-pre-line">
                    {eli5Text}
                  </p>
                </div>

                {/* Footer tip */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-surface-500">
                  <span>💡</span>
                  <span>Click outside or press ESC to close</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ELI5Toggle;
