import { useEffect, useState } from "react";
import { Page } from "../types";

interface BenchmarkProps {
  onNavigate: (page: Page) => void;
}

export default function Benchmark({ onNavigate }: BenchmarkProps) {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBenchmark = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/benchmark", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch benchmark: ${response.status}`);
        }

        const data = await response.json();
        setLeaderboard(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching benchmark");
      } finally {
        setLoading(false);
      }
    };

    fetchBenchmark();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <div className="h-8 w-8 border-2 border-sprout border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-mist/70">Loading benchmark...</p>
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
      </div
    );
  }

  // Sort leaderboard by score descending (highest first)
  const sortedLeaderboard = [...leaderboard].sort(
    (a, b) => b.score - a.score
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8 animate-rise">
        <p className="text-sm font-mono text-sprout uppercase tracking-widest">Institution Leaderboard</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mt-2">Top-performing campuses</h1>
      </div>

      {sortedLeaderboard.length === 0 ? (
        <p className="text-mist/65 text-center py-12">
          No benchmark data available yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y border-white/10">
            <thead>
              <tr className="bg-white/5">
                <th className="px-6 py-3 text-left text-xs font-mono text-mist/50 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-mono text-mist/50 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-mono text-mist/50 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sortedLeaderboard.map((entry, index) => (
                <tr key={index} className="hover:bg-white/5">
                  <td className="px-6 py-4 text-sm font-mono text-mist">
                    {entry.rank || index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-mist">
                    {entry.institution_name || "Unknown Institution"}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-mist">
                    {entry.score}%
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
        </div>
      )}
    </div>
  );
}