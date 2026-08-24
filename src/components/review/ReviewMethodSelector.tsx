import { PenLine, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReviewMethod = "assisted" | "self";

interface ReviewMethodSelectorProps {
  value: ReviewMethod | null;
  onChange: (method: ReviewMethod) => void;
}

const options = [
  {
    id: "assisted" as const,
    title: "Write a review for me",
    description:
      "Answer a few quick questions about your experience and we'll help turn your answers into a polished review.",
    Icon: Sparkles,
  },
  {
    id: "self" as const,
    title: "I'll write my own review",
    description: "I already know what I want to say. Take me directly to the review page.",
    Icon: PenLine,
  },
];

export function ReviewMethodSelector({ value, onChange }: ReviewMethodSelectorProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <h2 className="font-display text-xl tracking-tight sm:text-2xl">
        How would you like to write your review?
      </h2>

      <div
        role="radiogroup"
        aria-label="Review method"
        className="mt-6 grid gap-4 sm:grid-cols-2"
      >
        {options.map(({ id, title, description, Icon }) => {
          const selected = value === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(id)}
              className={cn(
                "group flex h-full flex-col items-start rounded-xl border p-5 text-left transition-colors",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                selected
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:border-primary/40 hover:bg-surface",
              )}
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg transition-colors",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface text-muted-foreground group-hover:text-primary",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="mt-4 text-base font-semibold">{title}</span>
              <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
