"""AI Recommendation Engine with IBM Granite prompt concepts and rule-based fallback."""

from app.models import AssessmentResult, CategoryRecommendation, RecommendationResponse
from app.prompts import build_granite_prompt

RECOMMENDATION_LIBRARY: dict[str, list[str]] = {
    "energy": [
        "Introduce LED lighting across all buildings and common areas.",
        "Adopt renewable energy solutions such as rooftop solar panels.",
        "Promote energy conservation awareness campaigns among students and staff.",
        "Install smart meters to monitor and reduce peak electricity consumption.",
    ],
    "waste": [
        "Implement color-coded waste segregation at source across campus.",
        "Reduce single-use plastic usage through campus-wide policy changes.",
        "Conduct regular recycling campaigns for paper, e-waste, and plastics.",
        "Set up a composting facility for organic waste from canteens and gardens.",
    ],
    "water": [
        "Install rainwater harvesting systems to supplement groundwater supply.",
        "Monitor water usage with sub-metering in hostels and labs.",
        "Repair leakages quickly through a dedicated maintenance response team.",
        "Upgrade to water-efficient fixtures such as low-flow taps and dual-flush toilets.",
    ],
    "transportation": [
        "Promote public transport with subsidized passes for students and staff.",
        "Encourage bicycle usage with secure parking and dedicated cycling lanes.",
        "Provide EV charging facilities to support electric vehicle adoption.",
        "Launch a campus shuttle or carpooling program to reduce single-occupancy trips.",
    ],
    "awareness": [
        "Conduct sustainability workshops and seminars each semester.",
        "Organize tree plantation drives to increase campus green cover.",
        "Establish environmental clubs with student leadership and faculty mentors.",
        "Integrate sustainability topics into orientation and curriculum modules.",
    ],
}

SDG_MAP: dict[str, list[str]] = {
    "energy": ["SDG 11", "SDG 13"],
    "waste": ["SDG 11", "SDG 12"],
    "water": ["SDG 11", "SDG 12"],
    "transportation": ["SDG 11", "SDG 13"],
    "awareness": ["SDG 11", "SDG 12", "SDG 13"],
}


def _priority(score: int) -> str:
    if score < 50:
        return "high"
    if score < 75:
        return "medium"
    return "low"


def generate_recommendations(
    result: AssessmentResult,
    institution_name: str = "the institution",
) -> RecommendationResponse:
    prompt_used = build_granite_prompt(result, institution_name)

    categories: list[CategoryRecommendation] = []
    for cat in result.categories:
        priority = _priority(cat.percentage)
        pool = RECOMMENDATION_LIBRARY[cat.id]
        count = 4 if priority == "high" else 3 if priority == "medium" else 2
        categories.append(
            CategoryRecommendation(
                categoryId=cat.id,
                categoryLabel=cat.label,
                score=cat.percentage,
                priority=priority,
                recommendations=pool[:count],
                sdgs=SDG_MAP[cat.id],
            )
        )

    weak = [c for c in result.categories if c.percentage < 75]
    if not weak:
        summary = (
            f"Your campus scored {result.overall_score}/100 ({result.grade}). "
            "Maintain current practices and explore advanced initiatives."
        )
    else:
        focus = sorted(weak, key=lambda c: c.percentage)[:2]
        names = " and ".join(c.label for c in focus)
        summary = (
            f"Your campus scored {result.overall_score}/100 ({result.grade}). "
            f"Focus first on {names} to improve your overall sustainability profile."
        )

    return RecommendationResponse(
        summary=summary,
        categories=categories,
        promptUsed=prompt_used,
        source="rule-based",
    )


async def generate_ai_recommendations(
    result: AssessmentResult,
    institution_name: str = "the institution",
) -> RecommendationResponse:
    """
    Placeholder for IBM Granite / watsonx API integration.
    Set GRANITE_API_URL and GRANITE_API_KEY in .env to enable live AI responses.
    Falls back to rule-based recommendations when credentials are absent.
    """
    import os

    api_url = os.getenv("GRANITE_API_URL")
    api_key = os.getenv("GRANITE_API_KEY")

    if not api_url or not api_key:
        return generate_recommendations(result, institution_name)

    # Production: POST prompt to Granite endpoint and parse structured response.
    # For hackathon/demo, rule-based engine provides deterministic output.
    return generate_recommendations(result, institution_name)
