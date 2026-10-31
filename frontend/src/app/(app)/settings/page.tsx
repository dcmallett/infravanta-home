import type { Metadata } from "next";
import { Download } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { DeleteAccountButton } from "@/components/settings/delete-account-button";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Settings" };

// Static data: settings aren't stored yet
async function saveSettings() {
  "use server";
}

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
      <div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mt-1">{description}</CardDescription>
      </div>
      <div className="md:col-span-2">{children}</div>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your details, notifications and data." />

      <div className="flex flex-col gap-5">
        <SettingsSection title="Your details" description="Used to sign in and to contact you about your account.">
          <form action={saveSettings} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="First name" name="firstName" defaultValue="Alex" autoComplete="given-name" />
              <Input label="Last name" name="lastName" defaultValue="Jones" autoComplete="family-name" />
            </div>
            <Input label="Email address" name="email" type="email" defaultValue="alex@example.com" autoComplete="email" />
            <div>
              <Button type="submit">Save details</Button>
            </div>
          </form>
        </SettingsSection>

        <SettingsSection title="Notifications" description="Choose what we email you about.">
          <form action={saveSettings} className="flex flex-col">
            <Checkbox
              name="renewals"
              defaultChecked
              label="Renewals and payments"
              description="Reminders before contracts end and bills are due."
            />
            <Checkbox
              name="billChanges"
              defaultChecked
              label="Bill changes"
              description="When a new bill is noticeably higher or lower than usual."
            />
            <Checkbox name="savings" label="Savings ideas" description="New options worth checking for your home." />
            <Checkbox name="news" label="Product news" description="Occasional updates about new features." />
            <div className="mt-3">
              <Button type="submit">Save preferences</Button>
            </div>
          </form>
        </SettingsSection>

        <SettingsSection
          title="Privacy and data"
          description="Your data belongs to you. These controls are available on every plan."
        >
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-body font-semibold text-neutral-950">Download your data</h3>
              <p className="mt-1 mb-3 text-body text-muted-foreground">
                Get a copy of your bills, home details and reminders.
              </p>
              <Button variant="secondary">
                <Download aria-hidden="true" />
                Download my data
              </Button>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="text-body font-semibold text-neutral-950">Delete your account</h3>
              <p className="mt-1 mb-3 text-body text-muted-foreground">
                Permanently delete your account and everything in it. If you have a paid plan, cancel it first.
              </p>
              <DeleteAccountButton />
            </div>
          </div>
        </SettingsSection>
      </div>
    </>
  );
}
