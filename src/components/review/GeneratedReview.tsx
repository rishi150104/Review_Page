import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatformReviewButton } from "./PlatformReviewButton";
import type { Platform } from "@/config/platforms";

interface GeneratedReviewProps {
  platform: Platform;
  review: string;
  onReviewChange: (value: string) => void;
  onOpened: () => void;
}

export function GeneratedReview({
  platform,
  review,
  onReviewChange,
  onOpened,
}: GeneratedReviewProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(review);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <h2 className="font-display text-xl tracking-tight sm:text-2xl">Your Review</h2>
      <p className="mt-1 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
        Draft generated from your answers
      </p>

      <label htmlFor="generated-review" className="sr-only">
        Generated review text
      </label>
      <textarea
        id="generated-review"
        value={review}
        onChange={(e) => onReviewChange(e.target.value)}
        rows={10}
        className="mt-5 w-full resize-y rounded-xl border border-border bg-surface p-5 text-base leading-relaxed text-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
      />

      <p className="mt-3 text-sm text-muted-foreground">
        Feel free to edit the review before posting so it accurately reflects your experience.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="h-12"
          onClick={handleCopy}
          aria-live="polite"
        >
          {copied ? (
            <>
              <Check className="size-4 text-success" aria-hidden="true" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-4" aria-hidden="true" />
              Copy Review
            </>
          )}
        </Button>
        <PlatformReviewButton platform={platform} onOpened={onOpened} className="h-12" />
      </div>
    </section>
  );
}
