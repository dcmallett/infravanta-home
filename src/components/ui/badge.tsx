import { cn } from "@/lib/utils";

export type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "info" | "ai";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-muted text-neutral-800",
  success: "bg-success-background text-success",
  warning: "bg-warning-background text-warning",
  danger: "bg-danger-background text-danger",
  info: "bg-info-background text-info",
  ai: "bg-ai-background text-ai",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/** Always pass a text label — colour alone must never carry the meaning. */
export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-sm px-2 text-caption font-medium whitespace-nowrap [&_svg]:size-3.5",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
