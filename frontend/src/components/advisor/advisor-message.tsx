import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { AdvisorMessage as AdvisorMessageType } from "@/types/advisor";

export function AdvisorMessage({ message }: { message: AdvisorMessageType }) {
  if (message.role === "user") {
    return (
      <div className="flex animate-fade-in-up justify-end">
        <div className="max-w-[85%] rounded-lg bg-brand-50 px-4 py-3 text-body text-neutral-950">
          <span className="sr-only">You said: </span>
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex animate-fade-in-up gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ai-background text-ai">
        <Sparkles className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-4">
        <span className="sr-only">Advisor said: </span>
        {message.trustLabels && (
          <div className="mb-2 flex flex-wrap gap-2">
            {message.trustLabels.map((label) => (
              <Badge key={label}>{label}</Badge>
            ))}
          </div>
        )}
        <p className="text-body whitespace-pre-line text-neutral-900">{message.content}</p>

        {message.figures && (
          <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {message.figures.map((figure) => (
              <div key={figure.label} className="rounded-md bg-neutral-50 p-3">
                <dt className="text-caption text-muted-foreground">{figure.label}</dt>
                <dd className="text-body font-semibold text-neutral-950 tabular-nums">{figure.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {message.assumptions && (
          <div className="mt-4">
            <p className="text-label font-semibold text-neutral-950">Assumptions</p>
            <ul className="mt-1 list-disc pl-5 text-caption text-neutral-700">
              {message.assumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
            </ul>
          </div>
        )}

        {message.nextStep && (
          <Link
            href={message.nextStep.href}
            className="mt-4 inline-flex items-center gap-1 text-label font-semibold text-brand-700 hover:underline"
          >
            {message.nextStep.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
