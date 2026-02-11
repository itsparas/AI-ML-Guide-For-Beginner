import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChild, FaGraduationCap } from "react-icons/fa";
import useProgressStore from "../store/useProgressStore";

const ELI5Toggle = ({ eli5Text }) => {
  const { eli5Mode, toggleEli5Mode } = useProgressStore();

  if (!eli5Text) return null;

  return (
    <div className="mb-6">
      {/* Toggle button */}
      <button
        onClick={toggleEli5Mode}
        className={`group flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
          eli5Mode
            ? "bg-amber-500/15 text-amber-300 border border-amber-500/20 shadow-lg shadow-amber-500/5"
            : "glass hover:bg-white/10 text-surface-400 hover:text-surface-200"
        }`}
      >
        <div className={`transition-transform duration-300 ${eli5Mode ? "scale-110" : "group-hover:scale-110"}`}>
          {eli5Mode ? <FaChild className="text-amber-400" /> : <FaGraduationCap />}
        </div>
        <span>{eli5Mode ? "Showing Simple Explanation" : "Explain Like I'm 5"}</span>
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

      {/* ELI5 content */}
      <AnimatePresence>
        {eli5Mode && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="relative rounded-2xl p-5 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 border border-amber-500/15">
              {/* Decorative emoji */}
              <div className="absolute top-3 right-4 text-2xl opacity-20">🧒</div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-base">💡</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                    Simple Explanation
                  </h4>
                  <p className="text-sm text-surface-300 leading-relaxed">
                    {eli5Text}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ELI5Toggle;
