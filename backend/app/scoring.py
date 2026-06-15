"""CampusGreen Score Engine — mirrors frontend scoring logic."""

from app.models import AnswerValue, AssessmentResult, CategoryResult

CATEGORIES = [
    {"id": "energy", "label": "Energy Management", "weight": 25},
    {"id": "waste", "label": "Waste Management", "weight": 25},
    {"id": "water", "label": "Water Conservation", "weight": 20},
    {"id": "transportation", "label": "Transportation", "weight": 15},
    {"id": "awareness", "label": "Awareness & Initiatives", "weight": 15},
]

QUESTION_CATEGORIES: dict[str, str] = {
    "e1": "energy", "e2": "energy", "e3": "energy", "e4": "energy",
    "w1": "waste", "w2": "waste", "w3": "waste", "w4": "waste",
    "wa1": "water", "wa2": "water", "wa3": "water", "wa4": "water",
    "t1": "transportation", "t2": "transportation", "t3": "transportation", "t4": "transportation",
    "a1": "awareness", "a2": "awareness", "a3": "awareness", "a4": "awareness",
}

POINTS: dict[AnswerValue, int] = {"yes": 5, "partial": 3, "no": 0}


def grade_from_score(score: int) -> tuple[str, str]:
    if score >= 85:
        return "Excellent", "Outstanding sustainability practices across campus."
    if score >= 70:
        return "Good", "Strong foundations with room to refine key areas."
    if score >= 50:
        return "Average", "Core practices exist but need consistent strengthening."
    if score >= 30:
        return "Needs Improvement", "Significant gaps require prioritized action."
    return "Critical", "Urgent, campus-wide intervention is recommended."


def compute_assessment(answers: dict[str, AnswerValue]) -> AssessmentResult:
    categories: list[CategoryResult] = []

    for cat in CATEGORIES:
        cat_id = cat["id"]
        question_ids = [qid for qid, cid in QUESTION_CATEGORIES.items() if cid == cat_id]
        max_score = len(question_ids) * 5
        raw_score = sum(POINTS.get(answers.get(qid, "no"), 0) for qid in question_ids)
        percentage = round((raw_score / max_score) * 100) if max_score else 0
        categories.append(
            CategoryResult(
                id=cat_id,
                label=cat["label"],
                weight=cat["weight"],
                rawScore=raw_score,
                maxScore=max_score,
                percentage=percentage,
            )
        )

    overall = round(sum(c.percentage * c.weight / 100 for c in categories))
    grade, description = grade_from_score(overall)

    return AssessmentResult(
        categories=categories,
        overallScore=overall,
        grade=grade,
        gradeDescription=description,
    )
