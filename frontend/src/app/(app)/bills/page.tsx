import type { Metadata } from "next";
import Link from "next/link";
import { ReceiptText, Upload } from "lucide-react";

import { BillList } from "@/components/bills/bill-list";
import { PageHeader } from "@/components/layout/page-header";
import { buttonClasses } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { sampleBills } from "@/lib/mock-data/bills";

export const metadata: Metadata = { title: "My Bills" };

export default function BillsPage() {
  const bills = sampleBills;

  const uploadAction = (
    <Link href="/bills/upload" className={buttonClasses()}>
      <Upload aria-hidden="true" />
      Upload a bill
    </Link>
  );

  return (
    <>
      <PageHeader
        title="My bills"
        description="Every household bill in one place, with changes from the previous period."
        action={bills.length > 0 ? uploadAction : undefined}
      />

      <Card className="p-0 md:p-0">
        {bills.length > 0 ? (
          <BillList bills={bills} />
        ) : (
          <EmptyState
            icon={ReceiptText}
            title="Understand your first bill"
            description="Upload a bill to see its charges, track changes and discover potential savings."
            action={uploadAction}
          />
        )}
      </Card>
    </>
  );
}
