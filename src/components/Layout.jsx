import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import OnboardingModal from "./OnboardingModal";
import useProgressStore from "../store/useProgressStore";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { allTopicIds } from "../utils/dataUtils";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children }) => {
  const {
    theme,
    toggleTheme,
    sidebarCollapsed,
    toggleSidebar,
    onboardingSeen,
    getOverallProgress,
  } = useProgressStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const progress = getOverallProgress(allTopicIds);

  useEffect(() => {
    if (!onboardingSeen) {
      setShowOnboarding(true);
    }
  }, [onboardingSeen]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-0 md:ml-16" : "ml-0 md:ml-72"}`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-40 glass border-b border-white/5">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors md:hidden"
                aria-label="Toggle sidebar"
              >
                <FaBars className="text-lg" />
              </button>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden md:block"
                aria-label="Toggle sidebar"
              >
                <FaBars className="text-lg" />
              </button>
              <div className="hidden sm:block">
                <h1 className="text-sm font-semibold gradient-text">
                  AI/ML Mastery Roadmap
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Progress pill */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 glass rounded-full text-xs">
                <div className="w-20 h-1.5 bg-surface-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-surface-300 font-medium">
                  {progress}%
                </span>
              </div>

              {/* Search button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <span className="text-surface-400">🔍</span>
                <span className="hidden sm:inline text-surface-400">
                  Search
                </span>
                <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] bg-surface-700 rounded text-surface-400">
                  Ctrl+K
                </kbd>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FaSun className="text-amber-400" />
                ) : (
                  <FaMoon className="text-primary-400" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile progress bar */}
          <div className="sm:hidden px-4 pb-2">
            <div className="flex items-center gap-2 text-xs text-surface-400">
              <div className="flex-1 h-1 bg-surface-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span>{progress}%</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingModal onClose={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
