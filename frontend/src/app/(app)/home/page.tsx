import type { Metadata } from "next";
import Link from "next/link";

import { EditPropertyButton } from "@/components/home/edit-property-button";
import { ImprovementCard } from "@/components/home/improvement-card";
import { PropertyProfileSummary } from "@/components/home/property-profile-summary";
import { PageHeader } from "@/components/layout/page-header";
import { buttonClasses } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { sampleImprovements, sampleProfile } from "@/lib/mock-data/home";

export const metadata: Metadata = { title: "My Home" };

export default function MyHomePage() {
  const fields = sampleProfile.flatMap((section) => section.fields);
  const known = fields.filter((field) => field.value !== null).length;

  return (
    <>
      <PageHeader
        title="My home"
        description="Your property details help us tailor estimates and improvements."
        action={<EditPropertyButton />}
      />

      <Card className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <Progress
            label="Home profile"
            value={known}
            max={fields.length}
            valueText={`${known} of ${fields.length} details`}
          />
          <p className="mt-2 text-caption text-muted-foreground">
            Add your EPC rating, roof direction and energy usage for more accurate estimates.
          </p>
        </div>
        <Link href="/onboarding" className={buttonClasses({ variant: "secondary" })}>
          Complete your profile
        </Link>
      </Card>

      <section aria-labelledby="profile-heading" className="mb-10">
        <h2 id="profile-heading" className="mb-4 text-section-title text-neutral-950">
          Property profile
        </h2>
        <PropertyProfileSummary sections={sampleProfile} />
      </section>

      <section aria-labelledby="improvements-heading">
        <h2 id="improvements-heading" className="text-section-title text-neutral-950">
          Home improvements
        </h2>
        <p className="mt-1 mb-4 max-w-2xl text-body text-muted-foreground">
          Not every improvement suits every home. We show what&apos;s likely to work for yours, and what we&apos;d
          need to know to say more.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5 xl:grid-cols-3">
          {sampleImprovements.map((improvement) => (
            <ImprovementCard key={improvement.id} improvement={improvement} />
          ))}
        </div>
      </section>
    </>
  );
}
