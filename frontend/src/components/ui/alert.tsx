import { CircleAlert, CircleCheck, Info, Sparkles, TriangleAlert, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AlertVariant = "info" | "success" | "warning" | "danger" | "ai";

const variants: Record<AlertVariant, { className: string; icon: LucideIcon }> = {
  info: { className: "bg-info-background [&>svg]:text-info", icon: Info },
  success: { className: "bg-success-background [&>svg]:text-success", icon: CircleCheck },
  warning: { className: "bg-warning-background [&>svg]:text-warning", icon: TriangleAlert },
  danger: { className: "bg-danger-background [&>svg]:text-danger", icon: CircleAlert },
  ai: { className: "bg-ai-background [&>svg]:text-ai", icon: Sparkles },
};

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ variant = "info", title, children, className }: AlertProps) {
  const { className: variantClass, icon: Icon } = variants[variant];
  return (
    <div
      role={variant === "danger" ? "alert" : undefined}
      className={cn("flex gap-3 rounded-lg px-4 py-3 text-body", variantClass, className)}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 text-neutral-800">
        {title && <p className="font-semibold text-neutral-950">{title}</p>}
        {children}
      </div>
    </div>
  );
}
