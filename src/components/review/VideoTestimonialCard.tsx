import { Mail, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logSubmission } from "@/lib/log-submission";

interface VideoTestimonialCardProps {
  name: string;
  email: string;
  platformId: string;
  reward: string;
  disabled?: boolean;
  disabledReason?: string;
}

const SUBMISSION_EMAIL = "prince@viralchilly.com";

export function VideoTestimonialCard({
  name,
  email,
  platformId,
  reward,
  disabled = false,
  disabledReason = "Add your name and email above (step 1) to continue.",
}: VideoTestimonialCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <h2 className="font-display text-xl tracking-tight sm:text-2xl">
        Ready to record your testimonial?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Record a short video sharing your experience and send it our way.
      </p>

      <div className="mt-5 rounded-xl border border-border bg-surface p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Mail className="size-4 shrink-0" aria-hidden="true" />
          Email your video to{" "}
          <a href={`mailto:${SUBMISSION_EMAIL}`} className="font-semibold text-primary underline">
            {SUBMISSION_EMAIL}
          </a>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Click the address above to get directed to your mail app.
        </p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>50–60 seconds, in portrait format.</li>
          <li>A simple phone video is perfect — selfie or regular camera, with no editing needed.</li>
          <li>If possible, choose a quiet place so we can hear you clearly.</li>
          <li>
            Tell us about your experience, what we did, and the results you saw. And if
            you&apos;d recommend Prince / ViralChilly to others.
          </li>
        </ul>
      </div>

      <Button
        size="lg"
        className="mt-6 h-12 w-full sm:w-auto"
        disabled={disabled}
        onClick={() => logSubmission({ name, email, platform: platformId, reward, method: "video" })}
      >
        <Video className="size-4" aria-hidden="true" />
        Submit
      </Button>

      {disabled && <p className="mt-3 text-sm text-muted-foreground">{disabledReason}</p>}
    </section>
  );
}
