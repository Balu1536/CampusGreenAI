import { useCallback, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Assessment from "./components/Assessment";
import Dashboard from "./components/Dashboard";
import ResponsibleAI from "./components/ResponsibleAI";
import InstitutionDetailsForm from "./components/InstitutionDetailsForm";
import History from "./components/History";
import Benchmark from "./components/Benchmark";
import { AnswerValue } from "./data/questions";
import { AssessmentResult } from "./utils/scoring";
import { Page } from "./types";

// API base URL (assuming same origin)
const API_BASE = "";

// Types for API responses
interface AssessResponse {
  result: AssessmentResult;
  recommendations: any; // We'll define this properly later
  assessmentId: string;
}

interface RecommendationResponse {
  summary: string;
  categories: any[];
  promptUsed: string;
  source: "rule-based" | "ai";
}

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [institutionDetails, setInstitutionDetails] = useState<{
    institution_name: string;
    institution_type: string;
    location: string;
    student_count: number;
  } | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null); // We'll refine later
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInstitutionSubmit = async (details: {
    institution_name: string;
    institution_type: string;
    location: string;
    student_count: number;
  }) => {
    setInstitutionDetails(details);
    setPage("assessment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnswersChange = useCallback((newAnswers: Record<string, AnswerValue>) => {
    setAnswers(newAnswers);
  }, []);

  const handleAssessmentSubmit = useCallback(async () => {
    if (!institutionDetails || Object.keys(answers).length === 0) {
      setError("Missing institution details or answers");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/assess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          institution_name: institutionDetails.institution_name,
          institution_type: institutionDetails.institution_type,
          location: institutionDetails.location,
          student_count: institutionDetails.student_count,
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error(`Assessment failed: ${response.status}`);
      }

      const data: AssessResponse = await response.json();
      setAssessmentResult(data.result);
      setRecommendations(data.recommendations); // Assuming the backend returns the recommendation set
      setPage("dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [institutionDetails, answers]);

  const handleNavigate = useCallback((next: Page) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Render based on page
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar page={page} onNavigate={handleNavigate} />
      <main className="flex-1">
        {page === "landing" && (
          <LandingPage onNavigate={handleNavigate} />
        )}
        {page === "institution-details" && (
          <InstitutionDetailsForm
            onDetailsSubmit={handleInstitutionSubmit}
            onNavigate={handleNavigate}
          />
        )}
        {page === "assessment" && (
          <Assessment
            answers={answers}
            onAnswersChange={handleAnswersChange}
            onComplete={handleAssessmentSubmit}
          />
        )}
        {page === "dashboard" && (
          <Dashboard
            result={assessmentResult}
            recommendations={recommendations}
            onNavigate={handleNavigate}
          />
        )}
        {page === "history" && (
          <History onNavigate={handleNavigate} />
        )}
        {page === "benchmark" && (
          <Benchmark onNavigate={handleNavigate} />
        )}
        {page === "responsible-ai" && <ResponsibleAI onNavigate={handleNavigate} />}
      </main>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="text-center">
            <div className="h-8 w-8 border-2 border-sprout border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-mist/70 text-sm">Loading...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-coral/90 text-coral rounded-xl2 p-6 max-w-md text-center">
            <h3 className="font-display font-semibold mb-2">Error</h3>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-4 py-2 rounded-full bg-sprout text-canopy font-semibold text-sm hover:bg-mist transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-mist/45">
        CampusGreen AI · SDG 11 · 12 · 13 · IBM SkillsBuild &times; 1M1B AI for Sustainability
      </footer>
    </div>
  );
}