import { useEffect, useState } from "react";
import { Page } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HistoryProps {
  onNavigate: (page: Page) => void;
}

export default function History({ onNavigate }: HistoryProps) {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"score" | "date">("date");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/history", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch history: ${response.status}`);
        }

        const data = await response.json();
        setAssessments(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <div className="h-8 w-8 border-2 border-sprout border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-mist/70">Loading history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="text-coral">{error}</p>
        <button
          onClick={() => onNavigate("landing")}
          className="mt-4 px-4 py-2 rounded-full bg-sprout text-canopy font-semibold text-sm hover:bg-mist transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  // Sort assessments
  const sortedAssessments = [...assessments].sort((a, b) => {
    if (sortBy === "score") {
      return b.overallScore - a.overallScore; // highest first
    } else {
      // date: latest first
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  // Prepare trend data: score over time (by month)
  const trendData = assessments
    .map((a) => {
      const date = new Date(a.created_at);
      return {
        name: date.toLocaleString("default", { month: "short", year: "numeric" }),
        score: a.overallScore,
        // Keep the full date for sorting
        timestamp: date.getTime(),
      };
    })
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(({ name, score }) => ({ name, score }));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8 animate-rise">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-mono text-sprout uppercase tracking-widest">Assessment History</p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl mt-2">Your past assessments</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-mist/60 text-sm">Sort by:</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "score" | "date")}
              className="px-3 py-2 rounded-xl2 border border-white/10 bg-white/5 text-sm focus:border-sprout/50"
            >
              <option value="date">Latest Assessment</option>
              <option value="score">Highest Score</option>
            </select>
          </div>
        </div>
        {/* Trend Chart */}
        {assessments.length > 1 && (
          <div className="mt-6">
            <p className="text-sm font-mono text-sprout uppercase tracking-widest mb-2">
              Sustainability Improvement Trend
            </p>
            <h2 className="font-display font-semibold text-xl mt-1">
              Score over time
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "rgba(234,247,238,0.6)", fontSize: 11 }} />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "rgba(234,247,238,0.6)", fontSize: 11 }}
                >
                  <label valueAxis angle=-90 position="insideLeft">Score</label>
                </YAxis>
                <Tooltip
                  contentStyle={{
                    background: "#143d2b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Score"]}
                />
                <Line type="monotone" dataKey="score" stroke="#7cd992" strokeWidth={2}>
                  {/* Optional: add dots */}
                  <Line type="monotone" dataKey="score" stroke="#7cd992" strokeWidth={0} dot={{ r: 4, strokeWidth: 2, stroke: "#7cd992" }} />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {sortedAssessments.length === 0 ? (
        <p className="text-mist/65 text-center py-12">
          No assessments found. Complete your first assessment to see history.
        </p>
      ) : (
        <div className="space-y-6">
          {sortedAssessments.map((assessment: any, index: number) => (
            <div key={index} className="glass p-6 rounded-xl2 border border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold">{assessment.institution_name || "Unknown Institution"}</h3>
                  <p className="text-mist/60 text-sm">
                    {assessment.institution_type} · {assessment.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sprout text-lg">{assessment.overallScore}</p>
                  <p className="text-xs text-mist/50">Score</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-sprout/15 text-sprout">
                  Grade: {assessment.grade}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-mist/60">
                  {new Date(assessment.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}