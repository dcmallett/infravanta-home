import type { Metadata } from "next";

import { PropertyProfileForm } from "@/components/home/property-profile-form";

export const metadata: Metadata = { title: "Set up your home" };

export default function OnboardingPage() {
  return (
    <>
      <div className="mx-auto mb-6 max-w-xl text-center">
        <h1 className="text-[24px] leading-8 font-[650] text-neutral-950 md:text-page-title">Tell us about your home</h1>
        <p className="mt-2 text-body-lg text-muted-foreground">
          It takes about two minutes. Skip anything you&apos;re not sure about.
        </p>
      </div>
      <PropertyProfileForm />
    </>
  );
}
