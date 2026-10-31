import { BatteryCharging, Flame, Layers, PlugZap, Sun, Wind, type LucideIcon } from "lucide-react";

import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrencyRange } from "@/lib/formatting";
import type { HomeImprovement, ImprovementId, Suitability } from "@/types/property";

const icons: Record<ImprovementId, LucideIcon> = {
  insulation: Layers,
  heating: Flame,
  solar: Sun,
  battery: BatteryCharging,
  "ev-charging": PlugZap,
  "draught-proofing": Wind,
};

const suitabilityConfig: Record<Suitability, { label: string; variant: BadgeVariant }> = {
  "likely-suitable": { label: "Likely suitable", variant: "info" },
  "worth-checking": { label: "Worth checking", variant: "neutral" },
  "needs-info": { label: "More information needed", variant: "warning" },
  unlikely: { label: "Unlikely to suit your home", variant: "neutral" },
};

export function ImprovementCard({ improvement }: { improvement: HomeImprovement }) {
  const Icon = icons[improvement.id];
  const suitability = suitabilityConfig[improvement.suitability];

  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <Badge variant={suitability.variant}>{suitability.label}</Badge>
      </div>
      <h3 className="mt-3 text-card-title text-neutral-950">{improvement.title}</h3>
      <p className="mt-1 text-body text-muted-foreground">{improvement.summary}</p>

      <dl className="mt-4 flex flex-col gap-3 text-body">
        <div>
          <dt className="text-label font-semibold text-neutral-950">Typical cost (estimate)</dt>
          <dd className="text-neutral-800 tabular-nums">
            {formatCurrencyRange(improvement.typicalCost.min, improvement.typicalCost.max)}
          </dd>
        </div>
        <div>
          <dt className="text-label font-semibold text-neutral-950">Possible benefits</dt>
          <dd className="text-neutral-800">{improvement.benefits}</dd>
        </div>
        <div>
          <dt className="text-label font-semibold text-neutral-950">Limitations</dt>
          <dd className="text-neutral-800">{improvement.limitations}</dd>
        </div>
        {improvement.infoNeeded.length > 0 && (
          <div>
            <dt className="text-label font-semibold text-neutral-950">We still need</dt>
            <dd>
              <ul className="list-disc pl-5 text-neutral-800">
                {improvement.infoNeeded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>
    </Card>
  );
}
