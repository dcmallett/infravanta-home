import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = { title: "Help and support" };

const faqs = [
  {
    question: "How do you read my bills?",
    answer:
      "When you upload a bill, we read the key details such as supplier, dates, amounts and charges. We always ask you to check them before they're saved, and anything we're unsure about is highlighted.",
  },
  {
    question: "Are the savings figures guaranteed?",
    answer:
      "No. Savings are estimates based on your bills, your home and typical prices. We show the inputs and assumptions behind each one, and we only count a saving once you've confirmed it.",
  },
  {
    question: "Do you sell switching deals or earn commission?",
    answer:
      "Infravanta Home is designed to be independent. If that ever changes for a specific recommendation, we'll say so clearly next to it.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Go to Subscription and choose Cancel subscription. Your plan stays active until the end of the period you've paid for.",
  },
  {
    question: "How do I download or delete my data?",
    answer:
      "Go to Settings, then Privacy and data. You can download a copy of everything or permanently delete your account on any plan.",
  },
];

// Static data: messages aren't sent yet
async function sendMessage() {
  "use server";
}

export default function HelpPage() {
  return (
    <>
      <PageHeader title="Help and support" description="Answers to common questions, or get in touch." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        <Card className="p-0 md:p-0 lg:col-span-2">
          <h2 className="border-b border-border px-4 py-4 text-card-title text-neutral-950 md:px-5">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-border">
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
        </Card>

        <Card className="self-start">
          <CardTitle>Still need help?</CardTitle>
          <CardDescription className="mt-1 mb-5">Send us a message and we&apos;ll reply by email.</CardDescription>
          <form action={sendMessage} className="flex flex-col gap-4">
            <Input label="Subject" name="subject" required />
            <Textarea label="Message" name="message" rows={5} required />
            <Button type="submit" className="w-full">
              Send message
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
