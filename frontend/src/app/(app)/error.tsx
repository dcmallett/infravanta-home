"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";

export default function AppError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Card>
      <ErrorState
        description="We couldn't load this page. Your information is safe. Please try again."
        action={<Button onClick={reset}>Try again</Button>}
      />
    </Card>
  );
}
