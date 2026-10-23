"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  isActivePath,
  sidebarFooterNavigation,
  sidebarNavigation,
  type NavItem,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

function SidebarLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-10 items-center gap-3 rounded-md px-3 text-body font-medium transition-colors duration-150 focus-visible:outline-white",
        active ? "bg-brand-800 text-white" : "text-brand-100 hover:bg-brand-800/60 hover:text-white",
      )}
    >
      <Icon className="size-[18px] shrink-0" aria-hidden="true" />
      {item.label}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-brand-900 lg:flex">
      <div className="flex h-16 items-center px-5">
        <Link href="/dashboard" className="text-body-lg font-semibold text-white focus-visible:outline-white">
          Infravanta Home
        </Link>
      </div>

      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-4">
        {sidebarNavigation.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="mb-2 px-3 text-caption font-medium text-brand-100/70">{group.label}</p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <SidebarLink item={item} active={isActivePath(pathname, item.href)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        <ul className="flex flex-col gap-0.5">
          {sidebarFooterNavigation.map((item) => (
            <li key={item.href}>
              <SidebarLink item={item} active={isActivePath(pathname, item.href)} />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-3 px-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-brand-600 text-label text-white">
            AJ
          </span>
          <div className="min-w-0">
            <p className="truncate text-label text-white">Alex Jones</p>
            <p className="truncate text-caption text-brand-100/70">Free plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
