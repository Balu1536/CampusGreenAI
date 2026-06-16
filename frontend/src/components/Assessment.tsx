import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { ANSWER_OPTIONS, CATEGORIES, QUESTIONS, AnswerValue } from "../data/questions";

interface AssessmentProps {
  answers: Record<string, AnswerValue>;
  onAnswersChange: (answers: Record<string, AnswerValue>) => void;
  onComplete: () => void;
}

export default function Assessment({ answers, onAnswersChange, onComplete, onNavigate }: AssessmentProps) {
  const [step, setStep] = useState(0);

  const grouped = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        ...cat,
        questions: QUESTIONS.filter((q) => q.category === cat.id),
      })),
    []
  );

  const currentGroup = grouped[step];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);
  const groupComplete = currentGroup.questions.every((q) => answers[q.id]);

  const setAnswer = (questionId: string, value: AnswerValue) => {
    onAnswersChange({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (step < grouped.length - 1) {
      setStep(step + 1);
    } else if (answeredCount === QUESTIONS.length) {
      onComplete();
      onNavigate("dashboard");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8 animate-rise">
        <p className="text-sm font-mono text-sprout uppercase tracking-widest">Sustainability Assessment</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mt-2">20 questions, five categories</h1>
        <p className="text-mist/65 mt-2">
          Answer Yes, Partially, or No for each practice. Scoring: Yes = 5, Partially = 3, No = 0.
        </p>
      </div>

      <div className="glass p-4 mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-mist/70">{answeredCount} of {QUESTIONS.length} answered</span>
          <span className="font-mono text-sprout">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-moss to-sprout transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {grouped.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setStep(i)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                i === step
                  ? "bg-sprout/20 text-sprout border border-sprout/40"
                  : g.questions.every((q) => answers[q.id])
                    ? "bg-white/10 text-mist/80 border border-white/10"
                    : "text-mist/50 border border-transparent hover:bg-white/5"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass p-6 sm:p-8 animate-rise">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-mono text-mist/50">
              Category {step + 1} of {grouped.length}
            </p>
            <h2 className="font-display font-semibold text-xl mt-1">{currentGroup.label}</h2>
            <p className="text-sm text-mist/60 mt-1">{currentGroup.description}</p>
          </div>
          <span className="font-mono text-sprout text-lg">{currentGroup.weight}%</span>
        </div>

        <div className="space-y-6">
          {currentGroup.questions.map((question, qi) => (
            <div key={question.id} className="rounded-xl2 border border-white/10 bg-white/5 p-5">
              <p className="font-medium leading-relaxed">
                <span className="text-mist/50 font-mono text-sm mr-2">{qi + 1}.</span>
                {question.text}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ANSWER_OPTIONS.map((opt) => {
                  const selected = answers[question.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setAnswer(question.id, opt.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selected
                          ? "bg-sprout text-canopy shadow-lg shadow-sprout/20"
                          : "border border-white/15 text-mist/70 hover:bg-white/5 hover:text-mist"
                      }`}
                    >
                      {opt.label}
                      <span className="ml-1.5 text-xs opacity-70">({opt.points} pts)</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm text-mist/70 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} /> Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!groupComplete}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-sprout text-canopy font-semibold text-sm hover:bg-mist transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === grouped.length - 1 ? (
              <>
                View Dashboard <CheckCircle2 size={18} />
              </>
            ) : (
              <>
                Next Category <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>

      {answeredCount === QUESTIONS.length && (
        <div className="mt-6 text-center">
          <button
            onClick={onComplete}
            className="inline-flex items-center gap-2 text-sprout hover:text-mist transition-colors text-sm font-medium"
          >
            Skip to Dashboard <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
