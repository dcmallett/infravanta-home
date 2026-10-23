import { useId } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
}

/** Labelled text input. The label is required — placeholders are not labels. */
export function Input({ label, helperText, error, id, className, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-label text-neutral-900">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(helperText && helperId, error && errorId) || undefined}
        className={cn(
          "h-11 rounded-md border border-input bg-card px-3 text-body-lg text-foreground transition-colors duration-150 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 disabled:bg-muted md:text-body",
          error && "border-danger focus:border-danger",
          className,
        )}
        {...props}
      />
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
