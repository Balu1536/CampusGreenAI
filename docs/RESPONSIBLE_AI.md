# Responsible AI

CampusGreen AI follows IBM SkillsBuild and 1M1B internship principles for trustworthy AI.

## Fairness

Recommendations apply equally to all institutions. Scoring weights and grade thresholds are fixed and published. No bias based on institution size, geography, or affiliation.

## Transparency

- Scoring formula is deterministic and documented in `docs/SCORING.md`
- Dashboard shows full category breakdown with raw points
- AI prompts are logged in the backend for auditability
- Grade bands are publicly defined

## Ethics

- Recommendations focus on safe, practical campus sustainability actions
- No greenwashing or misleading claims
- Prompt engineering includes guardrails against harmful suggestions
- Human review encouraged before institutional policy adoption

## Privacy

- No personal data collection (names, emails, student IDs)
- Optional institution name for report labeling only
- Database schema designed for data minimization
- Row Level Security enabled in Supabase schema

## IBM Granite Integration

When connected to IBM Granite via watsonx:

1. Structured prompts include score context and SDG alignment
2. Responses filtered through the rule-based library as validation
3. Fallback to curated recommendations when API is unavailable
