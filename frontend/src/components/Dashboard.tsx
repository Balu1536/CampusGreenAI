import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, Building2, CloudSun, Lightbulb, Recycle, Sparkles } from "lucide-react";
import GrowthRing from "./GrowthRing";
import { AssessmentResult } from "../utils/scoring";
import { CategoryRecommendation, RecommendationSet, getImpactedSdgs } from "../utils/recommendations";
import { Page } from "../types";

interface DashboardProps {
  result: AssessmentResult | null;
  recommendations: RecommendationSet | null;
  onNavigate: (page: Page) => void;
}

const CHART_COLORS = ["#7cd992", "#3f7a52", "#f4b942", "#60a5fa", "#a78bfa"];

const PRIORITY_STYLES = {
  high: "border-coral/40 bg-coral/10 text-coral",
  medium: "border-amber/40 bg-amber/10 text-amber",
  low: "border-sprout/40 bg-sprout/10 text-sprout",
};

function CategoryCard({ rec }: { rec: CategoryRecommendation }) {
  return (
    <div className="rounded-xl2 border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold">{rec.categoryLabel}</h3>
          <p className="font-mono text-sm text-mist/60 mt-1">Score: {rec.score}%</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${PRIORITY_STYLES[rec.priority]}`}>
          {rec.priority} priority
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {rec.recommendations.map((item) => (
          <li key={item} className="text-sm text-mist/75 flex items-start gap-2">
            <Lightbulb size={14} className="text-sprout mt-0.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {rec.sdgs.map((sdg) => (
          <span key={sdg} className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-mist/60">
            {sdg}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ result, recommendations, onNavigate }: DashboardProps) {
  if (!result || !recommendations) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="glass p-10 flex flex-col items-center gap-4">
          <AlertTriangle size={40} className="text-amber" />
          <h2 className="font-display font-bold text-2xl">No assessment data yet</h2>
          <p className="text-mist/65">
            Complete the 20-question sustainability assessment to generate your CampusGreen Score and AI recommendations.
          </p>
          <button
            onClick={() => onNavigate("assessment")}
            className="mt-2 px-6 py-3 rounded-full bg-sprout text-canopy font-semibold hover:bg-mist transition-colors"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  const barData = result.categories.map((c) => ({
    name: c.label.split(" ")[0],
    fullName: c.label,
    score: c.percentage,
  }));

  const pieData = result.categories.map((c) => ({
    name: c.label,
    value: c.weight,
  }));

  const impactedSdgs = getImpactedSdgs(recommendations.categories);
  const weakCategories = recommendations.categories.filter((c) => c.priority !== "low");

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <div className="animate-rise">
        <p className="text-sm font-mono text-sprout uppercase tracking-widest">CampusGreen Dashboard</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mt-2">Your sustainability snapshot</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-strong p-8 flex flex-col items-center justify-center text-center animate-rise">
          <GrowthRing score={result.overallScore} sublabel={result.grade} size={200} />
          <p className="mt-4 text-mist/70 text-sm max-w-xs">{result.gradeDescription}</p>
          <div className="mt-4 px-4 py-2 rounded-full bg-sprout/15 border border-sprout/30">
            <span className="font-display font-semibold text-sprout">{result.grade}</span>
            <span className="text-mist/60 text-sm ml-2">CampusGreen Grade</span>
          </div>
        </div>

        <div className="lg:col-span-2 glass p-6 animate-rise" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-display font-semibold text-lg mb-4">Category scores</h2>
          <div className="space-y-4">
            {result.categories.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-mist/80">{cat.label}</span>
                  <span className="font-mono text-sprout">{cat.percentage}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-moss to-sprout transition-all duration-700"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-mist/45 mt-1">
                  {cat.rawScore}/{cat.maxScore} points · {cat.weight}% weight
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-6 animate-rise">
          <h2 className="font-display font-semibold text-lg mb-4">Score by category</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: "rgba(234,247,238,0.6)", fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "rgba(234,247,238,0.6)", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "#143d2b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
                formatter={(value: number) => [`${value}%`, "Score"]}
                labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName ?? ""}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {barData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6 animate-rise">
          <h2 className="font-display font-semibold text-lg mb-4">Score weight distribution</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={({ value }) => `${value}%`}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#143d2b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
                formatter={(value: number) => [`${value}%`, "Weight"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass p-6 sm:p-8 animate-rise">
        <div className="flex items-start gap-3 mb-4">
          <Sparkles className="text-sprout shrink-0 mt-1" size={22} />
          <div>
            <h2 className="font-display font-semibold text-xl">AI Recommendation Engine</h2>
            <p className="text-sm text-mist/60 mt-1">
              Powered by prompt engineering and IBM Granite model concepts
              {recommendations.source === "rule-based" && " (offline rule-based mode — connect backend for live AI)"}.
            </p>
          </div>
        </div>
        <p className="text-mist/80 leading-relaxed mb-6">{recommendations.summary}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {weakCategories.map((rec) => (
            <CategoryCard key={rec.categoryId} rec={rec} />
          ))}
        </div>
      </div>

      <div className="glass p-6 animate-rise">
        <h2 className="font-display font-semibold text-lg mb-4">SDGs impacted by your action plan</h2>
        <div className="flex flex-wrap gap-4">
          {impactedSdgs.map((sdg) => {
            const Icon = sdg === "SDG 11" ? Building2 : sdg === "SDG 12" ? Recycle : CloudSun;
            return (
              <div
                key={sdg}
                className="flex items-center gap-3 px-4 py-3 rounded-xl2 border border-white/10 bg-white/5"
              >
                <Icon size={20} className="text-sprout" />
                <div>
                  <p className="font-mono text-sm text-sprout">{sdg}</p>
                  <p className="text-xs text-mist/60">
                    {sdg === "SDG 11" && "Sustainable Cities & Communities"}
                    {sdg === "SDG 12" && "Responsible Consumption & Production"}
                    {sdg === "SDG 13" && "Climate Action"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
