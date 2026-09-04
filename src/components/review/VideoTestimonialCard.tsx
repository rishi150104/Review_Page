import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logSubmission } from "@/lib/log-submission";

interface VideoTestimonialCardProps {
  name: string;
  email: string;
  platformId: string;
  reward: string;
  disabled?: boolean;
  disabledReason?: string;
  onOpened?: () => void;
}

const SUBMISSION_EMAIL = "prince@viralchilly.com";

export function VideoTestimonialCard({
  name,
  email,
  platformId,
  reward,
  disabled = false,
  disabledReason = "Add your name and email above (step 1) to continue.",
  onOpened,
}: VideoTestimonialCardProps) {
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showShare) return;
    const target = shareRef.current;
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, left: 0, behavior: "smooth" });
  }, [showShare]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
        <h2 className="font-display text-xl tracking-tight sm:text-2xl">Instructions</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Record a short video sharing your experience and send it our way.
        </p>

        <div className="mt-5 rounded-xl border border-border bg-surface p-5">
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>50–60 seconds, in portrait format.</li>
            <li>A simple phone video is perfect — selfie or regular camera, with no editing needed.</li>
            <li>If possible, choose a quiet place so we can hear you clearly.</li>
            <li>
              Tell us about your experience, what we did, and the results you saw. And if
              you&apos;d recommend Prince / ViralChilly to others.
            </li>
          </ul>
        </div>

        {!showShare && (
          <Button
            size="lg"
            className="mt-6 h-12 w-full sm:w-auto"
            disabled={disabled}
            onClick={() => {
              logSubmission({ name, email, platform: platformId, reward, method: "video" });
              setShowShare(true);
            }}
          >
            Next
          </Button>
        )}

        {disabled && !showShare && (
          <p className="mt-3 text-sm text-muted-foreground">{disabledReason}</p>
        )}
      </section>

      {showShare && (
        <section
          ref={shareRef}
          className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <h2 className="font-display text-xl tracking-tight sm:text-2xl">Share your video</h2>
          <div className="mt-5 rounded-xl border border-border bg-surface p-5">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              Please share your video with{" "}
              <a href={`mailto:${SUBMISSION_EMAIL}`} className="font-semibold text-primary underline">
                {SUBMISSION_EMAIL}
              </a>
            </p>
          </div>
          <Button size="lg" className="mt-6 h-12 w-full sm:w-auto" onClick={() => onOpened?.()}>
            Submit
          </Button>
        </section>
      )}
    </div>
  );
}
