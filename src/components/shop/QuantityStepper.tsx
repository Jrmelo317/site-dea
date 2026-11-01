"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAX_QUANTITY } from "@/hooks/useCart";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export function QuantityStepper({ value, onChange, label }: QuantityStepperProps) {
  return (
    <fieldset className="flex items-center gap-1">
      <legend className="sr-only">{label}</legend>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Diminuir quantidade"
      >
        <Minus aria-hidden="true" />
      </Button>
      <output aria-live="polite" className="min-w-8 text-center font-semibold tabular-nums">
        {value}
      </output>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY}
        aria-label="Aumentar quantidade"
      >
        <Plus aria-hidden="true" />
      </Button>
    </fieldset>
  );
}
