"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

export function DeleteBillButton({ supplier }: { supplier: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        <Trash2 aria-hidden="true" />
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete this bill?"
        description={`This removes the ${supplier} bill and its original document. You can't undo this.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Keep bill
            </Button>
            {/* Static data: nothing is deleted yet */}
            <Button variant="destructive" onClick={() => router.push("/bills")}>
              Delete bill
            </Button>
          </>
        }
      />
    </>
  );
}
