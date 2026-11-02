import { cn } from "@/lib/utils";

/**
 * Desenhos "feitos à mão" (traço único, sem preenchimento), inspirados na
 * biblioteca `components/decor/drawings.ts` do blog do grupo (DEA-blog).
 * A cor vem de `currentColor`, então use classes `text-dea-*`.
 */
const drawings = {
  coracao: {
    viewBox: "0 0 48 44",
    body: "M24 40C11 31 5 24 5 16c0-6 4.5-10 9.6-10 4.4 0 7.6 2.7 9.4 6.3 1.8-3.6 5-6.3 9.4-6.3C38.5 6 43 10 43 16c0 8-6 15-19 24z",
  },
  sublinhado: {
    viewBox: "0 0 300 18",
    body: "M3 11c38-7 78-8 118-3s92 6 176-5M30 15c50-4 110-4 200-6",
  },
  brilhinhos: {
    viewBox: "0 0 48 48",
    body: "M19 6c1 9 3.6 13 15 15-11.4 2-14 6-15 15-1-9-3.6-13-15-15 11.4-2 14-6 15-15zM38 28c.5 4 1.6 5.6 7 6.5-5.4 1-6.5 2.5-7 6.5-.5-4-1.6-5.5-7-6.5 5.4-.9 6.5-2.5 7-6.5z",
  },
  onda: { viewBox: "0 0 96 12", body: "M2 6c8-6 16-6 23 0s15 6 23 0 15-6 23 0 15 6 23 0" },
} as const;

export type HandDrawingName = keyof typeof drawings;

interface HandDrawingProps {
  name: HandDrawingName;
  className?: string;
  strokeWidth?: number;
}

export function HandDrawing({ name, className, strokeWidth = 2.6 }: HandDrawingProps) {
  const drawing = drawings[name];
  return (
    <svg
      viewBox={drawing.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio={name === "onda" || name === "sublinhado" ? "none" : undefined}
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", className)}
    >
      <path d={drawing.body} />
    </svg>
  );
}
