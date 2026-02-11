import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import OnboardingModal from "./OnboardingModal";
import useProgressStore from "../store/useProgressStore";
import { HiMenuAlt2, HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { tracks } from "../data/tracks";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children }) => {
  const {
    theme,
    toggleTheme,
    sidebarCollapsed,
    toggleSidebar,
    toggleMobileSidebar,
    onboardingSeen,
    activeTrack,
    setActiveTrack,
  } = useProgressStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const currentTrack = activeTrack
    ? tracks.find((t) => t.id === activeTrack) || null
    : null;
  const hasSidebar = activeTrack === "aiml" || activeTrack === "dsa";

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

  // Compute margin class
  const marginClass = hasSidebar
    ? sidebarCollapsed
      ? "ml-0 md:ml-16"
      : "ml-0 md:ml-72"
    : "ml-0";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — only rendered when a track is active */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${marginClass}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-40 glass border-b border-white/5">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger — only when sidebar is active */}
              {hasSidebar && (
                <button
                  onClick={toggleMobileSidebar}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors md:hidden"
                  aria-label="Open mobile menu"
                >
                  <HiMenuAlt2 className="text-xl" />
                </button>
              )}
              {/* Desktop hamburger — only when sidebar is active */}
              {hasSidebar && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden md:flex"
                  aria-label="Toggle sidebar"
                >
                  <HiMenuAlt2 className="text-xl" />
                </button>
              )}

              {/* Title area */}
              <div className="hidden sm:flex items-center gap-2">
                {currentTrack ? (
                  <>
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${currentTrack.color}18`,
                        color: currentTrack.color,
                      }}
                    >
                      <currentTrack.Icon className="text-xs" />
                    </div>
                    <h1 className="text-base font-semibold gradient-text leading-none">
                      {currentTrack.name} Roadmap
                    </h1>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      CA
                    </div>
                    <h1 className="text-base font-semibold gradient-text leading-none">
                      CodeAtlas
                    </h1>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Home / Tracks button (when inside a track) */}
              {hasSidebar && (
                <Link
                  to="/"
                  onClick={() => setActiveTrack(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-sm text-surface-400 hover:text-surface-200"
                >
                  <FaHome className="text-xs" />
                  <span className="hidden sm:inline">Tracks</span>
                </Link>
              )}

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
