import { Badge, type BadgeVariant } from "@/components/ui/badge";
import type { BillStatus } from "@/types/bill";

const statusConfig: Record<BillStatus, { label: string; variant: BadgeVariant }> = {
  paid: { label: "Paid", variant: "success" },
  "due-soon": { label: "Due soon", variant: "warning" },
  "needs-review": { label: "Needs review", variant: "info" },
  processing: { label: "Processing", variant: "neutral" },
};

export function BillStatusBadge({ status }: { status: BillStatus }) {
  const { label, variant } = statusConfig[status];
  return <Badge variant={variant}>{label}</Badge>;
}
