import Link from "next/link";
import { Calculator, ChevronRight, CircleHelp, FileCheck, TrendingUp, type LucideIcon } from "lucide-react";

import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrencyRange } from "@/lib/formatting";
import type { EvidenceLevel, RecommendationPriority, SavingsRecommendation } from "@/types/savings";

export const priorityConfig: Record<RecommendationPriority, { label: string; variant: BadgeVariant }> = {
  "potential-saving": { label: "Potential saving", variant: "info" },
  "worth-checking": { label: "Worth checking", variant: "info" },
  "long-term": { label: "Long-term improvement", variant: "neutral" },
  "needs-info": { label: "Needs more information", variant: "warning" },
  "no-action": { label: "No action needed", variant: "success" },
};

const evidenceConfig: Record<EvidenceLevel, { label: string; icon: LucideIcon }> = {
  "based-on-bill": { label: "Based on your uploaded bill", icon: FileCheck },
  calculated: { label: "Calculated from your usage", icon: Calculator },
  estimated: { label: "Estimated from typical homes like yours", icon: TrendingUp },
  "more-info-needed": { label: "More information needed", icon: CircleHelp },
};

function Figure({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-caption text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-body font-semibold text-neutral-950 tabular-nums">{children}</dd>
    </div>
  );
}

function CalculationList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-label font-semibold text-neutral-950">{title}</h4>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-body text-neutral-800">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function RecommendationCard({ recommendation: rec }: { recommendation: SavingsRecommendation }) {
  const priority = priorityConfig[rec.priority];
  const evidence = evidenceConfig[rec.evidence];
  const EvidenceIcon = evidence.icon;

  return (
    <Card className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={priority.variant}>{priority.label}</Badge>
        <span className="text-caption text-muted-foreground">{rec.category}</span>
      </div>
      <h3 className="mt-3 text-card-title text-neutral-950">{rec.title}</h3>
      <p className="mt-1 text-body text-muted-foreground">{rec.reason}</p>

      <dl className="mt-4 grid grid-cols-1 gap-3 rounded-md bg-neutral-50 p-3 sm:grid-cols-3">
        <Figure label="Estimated yearly saving">
          {rec.annualSaving ? (
            formatCurrencyRange(rec.annualSaving.min, rec.annualSaving.max)
          ) : (
            <span className="font-normal text-neutral-700">{rec.annualSavingNote ?? "Not estimated yet"}</span>
          )}
        </Figure>
        {rec.oneOffCost && (
          <Figure label="Estimated cost">{formatCurrencyRange(rec.oneOffCost.min, rec.oneOffCost.max)}</Figure>
        )}
        {rec.paybackYears && (
          <Figure label="Estimated payback">
            {rec.paybackYears.min}–{rec.paybackYears.max} years
          </Figure>
        )}
      </dl>

      <p className="mt-3 flex items-center gap-1.5 text-caption text-neutral-700">
        <EvidenceIcon className="size-3.5" aria-hidden="true" />
        {evidence.label}
      </p>

      {rec.calculation && (
        <details className="group mt-3">
          <summary className="flex cursor-pointer list-none items-center gap-1 text-label font-semibold text-brand-700 [&::-webkit-details-marker]:hidden">
            <ChevronRight className="size-4 transition-transform duration-150 group-open:rotate-90" aria-hidden="true" />
            How we worked this out
          </summary>
          <div className="mt-3 flex flex-col gap-3 border-l-2 border-border pl-4">
            <CalculationList title="Inputs used" items={rec.calculation.inputs} />
            <CalculationList title="Assumptions" items={rec.calculation.assumptions} />
            <dl className="grid grid-cols-1 gap-2 text-body sm:grid-cols-3">
              <div>
                <dt className="text-label font-semibold text-neutral-950">Time horizon</dt>
                <dd className="text-neutral-800">{rec.calculation.timeHorizon}</dd>
              </div>
              <div>
                <dt className="text-label font-semibold text-neutral-950">One-off costs</dt>
                <dd className="text-neutral-800">{rec.calculation.oneOffCosts}</dd>
              </div>
              <div>
                <dt className="text-label font-semibold text-neutral-950">Ongoing costs</dt>
                <dd className="text-neutral-800">{rec.calculation.ongoingCosts}</dd>
              </div>
            </dl>
            <CalculationList title="Main uncertainties" items={rec.calculation.uncertainties} />
          </div>
        </details>
      )}

      {rec.action && (
        <div className="mt-auto pt-5">
          <Link href={rec.action.href} className={buttonClasses({ variant: "secondary", className: "w-full sm:w-auto" })}>
            {rec.action.label}
          </Link>
        </div>
      )}
    </Card>
  );
}
