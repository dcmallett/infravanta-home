import { useId } from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  /** Keep the label for screen readers but hide it visually, e.g. a chat composer */
  hideLabel?: boolean;
  helperText?: string;
  error?: string;
}

export function Textarea({ label, hideLabel, helperText, error, id, className, ...props }: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className={cn("text-label text-neutral-900", hideLabel && "sr-only")}>
        {label}
      </label>
      <textarea
        id={textareaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(helperText && helperId, error && errorId) || undefined}
        className={cn(
          "min-h-24 rounded-md border border-input bg-card px-3 py-2.5 text-body-lg text-foreground transition-colors duration-150 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 md:text-body",
          error && "border-danger",
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
