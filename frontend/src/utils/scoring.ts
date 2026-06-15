import { CATEGORIES, QUESTIONS, AnswerValue, ANSWER_OPTIONS, CategoryId } from "../data/questions";

export interface CategoryResult {
  id: CategoryId;
  label: string;
  weight: number;
  rawScore: number;
  maxScore: number;
  percentage: number;
}

export interface AssessmentResult {
  categories: CategoryResult[];
  overallScore: number;
  grade: string;
  gradeDescription: string;
}

const POINTS: Record<AnswerValue, number> = ANSWER_OPTIONS.reduce(
  (acc, opt) => ({ ...acc, [opt.value]: opt.points }),
  {} as Record<AnswerValue, number>
);

export function gradeFromScore(score: number): { grade: string; description: string } {
  if (score >= 85) return { grade: "Excellent", description: "Outstanding sustainability practices across campus." };
  if (score >= 70) return { grade: "Good", description: "Strong foundations with room to refine key areas." };
  if (score >= 50) return { grade: "Average", description: "Core practices exist but need consistent strengthening." };
  if (score >= 30) return { grade: "Needs Improvement", description: "Significant gaps require prioritized action." };
  return { grade: "Critical", description: "Urgent, campus-wide intervention is recommended." };
}

export function computeAssessment(answers: Record<string, AnswerValue>): AssessmentResult {
  const categories: CategoryResult[] = CATEGORIES.map((cat) => {
    const questions = QUESTIONS.filter((q) => q.category === cat.id);
    const maxScore = questions.length * 5;
    const rawScore = questions.reduce((sum, q) => {
      const answer = answers[q.id];
      return sum + (answer ? POINTS[answer] : 0);
    }, 0);
    const percentage = maxScore === 0 ? 0 : Math.round((rawScore / maxScore) * 100);
    return {
      id: cat.id,
      label: cat.label,
      weight: cat.weight,
      rawScore,
      maxScore,
      percentage,
    };
  });

  const overallScore = Math.round(
    categories.reduce((sum, cat) => sum + (cat.percentage * cat.weight) / 100, 0)
  );

  const { grade, description } = gradeFromScore(overallScore);

  return { categories, overallScore, grade, gradeDescription: description };
}
