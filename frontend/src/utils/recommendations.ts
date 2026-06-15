import { CategoryId } from "../data/questions";
import { AssessmentResult } from "./scoring";

export interface CategoryRecommendation {
  categoryId: CategoryId;
  categoryLabel: string;
  score: number;
  priority: "high" | "medium" | "low";
  recommendations: string[];
  sdgs: string[];
}

export interface RecommendationSet {
  summary: string;
  categories: CategoryRecommendation[];
  promptUsed: string;
  source: "rule-based" | "ai";
}

const RECOMMENDATION_LIBRARY: Record<CategoryId, string[]> = {
  energy: [
    "Introduce LED lighting across all buildings and common areas.",
    "Adopt renewable energy solutions such as rooftop solar panels.",
    "Promote energy conservation awareness campaigns among students and staff.",
    "Install smart meters to monitor and reduce peak electricity consumption.",
  ],
  waste: [
    "Implement color-coded waste segregation at source across campus.",
    "Reduce single-use plastic usage through campus-wide policy changes.",
    "Conduct regular recycling campaigns for paper, e-waste, and plastics.",
    "Set up a composting facility for organic waste from canteens and gardens.",
  ],
  water: [
    "Install rainwater harvesting systems to supplement groundwater supply.",
    "Monitor water usage with sub-metering in hostels and labs.",
    "Repair leakages quickly through a dedicated maintenance response team.",
    "Upgrade to water-efficient fixtures such as low-flow taps and dual-flush toilets.",
  ],
  transportation: [
    "Promote public transport with subsidized passes for students and staff.",
    "Encourage bicycle usage with secure parking and dedicated cycling lanes.",
    "Provide EV charging facilities to support electric vehicle adoption.",
    "Launch a campus shuttle or carpooling program to reduce single-occupancy trips.",
  ],
  awareness: [
    "Conduct sustainability workshops and seminars each semester.",
    "Organize tree plantation drives to increase campus green cover.",
    "Establish environmental clubs with student leadership and faculty mentors.",
    "Integrate sustainability topics into orientation and curriculum modules.",
  ],
};

const SDG_MAP: Record<CategoryId, string[]> = {
  energy: ["SDG 11", "SDG 13"],
  waste: ["SDG 11", "SDG 12"],
  water: ["SDG 11", "SDG 12"],
  transportation: ["SDG 11", "SDG 13"],
  awareness: ["SDG 11", "SDG 12", "SDG 13"],
};

function priorityFromScore(score: number): "high" | "medium" | "low" {
  if (score < 50) return "high";
  if (score < 75) return "medium";
  return "low";
}

export function buildGranitePrompt(result: AssessmentResult, institutionName = "the institution"): string {
  const categoryLines = result.categories
    .map((c) => `- ${c.label}: ${c.percentage}% (weight ${c.weight}%)`)
    .join("\n");

  return `You are CampusGreen AI, a sustainability advisor for educational institutions.
Use IBM Granite model principles: be factual, actionable, and aligned with SDGs 11, 12, and 13.

Institution: ${institutionName}
Overall CampusGreen Score: ${result.overallScore}/100 (${result.grade})

Category breakdown:
${categoryLines}

For each category scoring below 75%, provide 2-3 specific, low-cost recommendations
appropriate for Indian educational campuses. Avoid generic advice. Do not collect or
reference personal data. Format as bullet points grouped by category.`;
}

export function generateRecommendations(result: AssessmentResult): RecommendationSet {
  const promptUsed = buildGranitePrompt(result);

  const categories: CategoryRecommendation[] = result.categories.map((cat) => {
    const priority = priorityFromScore(cat.percentage);
    const pool = RECOMMENDATION_LIBRARY[cat.id];
    const count = priority === "high" ? 4 : priority === "medium" ? 3 : 2;

    return {
      categoryId: cat.id,
      categoryLabel: cat.label,
      score: cat.percentage,
      priority,
      recommendations: pool.slice(0, count),
      sdgs: SDG_MAP[cat.id],
    };
  });

  const weakCategories = result.categories.filter((c) => c.percentage < 75);
  const summary =
    weakCategories.length === 0
      ? `Your campus scored ${result.overallScore}/100 (${result.grade}). Maintain current practices and explore advanced initiatives like renewable energy expansion and campus benchmarking.`
      : `Your campus scored ${result.overallScore}/100 (${result.grade}). Focus first on ${weakCategories
          .sort((a, b) => a.percentage - b.percentage)
          .slice(0, 2)
          .map((c) => c.label)
          .join(" and ")} to improve your overall sustainability profile.`;

  return { summary, categories, promptUsed, source: "rule-based" };
}

export async function fetchAIRecommendations(
  result: AssessmentResult,
  institutionName?: string
): Promise<RecommendationSet> {
  try {
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result, institution_name: institutionName }),
    });

    if (!response.ok) throw new Error("API unavailable");

    const data = await response.json();
    return { ...data, source: "ai" as const };
  } catch {
    return generateRecommendations(result);
  }
}

export function getImpactedSdgs(recommendations: CategoryRecommendation[]): string[] {
  const sdgs = new Set<string>();
  recommendations.forEach((rec) => {
    if (rec.priority !== "low") rec.sdgs.forEach((s) => sdgs.add(s));
  });
  return Array.from(sdgs).sort();
}
