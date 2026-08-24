import { CheckCircle2 } from "lucide-react";

export function SuccessMessage() {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border border-success/25 bg-success/5 p-5"
      role="status"
    >
      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-foreground">
        Thank you for taking the time to share your experience.
      </p>
    </div>
  );
}
