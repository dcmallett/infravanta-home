"use client";

import type { BillingPeriod } from "@/types/subscription";

const options: { value: BillingPeriod; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Yearly" },
];

interface BillingPeriodToggleProps {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}

/** Segmented control built from native radios, so keyboard support comes for free. */
export function BillingPeriodToggle({ value, onChange }: BillingPeriodToggleProps) {
  return (
    <fieldset>
      <legend className="sr-only">Billing period</legend>
      <div className="inline-flex rounded-md border border-border bg-muted p-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex h-10 cursor-pointer items-center rounded-sm px-4 text-label text-neutral-700 transition-colors duration-150 has-checked:bg-card has-checked:text-neutral-950 has-checked:shadow-card has-focus-visible:outline-2 has-focus-visible:outline-primary"
          >
            <input
              type="radio"
              name="billing-period"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
