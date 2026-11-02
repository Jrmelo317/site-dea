import { cn } from "@/lib/utils";

/** Fita adesiva (washi tape) decorativa, usando `.tape-strip` do globals.css. */
export function WashiTape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("tape-strip pointer-events-none absolute z-10 h-6 w-20", className)}
    />
  );
}
