"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("flex flex-wrap items-center gap-2 text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Aba em formato de "chip" (pílula), com área de toque mínima de 44px. */
function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 text-sm font-medium text-primary outline-none transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("outline-none focus-visible:ring-3 focus-visible:ring-ring/50", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
