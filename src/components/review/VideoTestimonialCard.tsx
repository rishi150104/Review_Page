import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface VideoTestimonialCardProps {
  disabled?: boolean;
  disabledReason?: string;
}

const SUBMISSION_EMAIL = "prince@viralchilly.com";

export function VideoTestimonialCard({
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

      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="mt-6 h-12 w-full sm:w-auto" disabled={disabled}>
            <Video className="size-4" aria-hidden="true" />
            Submit Video Testimonial
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit your video testimonial</DialogTitle>
            <DialogDescription>
              Please email your video to{" "}
              <a href={`mailto:${SUBMISSION_EMAIL}`} className="font-medium text-foreground underline">
                {SUBMISSION_EMAIL}
              </a>
              .
            </DialogDescription>
          </DialogHeader>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>50–60 seconds, in portrait format.</li>
            <li>A simple phone video is perfect — selfie or regular camera, with no editing needed.</li>
            <li>If possible, choose a quiet place so we can hear you clearly.</li>
            <li>
              Tell us about your experience, what we did, and the results you saw. And if
              you&apos;d recommend Prince / ViralChilly to others.
            </li>
          </ul>
        </DialogContent>
      </Dialog>

      {disabled && <p className="mt-3 text-sm text-muted-foreground">{disabledReason}</p>}
    </section>
  );
}
