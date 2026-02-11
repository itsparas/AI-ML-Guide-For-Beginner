import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import useProgressStore from "./store/useProgressStore";
import "./index.css";

const Home = React.lazy(() => import("./pages/Home"));
const AimlHome = React.lazy(() => import("./pages/AimlHome"));
const PhasePage = React.lazy(() => import("./pages/PhasePage"));
const TopicPage = React.lazy(() => import("./pages/TopicPage"));
const DsaHome = React.lazy(() => import("./pages/DsaHome"));
const DsaSectionPage = React.lazy(() => import("./pages/DsaSectionPage"));
const ComingSoonPage = React.lazy(() => import("./pages/ComingSoonPage"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-surface-400 text-sm">Loading...</p>
    </div>
  </div>
);

function App() {
  const theme = useProgressStore((s) => s.theme);

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [theme]);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<Home />} />

            {/* AI/ML Track */}
            <Route path="/aiml" element={<AimlHome />} />
            <Route path="/phase/:phaseId" element={<PhasePage />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />

            {/* DSA Track */}
            <Route path="/dsa" element={<DsaHome />} />
            <Route path="/dsa/section/:sectionId" element={<DsaSectionPage />} />

            {/* Coming Soon tracks */}
            <Route path="/track/:trackId" element={<ComingSoonPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
