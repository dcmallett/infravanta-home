"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Check, CircleCheck, FileText, Upload } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { billCategoryOptions } from "./bill-category";

type Step = "select" | "uploading" | "review" | "saved";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_BYTES = 10 * 1024 * 1024;
const UNSURE = "We weren't sure about this. Please check it against your bill.";

const stepLabels = ["Upload", "Check details", "Done"];
const stepIndex: Record<Step, number> = { select: 0, uploading: 0, review: 1, saved: 2 };

function StepIndicator({ step }: { step: Step }) {
  const current = stepIndex[step];
  return (
    <ol className="mb-6 flex items-center gap-2 text-label">
      {stepLabels.map((label, i) => (
        <li key={label} className="flex items-center gap-2" aria-current={i === current ? "step" : undefined}>
          <span
            className={cn(
              "flex size-6 items-center justify-center rounded-full text-caption font-semibold",
              i < current && "bg-brand-600 text-white",
              i === current && "border-2 border-brand-600 text-brand-700",
              i > current && "border border-neutral-300 text-neutral-500",
            )}
          >
            {i < current ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
          </span>
          <span className={i === current ? "text-neutral-950" : "text-muted-foreground"}>{label}</span>
          {i < stepLabels.length - 1 && <span className="h-px w-6 bg-neutral-300 sm:w-10" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

export function BillUploadFlow() {
  const [step, setStep] = useState<Step>("select");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputId = useId();

  // Simulated progress until real upload and extraction are connected
  useEffect(() => {
    if (step !== "uploading") return;
    const timer = setInterval(() => setProgress((value) => Math.min(value + 20, 100)), 300);
    return () => clearInterval(timer);
  }, [step]);

  useEffect(() => {
    if (step !== "uploading" || progress < 100) return;
    const timer = setTimeout(() => setStep("review"), 400);
    return () => clearTimeout(timer);
  }, [step, progress]);

  function handleFile(selected: File | undefined) {
    if (!selected) return;
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError("Choose a PDF, JPG or PNG file.");
      return;
    }
    if (selected.size > MAX_BYTES) {
      setError("This file is over 10MB. Try a smaller scan or photo.");
      return;
    }
    setError(null);
    setFile(selected);
    setProgress(0);
    setStep("uploading");
  }

  function reset() {
    setFile(null);
    setError(null);
    setProgress(0);
    setStep("select");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <StepIndicator step={step} />

      {step === "select" && (
        <Card className="animate-fade-in-up">
          <label
            htmlFor={inputId}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              handleFile(event.dataTransfer.files[0]);
            }}
            className={cn(
              "flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-neutral-300 px-4 py-12 text-center transition-colors duration-150 hover:border-brand-500 hover:bg-brand-50 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary",
              dragging && "border-brand-500 bg-brand-50",
            )}
          >
            <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Upload className="size-6" aria-hidden="true" />
            </span>
            <span className="text-card-title text-neutral-950">
              Drag your bill here or <span className="text-brand-700 underline">choose a file</span>
            </span>
            <span className="mt-1 text-caption text-muted-foreground">PDF, JPG or PNG, up to 10MB</span>
            <input
              id={inputId}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="sr-only"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
          </label>
          {error && (
            <p role="alert" className="mt-3 text-label text-danger">
              {error}
            </p>
          )}
          <Alert className="mt-4">
            We read the key details from your bill, then ask you to check them before anything is saved.
          </Alert>
        </Card>
      )}

      {step === "uploading" && file && (
        <Card className="animate-fade-in-up">
          <div className="mb-5 flex items-center gap-3">
            <FileText className="size-8 shrink-0 text-brand-700" aria-hidden="true" />
            <div className="min-w-0">
              <p className="truncate text-body font-semibold text-neutral-950">{file.name}</p>
              <p className="text-caption text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
          </div>
          <Progress
            label={progress < 100 ? "Uploading and reading your bill" : "Finding the key details"}
            value={progress}
          />
          <Button variant="tertiary" size="sm" className="mt-4" onClick={reset}>
            Cancel
          </Button>
        </Card>
      )}

      {step === "review" && (
        <Card className="animate-fade-in-up">
          <h2 className="text-section-title text-neutral-950">Check your bill details</h2>
          <p className="mt-1 mb-5 text-body text-muted-foreground">
            We read these from your bill automatically, so some may be wrong. Correct anything that doesn&apos;t match.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setStep("saved");
            }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Supplier" name="supplier" defaultValue="Octopus Energy" required />
              <Select label="Bill type" name="category" options={billCategoryOptions} defaultValue="electricity" />
              <Input label="Billing period start" name="periodStart" type="date" defaultValue="2026-10-04" required />
              <Input
                label="Billing period end"
                name="periodEnd"
                type="date"
                defaultValue="2026-11-03"
                helperText={UNSURE}
                className="border-warning"
                required
              />
              <Input
                label="Total amount (£)"
                name="amount"
                inputMode="decimal"
                defaultValue="71.25"
                helperText={UNSURE}
                className="border-warning tabular-nums"
                required
              />
              <Input
                label="Account number (last 4 digits)"
                name="accountLast4"
                inputMode="numeric"
                maxLength={4}
                defaultValue="7890"
              />
            </div>
            <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={reset}>
                Start again
              </Button>
              <Button type="submit">Save bill</Button>
            </div>
          </form>
        </Card>
      )}

      {step === "saved" && (
        <Card className="animate-fade-in-up">
          <EmptyState
            icon={CircleCheck}
            tone="success"
            title="Bill saved"
            description="We'll compare it with your previous bills and flag anything worth checking."
            action={
              <>
                <Link href="/bills" className={buttonClasses()}>
                  View your bills
                </Link>
                <Button variant="secondary" onClick={reset}>
                  Upload another
                </Button>
              </>
            }
          />
        </Card>
      )}
    </div>
  );
}
