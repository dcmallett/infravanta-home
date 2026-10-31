import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type EmptyStateTone = "brand" | "success" | "danger";

const toneClasses: Record<EmptyStateTone, string> = {
  brand: "bg-brand-50 text-brand-700",
  success: "bg-success-background text-success",
  danger: "bg-danger-background text-danger",
};

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  tone?: EmptyStateTone;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, tone = "brand", className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center px-4 py-10 text-center", className)}>
      <span className={cn("mb-4 flex size-12 items-center justify-center rounded-full", toneClasses[tone])}>
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="text-card-title text-neutral-950">{title}</h3>
      <p className="mt-1 max-w-sm text-body text-muted-foreground">{description}</p>
      {action && <div className="mt-5 flex flex-col gap-3 sm:flex-row">{action}</div>}
    </div>
  );
}
