import { Eye, Heart, Scale, Shield } from "lucide-react";
import { Page } from "../types";

interface ResponsibleAIProps {
  onNavigate: (page: Page) => void;
}

const PILLARS = [
  {
    title: "Fairness",
    icon: Scale,
    summary: "Recommendations should benefit all users equally.",
    detail:
      "CampusGreen AI applies the same scoring rubric and recommendation logic to every institution. Category weights and grade thresholds are fixed and published — no institution receives preferential treatment based on size, location, or affiliation.",
    practices: [
      "Uniform 20-question assessment for all campuses",
      "Transparent category weights (Energy 25%, Waste 25%, Water 20%, Transportation 15%, Awareness 15%)",
      "Recommendations scaled to score tiers, not institution profile",
    ],
  },
  {
    title: "Transparency",
    icon: Eye,
    summary: "Explain how scores are calculated.",
    detail:
      "Every point on your dashboard can be traced back to a specific answer. The scoring formula is deterministic: Yes = 5, Partially = 3, No = 0. Category percentages are averaged with published weights to produce the overall CampusGreen Score out of 100.",
    practices: [
      "Full scoring breakdown visible on the dashboard",
      "Grade bands published: Excellent (85–100), Good (70–84), Average (50–69), Needs Improvement (30–49), Critical (0–29)",
      "AI prompts logged for auditability when backend is connected",
    ],
  },
  {
    title: "Ethics",
    icon: Heart,
    summary: "Avoid harmful or misleading recommendations.",
    detail:
      "Recommendations focus on practical, low-risk sustainability actions appropriate for educational campuses. The system does not suggest unsafe practices, greenwashing strategies, or actions that could harm students, staff, or local communities.",
    practices: [
      "Curated recommendation library reviewed for campus safety",
      "Prompt engineering guardrails in IBM Granite integration",
      "Human-in-the-loop review encouraged before policy adoption",
    ],
  },
  {
    title: "Privacy",
    icon: Shield,
    summary: "Do not collect sensitive personal information.",
    detail:
      "The assessment collects only sustainability practice responses — no names, emails, student IDs, or financial data. When Supabase persistence is enabled, institutions may optionally store aggregate scores, but personal identifiers are never required.",
    practices: [
      "No login required for basic assessment",
      "Optional institution name only for report labeling",
      "GDPR-aligned data minimization in database schema",
    ],
  },
];

const FUTURE = [
  {
    title: "RAG-based document analysis",
    description: "Analyze NAAC reports, energy audits, and NSS activity reports for evidence-backed scoring.",
  },
  {
    title: "Agentic AI workflows",
    description: "Autonomous monitoring and recommendation pipelines that track progress over semesters.",
  },
  {
    title: "Multimodal AI",
    description: "Image analysis for waste accumulation, green cover, and plastic usage on campus.",
  },
  {
    title: "Entity extraction & summarization",
    description: "Extract sustainability initiatives from uploaded institutional reports automatically.",
  },
  {
    title: "Campus benchmarking",
    description: "Compare sustainability scores across multiple institutions anonymously.",
  },
  {
    title: "Predictive analytics",
    description: "Forecast sustainability trajectories based on historical assessment data.",
  },
];

export default function ResponsibleAI({ onNavigate }: ResponsibleAIProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10 animate-rise">
        <p className="text-sm font-mono text-sprout uppercase tracking-widest">Responsible AI</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mt-2">
          Built on IBM SkillsBuild principles
        </h1>
        <p className="text-mist/65 mt-3 max-w-2xl leading-relaxed">
          CampusGreen AI embeds fairness, transparency, ethics, and privacy into every layer —
          from the scoring engine to the recommendation prompts designed for IBM Granite models.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-14">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.title} className="glass p-6 sm:p-8 animate-rise">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-sprout/15 border border-sprout/30">
                  <Icon size={22} className="text-sprout" />
                </span>
                <div>
                  <h2 className="font-display font-semibold text-xl">{pillar.title}</h2>
                  <p className="text-sm text-sprout">{pillar.summary}</p>
                </div>
              </div>
              <p className="text-mist/70 text-sm leading-relaxed">{pillar.detail}</p>
              <ul className="mt-4 space-y-2">
                {pillar.practices.map((item) => (
                  <li key={item} className="text-sm text-mist/60 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sprout/60 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="glass p-8 sm:p-10 animate-rise">
        <h2 className="font-display font-bold text-2xl mb-2">Future enhancements</h2>
        <p className="text-mist/60 mb-6 max-w-2xl">
          Roadmap aligned with 1M1B internship learnings and IBM Hackathon innovation tracks.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FUTURE.map((item) => (
            <div key={item.title} className="rounded-xl2 border border-white/10 bg-white/5 p-5">
              <h3 className="font-display font-semibold text-sm">{item.title}</h3>
              <p className="text-xs text-mist/60 mt-2 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate("assessment")}
            className="px-6 py-3 rounded-full bg-sprout text-canopy font-semibold hover:bg-mist transition-colors"
          >
            Try the assessment
          </button>
        </div>
      </div>
    </div>
  );
}
