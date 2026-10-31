"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  /** Action buttons; stacked full-width on mobile */
  footer?: React.ReactNode;
}

/**
 * Modal built on the native <dialog> element, which handles focus trapping,
 * Escape and the backdrop. Shows as a bottom drawer on mobile.
 */
export function Dialog({ open, onClose, title, description, children, footer }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        // Clicking the backdrop targets the <dialog> itself
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className="m-0 mt-auto w-full max-w-none rounded-t-xl bg-card text-foreground shadow-overlay sm:m-auto sm:max-w-lg sm:rounded-xl"
    >
      <div className="flex max-h-[90dvh] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 id={titleId} className="text-card-title text-neutral-950">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-1 text-body text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mt-1 -mr-2 flex size-11 shrink-0 items-center justify-center rounded-md text-neutral-700 hover:bg-muted"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        {children && <div className="overflow-y-auto px-5 py-5">{children}</div>}
        {footer && (
          <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:justify-end">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
