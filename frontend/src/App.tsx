import { useCallback, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Assessment from "./components/Assessment";
import Dashboard from "./components/Dashboard";
import ResponsibleAI from "./components/ResponsibleAI";
import { AnswerValue } from "./data/questions";
import { computeAssessment } from "./utils/scoring";
import { generateRecommendations, RecommendationSet } from "./utils/recommendations";
import { Page } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [recommendations, setRecommendations] = useState<RecommendationSet | null>(null);

  const result = useMemo(() => {
    const answered = Object.keys(answers).length;
    if (answered === 0) return null;
    return computeAssessment(answers);
  }, [answers]);

  const handleComplete = useCallback(() => {
    const computed = computeAssessment(answers);
    setRecommendations(generateRecommendations(computed));
  }, [answers]);

  const handleNavigate = (next: Page) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar page={page} onNavigate={handleNavigate} />
      <main className="flex-1">
        {page === "landing" && <LandingPage onNavigate={handleNavigate} />}
        {page === "assessment" && (
          <Assessment
            answers={answers}
            onAnswersChange={setAnswers}
            onComplete={handleComplete}
            onNavigate={handleNavigate}
          />
        )}
        {page === "dashboard" && (
          <Dashboard result={result} recommendations={recommendations} onNavigate={handleNavigate} />
        )}
        {page === "responsible-ai" && <ResponsibleAI onNavigate={handleNavigate} />}
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-xs text-mist/45">
        CampusGreen AI · SDG 11 · 12 · 13 · IBM SkillsBuild &times; 1M1B AI for Sustainability
      </footer>
    </div>
  );
}
