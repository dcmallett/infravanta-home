import type { AdvisorMessage } from "@/types/advisor";

export const sampleConversation: AdvisorMessage[] = [
  {
    id: "msg_001",
    role: "user",
    content: "Why did my electricity bill go up this month?",
  },
  {
    id: "msg_002",
    role: "assistant",
    content:
      "You used more electricity. Your unit rate and standing charge are the same as last month, so the £7.20 increase comes from usage rather than price.\n\nThis is common in autumn as lighting and heating use rises.",
    figures: [
      { label: "September bill", value: "£61.20" },
      { label: "October bill", value: "£68.40" },
      { label: "Change", value: "£7.20 more" },
    ],
    trustLabels: ["Based on your uploaded bill"],
    assumptions: ["Both bills cover a full month with no estimated readings."],
    nextStep: { label: "View your October bill", href: "/bills/bill_001" },
  },
];

export const suggestedQuestions = [
  "Is loft insulation worth it for my home?",
  "Should I fix my energy tariff?",
  "What bills are due this month?",
  "Why is my gas bill higher?",
];
