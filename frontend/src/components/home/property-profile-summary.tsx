import { Card, CardTitle } from "@/components/ui/card";
import type { ProfileSection } from "@/types/property";

export function PropertyProfileSummary({ sections }: { sections: ProfileSection[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5 xl:grid-cols-3">
      {sections.map((section) => (
        <Card key={section.id}>
          <CardTitle className="mb-2">{section.title}</CardTitle>
          <dl className="divide-y divide-border">
            {section.fields.map((field) => (
              <div key={field.label} className="flex justify-between gap-4 py-2.5">
                <dt className="text-body text-muted-foreground">{field.label}</dt>
                <dd className="text-right text-body">
                  {field.value ?? <span className="text-neutral-500 italic">Not known yet</span>}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      ))}
    </div>
  );
}
