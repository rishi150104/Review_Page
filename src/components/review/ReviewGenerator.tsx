import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReviewLoading() {
  return (
    <section className="rounded-2xl border border-border bg-card p-10 text-center shadow-card">
      <Loader2 className="mx-auto size-7 animate-spin text-primary" aria-hidden="true" />
      <p className="mt-5 text-base font-semibold" role="status">
        Creating your review...
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Turning your answers into a natural, polished review.
      </p>
    </section>
  );
}

export function ReviewError({ onRetry, message }: { onRetry: () => void; message?: string }) {
  return (
    <section
      className="rounded-2xl border border-destructive/30 bg-card p-8 text-center shadow-card"
      role="alert"
    >
      <p className="text-base font-semibold">
        {message || "We couldn't generate your review right now. Please try again."}
      </p>
      <Button type="button" size="lg" className="mt-6 h-12" onClick={onRetry}>
        <RefreshCw className="size-4" aria-hidden="true" />
        Try Again
      </Button>
    </section>
  );
}
