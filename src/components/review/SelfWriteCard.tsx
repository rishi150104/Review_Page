import { PlatformReviewButton } from "./PlatformReviewButton";
import { PlatformInstructions } from "./PlatformInstructions";
import type { Platform } from "@/config/platforms";

interface SelfWriteCardProps {
  platform: Platform;
  onOpened: () => void;
  disabled?: boolean;
  disabledReason?: string;
}

export function SelfWriteCard({
  platform,
  onOpened,
  disabled = false,
  disabledReason = "Add your name and email above (step 1) to continue.",
}: SelfWriteCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <h2 className="font-display text-xl tracking-tight sm:text-2xl">
        Ready to share your feedback?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Click below to open our profile on {platform.displayName} and leave your review.
      </p>
      <PlatformInstructions platform={platform} />
      <PlatformReviewButton
        platform={platform}
        onOpened={onOpened}
        disabled={disabled}
        className="mt-6 h-12 w-full sm:w-auto"
      />
      {disabled && <p className="mt-3 text-sm text-muted-foreground">{disabledReason}</p>}
    </section>
  );
}
