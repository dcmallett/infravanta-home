import {
  CalendarClock,
  ChartNoAxesCombined,
  CircleHelp,
  CreditCard,
  House,
  LayoutDashboard,
  PiggyBank,
  ReceiptText,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** Desktop sidebar (design system §7.1) */
export const sidebarNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Household",
    items: [
      { label: "My Bills", href: "/bills", icon: ReceiptText },
      { label: "My Home", href: "/home", icon: House },
      { label: "Savings Planner", href: "/savings", icon: PiggyBank },
    ],
  },
  {
    label: "Assistance",
    items: [
      { label: "AI Advisor", href: "/advisor", icon: Sparkles },
      { label: "Reminders", href: "/reminders", icon: CalendarClock },
      { label: "Reports", href: "/reports", icon: ChartNoAxesCombined },
    ],
  },
];

export const sidebarFooterNavigation: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Subscription", href: "/subscription", icon: CreditCard },
  { label: "Help and support", href: "/help", icon: CircleHelp },
];

/** Mobile bottom bar — five primary destinations (design system §7.3) */
export const mobileNavigation: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bills", href: "/bills", icon: ReceiptText },
  { label: "Savings", href: "/savings", icon: PiggyBank },
  { label: "Advisor", href: "/advisor", icon: Sparkles },
  { label: "My Home", href: "/home", icon: House },
];

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getPageTitle(pathname: string) {
  const all = [...sidebarNavigation.flatMap((g) => g.items), ...sidebarFooterNavigation];
  return all.find((item) => isActivePath(pathname, item.href))?.label ?? "Infravanta Home";
}
