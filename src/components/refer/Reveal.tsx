import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "./useReveal";

/** Wraps block-level content that should fade/slide in once scrolled into view. */
export function Reveal({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, revealClass } = useReveal<HTMLDivElement>();
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={className ? `${revealClass} ${className}` : revealClass}
      style={style}
    >
      {children}
    </div>
  );
}
