import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Platform } from "@/config/platforms";

interface PlatformReviewButtonProps {
  platform: Platform;
  onOpened?: () => void;
  variant?: "default" | "outline";
  className?: string;
  disabled?: boolean;
}

export function PlatformReviewButton({
  platform,
  onOpened,
  variant = "default",
  className,
  disabled,
}: PlatformReviewButtonProps) {
  const label =
    platform.id === "video-testimonial" ? `Leave ${platform.name}` : `Leave Review on ${platform.name}`;

  if (disabled) {
    return (
      <Button size="lg" variant={variant} className={className} disabled>
        {label}
        <ExternalLink className="size-4" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button asChild size="lg" variant={variant} className={className}>
      <a
        href={platform.reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onOpened?.()}
      >
        {label}
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}
