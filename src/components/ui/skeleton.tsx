import type * as React from "react";
import { cn } from "@/lib/utils";

/** Bloco de carregamento no padrão shadcn/ui. Decorativo: quem anuncia o carregamento é o container. */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-dea-sand motion-reduce:animate-none", className)}
      {...props}
    />
  );
}

export { Skeleton };
