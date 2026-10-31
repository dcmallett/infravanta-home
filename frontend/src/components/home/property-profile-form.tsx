"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";

import {
  epcOptions,
  heatingOptions,
  hotWaterOptions,
  loftOptions,
  ownershipOptions,
  propertyTypeOptions,
  wallOptions,
} from "./property-options";

const steps: { title: string; description: string; content: React.ReactNode }[] = [
  {
    title: "Your property",
    description: "The type of home helps us compare it with similar properties.",
    content: (
      <>
        <Select label="Property type" name="propertyType" options={propertyTypeOptions} placeholder="Choose one" />
        <RadioGroup legend="Do you own or rent?" name="ownership" options={ownershipOptions} columns={3} />
      </>
    ),
  },
  {
    title: "Approximate location",
    description: "Weather and regional prices affect your costs. We never need your full address.",
    content: (
      <Input
        label="First part of your postcode"
        name="postcodeDistrict"
        placeholder="For example, BS6"
        autoComplete="off"
        maxLength={4}
        helperText="Just the first half, like BS6 or M14."
      />
    ),
  },
  {
    title: "Heating and hot water",
    description: "Heating is usually the biggest part of a household energy bill.",
    content: (
      <>
        <Select label="Main heating" name="heating" options={heatingOptions} placeholder="Choose one" />
        <Select label="Hot water" name="hotWater" options={hotWaterOptions} placeholder="Choose one" />
      </>
    ),
  },
  {
    title: "Insulation and energy efficiency",
    description: "Pick \"Not sure\" for anything you don't know. You can update it later.",
    content: (
      <>
        <RadioGroup legend="Loft insulation" name="loft" options={loftOptions} columns={2} />
        <Select label="Walls" name="walls" options={wallOptions} placeholder="Choose one" />
        <Select
          label="EPC rating"
          name="epc"
          options={epcOptions}
          placeholder="Choose one"
          helperText="You'll find this on your Energy Performance Certificate, if you have one."
        />
      </>
    ),
  },
  {
    title: "Solar and battery",
    description: "Tell us about any equipment you already have.",
    content: (
      <div className="flex flex-col">
        <Checkbox name="solar" label="Solar panels" />
        <Checkbox name="battery" label="Home battery" />
        <Checkbox name="evCharger" label="EV charger" />
      </div>
    ),
  },
  {
    title: "Energy usage (optional)",
    description: "If you know your yearly usage, our estimates will be more accurate. Your bills usually show it.",
    content: (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Electricity per year (kWh)" name="electricityKwh" inputMode="numeric" placeholder="e.g. 2,700" />
        <Input label="Gas per year (kWh)" name="gasKwh" inputMode="numeric" placeholder="e.g. 11,500" />
      </div>
    ),
  },
];

export function PropertyProfileForm() {
  const [current, setCurrent] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const router = useRouter();
  const isLast = current === steps.length - 1;

  // Move focus to the new step's heading so screen readers announce it
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [current]);

  function next() {
    if (isLast) router.push("/dashboard");
    else setCurrent((step) => step + 1);
  }

  return (
    <Card className="mx-auto w-full max-w-xl p-5 md:p-8">
      <Progress
        label={`Step ${current + 1} of ${steps.length}`}
        value={current + 1}
        max={steps.length}
        valueText={steps[current].title}
        className="mb-6"
      />

      {/* All steps stay mounted (just hidden) so answers are kept when moving back and forth */}
      <form
        onSubmit={(event) => {
          // Static data: answers aren't stored yet
          event.preventDefault();
          next();
        }}
      >
        {steps.map((step, i) => (
          <div key={step.title} hidden={i !== current} className="animate-fade-in">
            <h2
              ref={i === current ? headingRef : undefined}
              tabIndex={-1}
              className="text-section-title text-neutral-950 focus:outline-none"
            >
              {step.title}
            </h2>
            <p className="mt-1 mb-5 text-body text-muted-foreground">{step.description}</p>
            <div className="flex flex-col gap-4">{step.content}</div>
          </div>
        ))}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="secondary" onClick={() => setCurrent((step) => step - 1)} disabled={current === 0}>
            Back
          </Button>
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            {!isLast && (
              <Button variant="tertiary" onClick={next}>
                Skip this step
              </Button>
            )}
            <Button type="submit">{isLast ? "Finish" : "Continue"}</Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
