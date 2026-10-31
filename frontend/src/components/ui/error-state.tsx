import { TriangleAlert } from "lucide-react";

import { EmptyState } from "./empty-state";

interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this. Your information is safe. Please try again.",
  action,
  className,
}: ErrorStateProps) {
  return (
    <div role="alert">
      <EmptyState
        icon={TriangleAlert}
        tone="danger"
        title={title}
        description={description}
        action={action}
        className={className}
      />
    </div>
  );
}
