import Image from "next/image";
import Link from "next/link";
import { PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";

import heroImage from "../../../public/images/home-hero.jpg";

const highlights = [
  { icon: ReceiptText, text: "Understand every household bill" },
  { icon: PiggyBank, text: "Spot savings worth checking" },
  { icon: ShieldCheck, text: "Independent, with no sales pressure" },
];

export default function MarketingHomePage() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
      <div>
        <h1 className="text-[32px] leading-10 font-bold text-brand-950 md:text-[44px] md:leading-[52px]">
          Your home. Your money. Better decisions.
        </h1>
        <p className="mt-5 max-w-xl text-body-lg text-muted-foreground md:text-[18px] md:leading-7">
          Infravanta Home brings your household bills together, explains what you&apos;re paying for and helps you find
          savings worth checking, so you can make confident decisions about your home.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/sign-up" className={buttonClasses()}>
            Get started free
          </Link>
          <Link href="/dashboard" className={buttonClasses({ variant: "secondary" })}>
            View demo dashboard
          </Link>
        </div>

        <ul className="mt-10 flex flex-col gap-3">
          {highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-body text-neutral-800">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-hidden rounded-xl border border-border shadow-overlay">
        <Image
          src={heroImage}
          alt="A modern family home with large glass doors opening onto a garden terrace"
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
