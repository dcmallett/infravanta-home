"use client";

import { useId, useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";

import { heatingOptions, loftOptions, propertyTypeOptions } from "./property-options";

export function EditPropertyButton() {
  const [open, setOpen] = useState(false);
  const formId = useId();

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Pencil aria-hidden="true" />
        Edit home details
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Edit home details"
        description="Skip anything you're not sure about."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form={formId}>
              Save changes
            </Button>
          </>
        }
      >
        <form
          id={formId}
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            // Static data: changes aren't stored yet
            event.preventDefault();
            setOpen(false);
          }}
        >
          <Select label="Property type" name="propertyType" options={propertyTypeOptions} defaultValue="semi-detached" />
          <Input label="Bedrooms" name="bedrooms" type="number" min={0} defaultValue={3} />
          <Select label="Main heating" name="heating" options={heatingOptions} defaultValue="gas-boiler" />
          <RadioGroup legend="Loft insulation" name="loft" options={loftOptions} defaultValue="partial" />
        </form>
      </Dialog>
    </>
  );
}
