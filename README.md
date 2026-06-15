# CampusGreen AI

**Measure. Improve. Sustain.**

AI-Based Sustainability Assessment and Recommendation System for Educational Institutions.

Inspired by IBM SkillsBuild and 1M1B AI for Sustainability Internship learnings.

## SDG Alignment

| SDG | Focus |
|-----|-------|
| **SDG 11** (Primary) | Sustainable Cities and Communities |
| **SDG 12** (Secondary) | Responsible Consumption and Production |
| **SDG 13** (Secondary) | Climate Action |

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, TypeScript, Tailwind CSS, Recharts |
| Backend | Python, FastAPI |
| Database | Supabase (PostgreSQL) |
| AI | Prompt Engineering, IBM Granite Models (concepts), Entity Extraction, Summarization |

## Project Structure

```
CampusGreenAI/
├── frontend/          # React + Vite SPA
├── backend/           # FastAPI scoring & recommendation API
├── database/          # Supabase SQL schema
├── docs/              # Architecture, API, scoring docs
├── screenshots/       # Demo screenshots for submissions
└── README.md
```

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### Database

1. Create a Supabase project at https://supabase.com
2. Run `database/schema.sql` in the SQL Editor
3. Copy project URL and anon key to `.env` (optional persistence layer)

## Features

1. **Landing Page** — Hero, about, SDGs, tech stack, CTA
2. **Assessment Module** — 20 questions across 5 categories (Yes / Partially / No)
3. **CampusGreen Score Engine** — Weighted scoring with grade classification
4. **AI Recommendation Engine** — Prompt-engineered recommendations (Granite-ready)
5. **Dashboard** — Growth Ring gauge, progress bars, Recharts pie & bar charts, SDG mapping
6. **Responsible AI** — Fairness, transparency, ethics, privacy commitments

## Scoring

| Answer | Points |
|--------|--------|
| Yes | 5 |
| Partially | 3 |
| No | 0 |

| Category | Weight |
|----------|--------|
| Energy Management | 25% |
| Waste Management | 25% |
| Water Conservation | 20% |
| Transportation | 15% |
| Awareness & Initiatives | 15% |

| Grade | Score Range |
|-------|-------------|
| Excellent | 85–100 |
| Good | 70–84 |
| Average | 50–69 |
| Needs Improvement | 30–49 |
| Critical | 0–29 |

## Future Enhancements

- RAG-based document analysis (NAAC reports, energy audits)
- Agentic AI monitoring workflows
- Multimodal AI (image analysis for waste, green cover)
- Entity extraction and summarization from reports
- Campus benchmarking across institutions
- Predictive sustainability analytics

## License

MIT — suitable for internship submissions, hackathons, research, and startup development.
