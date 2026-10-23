import type { Bill } from "@/types/bill";

import { BillListItem } from "./bill-list-item";

export function BillList({ bills }: { bills: Bill[] }) {
  return (
    <ul className="divide-y divide-border">
      {bills.map((bill) => (
        <BillListItem key={bill.id} bill={bill} />
      ))}
    </ul>
  );
}
