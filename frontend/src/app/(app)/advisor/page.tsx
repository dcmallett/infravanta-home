import type { Metadata } from "next";

import { AdvisorChat } from "@/components/advisor/advisor-chat";
import { PageHeader } from "@/components/layout/page-header";
import { sampleConversation, suggestedQuestions } from "@/lib/mock-data/advisor";

export const metadata: Metadata = { title: "AI Advisor" };

export default function AdvisorPage() {
  return (
    <>
      <PageHeader
        title="AI Advisor"
        description="Ask about your bills and home. Answers show where the figures come from."
      />
      <div className="mx-auto max-w-3xl">
        <AdvisorChat initialMessages={sampleConversation} suggestions={suggestedQuestions} />
      </div>
    </>
  );
}
