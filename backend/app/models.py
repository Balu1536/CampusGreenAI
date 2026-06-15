from typing import Literal

from pydantic import BaseModel, Field


CategoryId = Literal["energy", "waste", "water", "transportation", "awareness"]
AnswerValue = Literal["yes", "partial", "no"]
Priority = Literal["high", "medium", "low"]


class CategoryResult(BaseModel):
    id: CategoryId
    label: str
    weight: int
    raw_score: int = Field(alias="rawScore")
    max_score: int = Field(alias="maxScore")
    percentage: int

    model_config = {"populate_by_name": True}


class AssessmentResult(BaseModel):
    categories: list[CategoryResult]
    overall_score: int = Field(alias="overallScore")
    grade: str
    grade_description: str = Field(alias="gradeDescription")

    model_config = {"populate_by_name": True}


class RecommendationRequest(BaseModel):
    result: AssessmentResult
    institution_name: str | None = "the institution"


class CategoryRecommendation(BaseModel):
    category_id: CategoryId = Field(alias="categoryId")
    category_label: str = Field(alias="categoryLabel")
    score: int
    priority: Priority
    recommendations: list[str]
    sdgs: list[str]

    model_config = {"populate_by_name": True}


class RecommendationResponse(BaseModel):
    summary: str
    categories: list[CategoryRecommendation]
    prompt_used: str = Field(alias="promptUsed")
    source: Literal["rule-based", "ai"] = "rule-based"

    model_config = {"populate_by_name": True}


class AssessmentSubmission(BaseModel):
    institution_name: str | None = None
    answers: dict[str, AnswerValue]
