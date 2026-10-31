import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

/** The whole row is the label, so the touch target stays large. */
export function Checkbox({ label, description, className, ...props }: CheckboxProps) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3 py-2", className)}>
      <input type="checkbox" className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand-600" {...props} />
      <span className="flex flex-col">
        <span className="text-body text-neutral-950">{label}</span>
        {description && <span className="text-caption text-muted-foreground">{description}</span>}
      </span>
    </label>
  );
}
