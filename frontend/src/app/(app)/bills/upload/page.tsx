import type { Metadata } from "next";

import { BillUploadFlow } from "@/components/bills/bill-upload-flow";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Upload a bill" };

export default function UploadBillPage() {
  return (
    <>
      <PageHeader
        title="Upload a bill"
        description="Add a PDF or photo of any household bill."
        back={{ href: "/bills", label: "All bills" }}
      />
      <BillUploadFlow />
    </>
  );
}
