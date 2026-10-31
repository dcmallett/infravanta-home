import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  legend: string;
  name: string;
  options: RadioOption[];
  defaultValue?: string;
  helperText?: string;
  /** Lay options out in columns from the sm breakpoint */
  columns?: 1 | 2 | 3;
}

const columnClasses = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" };

export function RadioGroup({ legend, name, options, defaultValue, helperText, columns = 1 }: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-label text-neutral-900">{legend}</legend>
      {helperText && <p className="mb-2 text-caption text-muted-foreground">{helperText}</p>}
      <div className={cn("grid grid-cols-1 gap-2", columnClasses[columns])}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex min-h-11 cursor-pointer items-start gap-3 rounded-md border border-input bg-card px-3 py-2.5 transition-colors duration-150 hover:bg-neutral-50 has-checked:border-brand-500 has-checked:bg-brand-50"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={option.value === defaultValue}
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-brand-600"
            />
            <span className="flex flex-col">
              <span className="text-body text-neutral-950">{option.label}</span>
              {option.description && <span className="text-caption text-muted-foreground">{option.description}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
