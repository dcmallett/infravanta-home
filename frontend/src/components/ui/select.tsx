import { useId } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  error?: string;
}

export function Select({ label, options, placeholder, helperText, error, id, className, ...props }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-label text-neutral-900">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(helperText && helperId, error && errorId) || undefined}
          className={cn(
            "h-11 w-full appearance-none rounded-md border border-input bg-card pr-10 pl-3 text-body-lg text-foreground transition-colors duration-150 focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 md:text-body",
            error && "border-danger",
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-neutral-600"
          aria-hidden="true"
        />
      </div>
      {helperText && !error && (
        <p id={helperId} className="text-caption text-muted-foreground">
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-caption text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
