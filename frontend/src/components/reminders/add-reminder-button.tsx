"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { reminderTypeConfig } from "./reminder-item";

const typeOptions = Object.entries(reminderTypeConfig).map(([value, { label }]) => ({ value, label }));

export function AddReminderButton() {
  const [open, setOpen] = useState(false);
  const formId = useId();

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus aria-hidden="true" />
        Add a reminder
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add a reminder"
        description="We'll remind you before the date."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form={formId}>
              Add reminder
            </Button>
          </>
        }
      >
        <form
          id={formId}
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            // Static data: reminders aren't stored yet
            event.preventDefault();
            setOpen(false);
          }}
        >
          <Input label="What's it for?" name="title" placeholder="e.g. Car insurance renewal" required />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Date" name="dueDate" type="date" required />
            <Select label="Type" name="type" options={typeOptions} defaultValue="renewal" />
          </div>
          <Textarea label="Notes (optional)" name="description" rows={3} />
        </form>
      </Dialog>
    </>
  );
}
