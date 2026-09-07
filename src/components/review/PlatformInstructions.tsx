import type { Platform } from "@/config/platforms";

export function PlatformInstructions({ platform }: { platform: Platform }) {
  if (!platform.instructions?.length) return null;

  return (
    <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
      {platform.instructions.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
  );
}
