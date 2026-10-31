import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, Eye, FileText, RefreshCw, Sparkles } from "lucide-react";

import { BillChange } from "@/components/bills/bill-change";
import { billCategories, frequencyLabel, previousPeriodLabel } from "@/components/bills/bill-category";
import { BillStatusBadge } from "@/components/bills/bill-status-badge";
import { DeleteBillButton } from "@/components/bills/delete-bill-button";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, formatDateRange, maskAccountNumber } from "@/lib/formatting";
import { billInsights, getBillById, sampleBills } from "@/lib/mock-data/bills";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return sampleBills.map((bill) => ({ id: bill.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bill = getBillById((await params).id);
  return { title: bill ? `${bill.supplier} bill` : "Bill not found" };
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-2.5">
      <dt className="text-body text-muted-foreground">{label}</dt>
      <dd className="text-right text-body text-neutral-950">{children}</dd>
    </div>
  );
}

export default async function BillDetailPage({ params }: Props) {
  const { id } = await params;
  const bill = getBillById(id);
  if (!bill) notFound();

  const category = billCategories[bill.category];
  const insight = billInsights[bill.id];

  return (
    <>
      <PageHeader
        back={{ href: "/bills", label: "All bills" }}
        title={`${bill.supplier} ${category.label.toLowerCase()} bill`}
        description={formatDateRange(bill.periodStart, bill.periodEnd)}
        action={
          <Button variant="secondary">
            <Download aria-hidden="true" />
            Download original
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 lg:gap-5">
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-label text-neutral-700">Total for this period</p>
                <p className="mt-1 text-metric text-neutral-950 tabular-nums">{formatCurrency(bill.amount)}</p>
                <BillChange
                  className="mt-1 text-label"
                  current={bill.amount}
                  previous={bill.previousAmount}
                  periodLabel={previousPeriodLabel[bill.frequency]}
                />
              </div>
              <BillStatusBadge status={bill.status} />
            </div>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Charges and rates</CardTitle>
                <CardDescription>What makes up this bill.</CardDescription>
              </div>
            </CardHeader>
            {bill.charges ? (
              <table className="w-full text-body">
                <caption className="sr-only">Charges on this bill</caption>
                <thead>
                  <tr className="border-b border-border text-left text-label text-muted-foreground">
                    <th scope="col" className="pb-2 font-medium">
                      Charge
                    </th>
                    <th scope="col" className="pb-2 text-right font-medium">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bill.charges.map((charge) => (
                    <tr key={charge.label} className="border-b border-border">
                      <td className="py-3">
                        <p className="text-neutral-950">{charge.label}</p>
                        {charge.detail && <p className="text-caption text-muted-foreground">{charge.detail}</p>}
                      </td>
                      <td className="py-3 text-right text-neutral-950 tabular-nums">{formatCurrency(charge.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row" className="pt-3 text-left font-semibold text-neutral-950">
                      Total
                    </th>
                    <td className="pt-3 text-right font-semibold text-neutral-950 tabular-nums">
                      {formatCurrency(bill.amount)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p className="text-body text-muted-foreground">
                We haven&apos;t read the individual charges from this bill yet. They&apos;ll appear here once
                it&apos;s been processed and checked.
              </p>
            )}
          </Card>

          {insight && (
            <Card>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="ai">
                  <Sparkles aria-hidden="true" />
                  AI explanation
                </Badge>
                <Badge>Based on your uploaded bill</Badge>
              </div>
              <p className="text-body-lg text-neutral-900">{insight.explanation}</p>
              <h3 className="mt-5 mb-2 text-label font-semibold text-neutral-950">Suggested actions</h3>
              <ul className="list-disc space-y-1 pl-5 text-body text-neutral-800">
                {insight.suggestedActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
              <p className="mt-4 text-caption text-muted-foreground">
                Figures come from your bill. AI explanations can contain mistakes, so check anything important.
              </p>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-4 lg:gap-5">
          <Card>
            <CardTitle className="mb-2">Supplier and account</CardTitle>
            <dl className="divide-y divide-border">
              <DetailRow label="Supplier">{bill.supplier}</DetailRow>
              <DetailRow label="Bill type">{category.label}</DetailRow>
              {bill.accountNumber && (
                <DetailRow label="Account">
                  <span className="tabular-nums">{maskAccountNumber(bill.accountNumber)}</span>
                </DetailRow>
              )}
              {bill.tariff && <DetailRow label="Tariff">{bill.tariff}</DetailRow>}
              <DetailRow label="Paid">{frequencyLabel[bill.frequency]}</DetailRow>
            </dl>
          </Card>

          <Card>
            <CardTitle className="mb-2">Billing dates</CardTitle>
            <dl className="divide-y divide-border">
              <DetailRow label="Period starts">{formatDate(bill.periodStart)}</DetailRow>
              <DetailRow label="Period ends">{formatDate(bill.periodEnd)}</DetailRow>
              {bill.dueDate && <DetailRow label="Payment due">{formatDate(bill.dueDate)}</DetailRow>}
            </dl>
          </Card>

          <Card>
            <CardTitle className="mb-3">Original document</CardTitle>
            <div className="flex items-center gap-3 rounded-md bg-neutral-50 p-3">
              <FileText className="size-6 shrink-0 text-brand-700" aria-hidden="true" />
              <p className="min-w-0 truncate text-body text-neutral-950">{bill.documentName ?? "Document"}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm">
                <Eye aria-hidden="true" />
                View
              </Button>
              <Button variant="secondary" size="sm">
                <RefreshCw aria-hidden="true" />
                Replace
              </Button>
              <DeleteBillButton supplier={bill.supplier} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
