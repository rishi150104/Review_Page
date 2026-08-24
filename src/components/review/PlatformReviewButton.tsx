import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Platform } from "@/config/platforms";

interface PlatformReviewButtonProps {
  platform: Platform;
  onOpened?: () => void;
  variant?: "default" | "outline";
  className?: string;
}

export function PlatformReviewButton({
  platform,
  onOpened,
  variant = "default",
  className,
}: PlatformReviewButtonProps) {
  return (
    <Button asChild size="lg" variant={variant} className={className}>
      <a
        href={platform.reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onOpened?.()}
      >
        Leave Review on {platform.name}
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}
