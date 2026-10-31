"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const CONFIRM_WORD = "DELETE";

export function DeleteAccountButton() {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const router = useRouter();

  function close() {
    setOpen(false);
    setConfirmation("");
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete my account
      </Button>
      <Dialog
        open={open}
        onClose={close}
        title="Delete your account?"
        description="This permanently deletes your account, bills, documents and home details. You can't undo this."
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              Keep my account
            </Button>
            {/* Static data: nothing is deleted yet */}
            <Button variant="destructive" disabled={confirmation !== CONFIRM_WORD} onClick={() => router.push("/")}>
              Delete account
            </Button>
          </>
        }
      >
        <Input
          label={`Type ${CONFIRM_WORD} to confirm`}
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          autoComplete="off"
        />
      </Dialog>
    </>
  );
}
