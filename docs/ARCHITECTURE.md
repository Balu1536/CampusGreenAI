# Architecture

## Overview

CampusGreen AI is a three-tier web application:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  React Frontend │────▶│  FastAPI Backend │────▶│    Supabase     │
│  (Vite + TS)    │     │  (Python)       │     │  (PostgreSQL)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                        │
        │  Client-side scoring   │  IBM Granite API (optional)
        └────────────────────────┘
```

## Frontend

Single-page application with page state (`landing`, `assessment`, `dashboard`, `responsible-ai`).

- **Assessment flow**: 20 questions grouped by category with step navigation
- **Scoring**: Computed client-side via `computeAssessment()` for instant feedback
- **Recommendations**: Rule-based engine with Granite prompt template; optional API call to backend
- **Visualization**: Recharts bar chart (category scores) and pie chart (weight distribution)

## Backend

FastAPI service exposing:

- `GET /api/health` — health check
- `POST /api/assess` — full assessment + recommendations
- `POST /api/recommendations` — AI recommendation generation

Scoring logic mirrors the frontend exactly for consistency.

## Database

Supabase stores optional assessment history for benchmarking. Schema minimizes PII — only institution name and aggregate scores.

## AI Layer

1. **Prompt Engineering**: Structured prompts in `backend/app/prompts.py`
2. **Rule-based fallback**: Curated recommendation library for offline/demo mode
3. **Granite integration point**: Set `GRANITE_API_URL` and `GRANITE_API_KEY` in backend `.env`

## Design System

- **Colors**: Canopy (#0B2B1E), Sprout (#7CD992), Mist (#EAF7EE)
- **Typography**: Sora (display), Inter (body), JetBrains Mono (data)
- **Signature element**: Growth Ring — circular score gauge with leaf icon
