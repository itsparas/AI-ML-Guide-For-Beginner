import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import OnboardingModal from "./OnboardingModal";
import useProgressStore from "../store/useProgressStore";
import { HiMenuAlt2, HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { allTopicIds } from "../utils/dataUtils";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children }) => {
  const {
    theme,
    toggleTheme,
    sidebarCollapsed,
    toggleSidebar,
    toggleMobileSidebar,
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
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-0 md:ml-16" : "ml-0 md:ml-72"}`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-40 glass border-b border-white/5">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger — opens mobile sidebar drawer */}
              <button
                onClick={toggleMobileSidebar}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors md:hidden"
                aria-label="Open mobile menu"
              >
                <HiMenuAlt2 className="text-xl" />
              </button>
              {/* Desktop hamburger — collapses desktop sidebar */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden md:flex"
                aria-label="Toggle sidebar"
              >
                <HiMenuAlt2 className="text-xl" />
              </button>
              <div className="hidden sm:flex items-center">
                <h1 className="text-base font-semibold gradient-text leading-none">
                  AI/ML Mastery Roadmap
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
                className="p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <HiOutlineSun className="text-xl text-amber-400" />
                ) : (
                  <HiOutlineMoon className="text-xl text-primary-400" />
                )}
              </button>
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
