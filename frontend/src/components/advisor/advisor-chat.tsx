"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizontal, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { AdvisorMessage as AdvisorMessageType } from "@/types/advisor";

import { AdvisorMessage } from "./advisor-message";

interface AdvisorChatProps {
  initialMessages: AdvisorMessageType[];
  suggestions: string[];
}

export function AdvisorChat({ initialMessages, suggestions }: AdvisorChatProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => () => clearTimeout(replyTimer.current), []);

  function send(text: string) {
    const question = text.trim();
    if (!question || thinking) return;

    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: "user", content: question }]);
    setDraft("");
    setThinking(true);

    // Static demo reply until the AI provider is connected
    replyTimer.current = setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content:
            "The AI Advisor isn't connected yet. When it is, answers will be based on your bills and home profile, with the figures and assumptions shown.",
          trustLabels: ["Demo response"],
        },
      ]);
      setThinking(false);
    }, 1200);
  }

  return (
    <Card className="flex flex-col p-0 md:p-0">
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with the AI Advisor"
        className="flex max-h-[60dvh] min-h-80 flex-col gap-5 overflow-y-auto p-4 md:p-5"
      >
        {messages.map((message) => (
          <AdvisorMessage key={message.id} message={message} />
        ))}
        {thinking && (
          <div className="flex animate-fade-in gap-3" aria-label="The advisor is working on an answer">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ai-background text-ai">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <div className="flex-1 space-y-2 rounded-lg border border-border p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border p-4 md:p-5">
        <p className="mb-2 text-label text-neutral-700">Try asking</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => send(suggestion)}
              disabled={thinking}
              className="min-h-9 rounded-full border border-neutral-300 bg-card px-3 py-1.5 text-label text-neutral-900 transition-colors duration-150 hover:border-brand-500 hover:bg-brand-50 disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            send(draft);
          }}
          className="flex items-end gap-2"
        >
          <div className="flex-1">
            <Textarea
              label="Ask a question about your bills or home"
              hideLabel
              rows={1}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  send(draft);
                }
              }}
              placeholder="Ask about your bills or home…"
              className="min-h-11 resize-none"
            />
          </div>
          <Button type="submit" aria-label="Send" disabled={!draft.trim() || thinking} className="px-3">
            <SendHorizontal aria-hidden="true" />
          </Button>
        </form>
        <p className="mt-2 text-caption text-muted-foreground">
          The advisor can make mistakes. Check important figures against your bills.
        </p>
      </div>
    </Card>
  );
}
