import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarClock,
  ChartNoAxesCombined,
  ChevronRight,
  Hammer,
  House,
  PiggyBank,
  ReceiptText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Infravanta Home helps households understand their bills, track spending, find potential savings and make better decisions about their home.",
};

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
  ai?: boolean;
}[] = [
  {
    icon: ReceiptText,
    title: "Understand your bills",
    description: "Upload household bills to see charges, usage, price changes and payment details explained clearly.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Track household spending",
    description: "See how your regular household costs change from month to month.",
  },
  {
    icon: PiggyBank,
    title: "Find potential savings",
    description: "Spot areas where you may be able to spend less or use energy more efficiently.",
  },
  {
    icon: House,
    title: "Understand your home",
    description: "Build a profile of your property, including heating, insulation and energy use.",
  },
  {
    icon: Hammer,
    title: "Explore home improvements",
    description: "Look into options such as insulation, solar panels, batteries and heating upgrades.",
  },
  {
    icon: Sparkles,
    title: "Get personalised guidance",
    description: "Ask the AI Advisor questions and get explanations based on your own household information.",
    ai: true,
  },
  {
    icon: CalendarClock,
    title: "Stay organised",
    description: "Keep track of contract renewals, reminders and important household information.",
  },
];

const steps = [
  {
    title: "Tell us about your home",
    description: "Add basic details about your household and property, such as its type, size, heating and insulation.",
  },
  {
    title: "Add your household bills",
    description: "Upload supported bills. We read the key details and ask you to check them before anything is saved.",
  },
  {
    title: "Understand your spending",
    description: "Review your bills, spending history and important changes in one place.",
  },
  {
    title: "Discover potential improvements",
    description: "Explore personalised recommendations, potential savings and ways to make your home more efficient.",
  },
  {
    title: "Make informed decisions",
    description: "Use the information and guidance to decide which changes, if any, are right for your household.",
  },
];

const faqs = [
  {
    question: "Is Infravanta Home an energy comparison website?",
    answer:
      "No. Comparing energy and household services may become part of the platform, but Infravanta Home is designed to do more than compare providers. It helps you understand your overall household costs, review your bills, find opportunities and make informed decisions about your home.",
  },
  {
    question: "Do I need to be a homeowner?",
    answer:
      "No. Infravanta Home is for homeowners and renters. Some features, particularly those about property improvements, may be more relevant to homeowners.",
  },
  {
    question: "Can I upload my household bills?",
    answer:
      "Yes. You can upload supported household bills so the key information can be read and shown in a format that's easier to understand. You always check the details before they're saved.",
  },
  {
    question: "Can Infravanta Home tell me how much I could save?",
    answer:
      "It can help identify potential savings based on what it knows about your household. Any figure depends on your circumstances, usage, location and the assumptions behind the calculation, so treat it as an estimate, not a guaranteed saving. We show the assumptions next to every estimate.",
  },
  {
    question: "Does Infravanta Home provide financial or energy advice?",
    answer:
      "Infravanta Home gives you information, explanations and guidance to help you make better-informed decisions. It isn't a substitute for regulated financial advice or a professional energy assessment.",
  },
  {
    question: "Does it use AI?",
    answer:
      "Yes. AI helps read your bills, explain complicated information and give guidance based on your household data. It's there to make information easier to understand, not to replace your judgement. Important figures and recommendations are backed by calculations and clearly stated assumptions.",
  },
  {
    question: "How is my household information protected?",
    answer:
      "Your personal information and uploaded documents are only available to you. You can download a copy of your data or permanently delete your account at any time from Settings.",
  },
  {
    question: "Do I have to make changes based on recommendations?",
    answer:
      "No. Recommendations are there to help you understand your options. You stay in control of which changes, if any, you make.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-brand-50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <p className="text-label font-semibold text-brand-700">About Infravanta Home</p>
          <h1 className="mt-3 max-w-3xl text-[32px] leading-10 font-bold text-brand-950 md:text-[44px] md:leading-[52px]">
            Understanding the cost of running your home shouldn&apos;t be complicated
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-body-lg text-neutral-800">
            <p>
              Infravanta Home is a household cost and home improvement platform. It brings your electricity and gas
              bills, broadband, heating and home improvement plans together in one place.
            </p>
            <p>
              Rather than comparing services one at a time, it looks at the bigger picture: how your household costs fit
              together, where your money is going and what you could do to improve them.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="features-heading" className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <h2 id="features-heading" className="text-page-title text-neutral-950">
          What you can do
        </h2>
        <p className="mt-2 max-w-2xl text-body text-muted-foreground">
          Everything is designed to make managing household costs simpler, clearer and less time-consuming.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map(({ icon: Icon, title, description, ai }) => (
            <li key={title} className="rounded-lg border border-border bg-card p-4 shadow-card md:p-5">
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-md",
                  ai ? "bg-ai-background text-ai" : "bg-brand-50 text-brand-700",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-card-title text-neutral-950">{title}</h3>
              <p className="mt-1 text-body text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="audience-heading" className="border-y border-border bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <h2 id="audience-heading" className="text-page-title text-neutral-950">
            Who it&apos;s for
          </h2>
          <div className="mt-4 max-w-2xl space-y-4 text-body-lg text-neutral-800">
            <p>
              Infravanta Home is for everyday homeowners, renters and households who want more control over their
              household costs, whether you live alone, share a property, rent a flat or run a family home.
            </p>
            <p>
              You don&apos;t need to be an energy expert or understand complicated utility bills. We explain things in
              plain English.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <h2 id="steps-heading" className="text-page-title text-neutral-950">
          How it works
        </h2>
        <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4 lg:flex-col lg:gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-900 text-label font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-card-title text-neutral-950">{step.title}</h3>
                <p className="mt-1 text-body text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq-heading" className="border-t border-border bg-neutral-50">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <h2 id="faq-heading" className="text-page-title text-neutral-950">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-card shadow-card">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-4 md:px-5">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-body font-semibold text-neutral-950 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronRight
                    className="size-4 shrink-0 text-neutral-600 transition-transform duration-150 group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-4 text-body text-neutral-800">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-heading" className="bg-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <p className="text-label font-semibold text-brand-100">Our mission</p>
          <h2 id="mission-heading" className="mt-3 text-[28px] leading-9 font-bold md:text-[36px] md:leading-[44px]">
            Your home. Your money. Better decisions.
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-brand-100">
            We want to give households the information, tools and guidance they need to make smarter decisions, cut
            unnecessary spending and build a more efficient home.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className={buttonClasses({
                className: "bg-white text-brand-900 hover:bg-brand-50",
              })}
            >
              Get started free
            </Link>
            <Link
              href="/dashboard"
              className={buttonClasses({
                variant: "secondary",
                className: "border-white/40 bg-transparent text-white hover:bg-white/10",
              })}
            >
              View demo dashboard
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
