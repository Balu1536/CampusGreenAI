from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import AssessmentSubmission, RecommendationRequest, RecommendationResponse
from app.recommendations import generate_ai_recommendations, generate_recommendations
from app.scoring import compute_assessment

app = FastAPI(
    title="CampusGreen AI API",
    description="AI-Based Sustainability Assessment and Recommendation System",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "CampusGreen AI"}


@app.post("/api/assess")
def assess(submission: AssessmentSubmission):
    result = compute_assessment(submission.answers)
    recommendations = generate_recommendations(
        result, submission.institution_name or "the institution"
    )
    return {"result": result, "recommendations": recommendations}


@app.post("/api/recommendations", response_model=RecommendationResponse)
async def recommendations(request: RecommendationRequest):
    return await generate_ai_recommendations(
        request.result, request.institution_name or "the institution"
    )
