import { PenLine, Sparkles } from "lucide-react";

export type ReviewMethod = "assisted" | "self";

interface ReviewMethodSelectorProps {
  value: ReviewMethod | null;
  onChange: (method: ReviewMethod) => void;
  disabled?: boolean;
}

const options = [
  {
    id: "assisted" as const,
    title: "Write it for me",
    description:
      "Answer a few quick questions and we'll turn your answers into a polished draft you approve.",
    Icon: Sparkles,
    recommended: true,
  },
  {
    id: "self" as const,
    title: "I'll write my own",
    description:
      "You already know what you want to say. We'll take you straight to the review page.",
    Icon: PenLine,
    recommended: false,
  },
];

export function ReviewMethodSelector({ value, onChange, disabled }: ReviewMethodSelectorProps) {
  return (
    <div className="modes" role="radiogroup" aria-label="Review method" aria-disabled={disabled}>
      {options.map(({ id, title, description, Icon, recommended }) => (
        <button
          key={id}
          type="button"
          className="mode"
          aria-pressed={value === id}
          disabled={disabled}
          onClick={() => onChange(id)}
        >
          <span className="ic">
            <Icon size={18} aria-hidden="true" />
          </span>
          <p className="nm">{title}</p>
          <p className="ds">{description}</p>
          {recommended && <span className="rec">Recommended · super easy</span>}
        </button>
      ))}
    </div>
  );
}
