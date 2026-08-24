import { PlatformReviewButton } from "./PlatformReviewButton";
import type { Platform } from "@/config/platforms";

interface SelfWriteCardProps {
  platform: Platform;
  onOpened: () => void;
}

export function SelfWriteCard({ platform, onOpened }: SelfWriteCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <h2 className="font-display text-xl tracking-tight sm:text-2xl">
        Ready to share your feedback?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Click below to open our profile on {platform.displayName} and leave your review.
      </p>
      <PlatformReviewButton
        platform={platform}
        onOpened={onOpened}
        className="mt-6 h-12 w-full sm:w-auto"
      />
    </section>
  );
}
