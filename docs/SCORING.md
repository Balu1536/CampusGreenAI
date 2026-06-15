# Scoring Engine

## Per-Question Scoring

| Answer | Points |
|--------|--------|
| Yes | 5 |
| Partially | 3 |
| No | 0 |

Each category has 4 questions (max 20 points per category).

## Category Percentage

```
category_percentage = (raw_score / max_score) × 100
```

Where `max_score = number_of_questions × 5`.

## Overall CampusGreen Score

Weighted average across categories:

```
overall = Σ (category_percentage × category_weight) / 100
```

| Category | Weight |
|----------|--------|
| Energy Management | 25% |
| Waste Management | 25% |
| Water Conservation | 20% |
| Transportation | 15% |
| Awareness & Initiatives | 15% |

## Grade Classification

| Grade | Range |
|-------|-------|
| Excellent | 85–100 |
| Good | 70–84 |
| Average | 50–69 |
| Needs Improvement | 30–49 |
| Critical | 0–29 |

## Example

If Energy = 80%, Waste = 60%, Water = 70%, Transportation = 50%, Awareness = 90%:

```
overall = (80×25 + 60×25 + 70×20 + 50×15 + 90×15) / 100
        = (2000 + 1500 + 1400 + 750 + 1350) / 100
        = 70
```

Grade: **Good**

## Recommendation Priority

| Category Score | Priority |
|----------------|----------|
| < 50% | High |
| 50–74% | Medium |
| ≥ 75% | Low (maintain) |
