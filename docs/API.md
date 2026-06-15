# API Reference

Base URL: `http://localhost:8000`

## GET /api/health

Returns service status.

**Response:**
```json
{ "status": "ok", "service": "CampusGreen AI" }
```

## POST /api/assess

Submit assessment answers and receive score + recommendations.

**Request:**
```json
{
  "institution_name": "Example University",
  "answers": {
    "e1": "yes",
    "e2": "partial",
    "e3": "no",
    "e4": "yes"
  }
}
```

All 20 question IDs required for a complete assessment.

**Response:**
```json
{
  "result": {
    "categories": [...],
    "overallScore": 72,
    "grade": "Good",
    "gradeDescription": "..."
  },
  "recommendations": {
    "summary": "...",
    "categories": [...],
    "promptUsed": "...",
    "source": "rule-based"
  }
}
```

## POST /api/recommendations

Generate recommendations from a pre-computed result.

**Request:**
```json
{
  "institution_name": "Example University",
  "result": { "categories": [...], "overallScore": 72, "grade": "Good", "gradeDescription": "..." }
}
```

## Question IDs

| ID | Category |
|----|----------|
| e1–e4 | Energy |
| w1–w4 | Waste |
| wa1–wa4 | Water |
| t1–t4 | Transportation |
| a1–a4 | Awareness |

Answer values: `yes`, `partial`, `no`
