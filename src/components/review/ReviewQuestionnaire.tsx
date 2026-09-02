import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { ReviewAnswers } from "@/lib/review-api";

export const emptyAnswers: ReviewAnswers = {
  name: "",
  email: "",
  service: "",
  goal: "",
  experience: "",
  likedMost: "",
  results: "",
};

type AnswerKey = keyof Omit<ReviewAnswers, "name" | "email">;

interface QuestionDef {
  key: AnswerKey;
  label: string;
  placeholder: string;
  helper?: string;
  multiline: boolean;
}

const questions: QuestionDef[] = [
  {
    key: "service",
    label: "What service did you work with us for?",
    placeholder: "Example: SEO, link building, web development, digital marketing",
    multiline: false,
  },
  {
    key: "goal",
    label: "What was the main goal or challenge you wanted us to help with?",
    placeholder: "Tell us what you were trying to solve.",
    multiline: true,
  },
  {
    key: "experience",
    label: "How would you describe your experience working with our team?",
    placeholder: "Communication, process, responsiveness — whatever stood out.",
    multiline: true,
  },
  {
    key: "likedMost",
    label: "What did you like most about working with us?",
    placeholder: "Anything that genuinely worked well for you.",
    multiline: true,
  },
  {
    key: "results",
    label: "What results, improvements, or outcomes did you experience?",
    placeholder: "Only what actually happened — no need to embellish.",
    helper: "Please share only results or experiences that are true to your experience.",
    multiline: true,
  },
];

interface QuestionStepProps {
  question: QuestionDef;
  value: string;
  onChange: (value: string) => void;
}

function QuestionStep({ question, value, onChange }: QuestionStepProps) {
  const id = `question-${question.key}`;
  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-base leading-snug font-medium">
        {question.label}
      </Label>
      {question.multiline ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={6}
          className="resize-y text-base"
          aria-describedby={question.helper ? `${id}-helper` : undefined}
        />
      ) : (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className="h-12 text-base"
        />
      )}
      <p id={`${id}-helper`} className="text-sm text-muted-foreground">
        {question.helper ?? "Optional — skip anything that doesn't apply to you."}
      </p>
    </div>
  );
}

interface ReviewQuestionnaireProps {
  answers: ReviewAnswers;
  onAnswersChange: (answers: ReviewAnswers) => void;
  onSubmit: () => void;
  onBackToStart: () => void;
  /** False when the name/email fields or the reward above haven't been filled in yet. */
  canSubmit: boolean;
  canSubmitReason: string;
}

export function ReviewQuestionnaire({
  answers,
  onAnswersChange,
  onSubmit,
  onBackToStart,
  canSubmit,
  canSubmitReason,
}: ReviewQuestionnaireProps) {
  const [step, setStep] = useState(0);
  const total = questions.length;
  const question = questions[step]!;
  const isLast = step === total - 1;

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          Step {step + 1} of {total}
        </p>
        <p className="text-xs text-muted-foreground">All questions are optional</p>
      </div>

      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step + 1}
        aria-label="Questionnaire progress"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <div className="mt-8">
        <QuestionStep
          key={question.key}
          question={question}
          value={answers[question.key]}
          onChange={(value) => onAnswersChange({ ...answers, [question.key]: value })}
        />
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-12"
          onClick={() => (step === 0 ? onBackToStart() : setStep((s) => s - 1))}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </Button>
        <Button
          type="button"
          size="lg"
          className="h-12 sm:px-8"
          disabled={isLast && !canSubmit}
          onClick={() => (isLast ? onSubmit() : setStep((s) => s + 1))}
        >
          {isLast ? (
            <>
              <Sparkles className="size-4" aria-hidden="true" />
              Generate My Review
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
      {isLast && !canSubmit && (
        <p className="mt-3 text-right text-sm text-muted-foreground">{canSubmitReason}</p>
      )}
    </section>
  );
}
