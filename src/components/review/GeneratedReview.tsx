import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Platform } from "@/config/platforms";

const FEEDBACK_EMAIL = "feedback@viralchilly.com";

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
  const [showScreenshotPrompt, setShowScreenshotPrompt] = useState(false);

  // Fires once, right when a freshly generated review mounts this component.
  useEffect(() => {
    setShowScreenshotPrompt(true);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopyAndOpen = async () => {
    try {
      await navigator.clipboard.writeText(review);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    onOpened();
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

      <Button asChild size="lg" className="mt-6 h-12">
        <a
          href={platform.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCopyAndOpen}
        >
          {copied ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              Copied — opening {platform.name}...
            </>
          ) : (
            <>
              <Copy className="size-4" aria-hidden="true" />
              Copy &amp; Leave Review on {platform.name}
              <ExternalLink className="size-4" aria-hidden="true" />
            </>
          )}
        </a>
      </Button>

      <Dialog open={showScreenshotPrompt} onOpenChange={setShowScreenshotPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your review is ready</DialogTitle>
            <DialogDescription>
              Please take a screenshot of this and send it to{" "}
              <a href={`mailto:${FEEDBACK_EMAIL}`} className="font-medium text-primary">
                {FEEDBACK_EMAIL}
              </a>
              .
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed whitespace-pre-wrap text-foreground">
            {review}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
