import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import useProgressStore from "./store/useProgressStore";
import "./index.css";

const Home = React.lazy(() => import("./pages/Home"));
const PhasePage = React.lazy(() => import("./pages/PhasePage"));
const TopicPage = React.lazy(() => import("./pages/TopicPage"));

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
            <Route path="/" element={<Home />} />
            <Route path="/phase/:phaseId" element={<PhasePage />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
