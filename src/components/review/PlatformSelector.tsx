import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { activePlatforms, categoryOrder, type Platform } from "@/config/platforms";

interface PlatformSelectorProps {
  value: string | null;
  onChange: (id: string) => void;
  onContinue: () => void;
}

export function PlatformSelector({ value, onChange, onContinue }: PlatformSelectorProps) {
  const grouped = useMemo(() => {
    const list = activePlatforms();
    return categoryOrder
      .map((category) => ({
        category,
        items: list.filter((p: Platform) => p.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, []);

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <h2 className="font-display text-xl tracking-tight sm:text-2xl">
        Where would you like to leave your review?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Pick the platform you prefer. We&apos;ll take you straight there when you&apos;re ready.
      </p>

      <div className="mt-6 space-y-2">
        <Label htmlFor="platform-select">Review platform</Label>
        <Select value={value ?? ""} onValueChange={onChange}>
          <SelectTrigger id="platform-select" className="h-12 w-full text-base">
            <SelectValue placeholder="Select a platform" />
          </SelectTrigger>
          <SelectContent>
            {grouped.map((group) => (
              <SelectGroup key={group.category}>
                <SelectLabel>{group.category}</SelectLabel>
                {group.items.map((platform) => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.displayName}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        size="lg"
        className="mt-6 h-12 w-full text-base sm:w-auto sm:px-10"
        disabled={!value}
        onClick={onContinue}
      >
        Continue
      </Button>
    </section>
  );
}
