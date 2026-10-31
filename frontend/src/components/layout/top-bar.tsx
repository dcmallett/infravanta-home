"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CircleHelp } from "lucide-react";

import { getPageTitle } from "@/lib/navigation";

import { ProfileMenu } from "./profile-menu";

const iconButton =
  "flex size-11 items-center justify-center rounded-md text-neutral-700 transition-colors duration-150 hover:bg-muted hover:text-neutral-950";

export function TopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/95 px-4 backdrop-blur-sm md:px-6 lg:px-8">
      {/* Brand on mobile (no sidebar); page title on desktop */}
      <Link href="/dashboard" className="text-body-lg font-semibold text-brand-900 lg:hidden">
        Infravanta Home
      </Link>
      <p className="hidden text-body-lg font-semibold text-neutral-950 lg:block">{getPageTitle(pathname)}</p>

      <div className="flex items-center gap-1">
        <Link href="/help" className={iconButton} aria-label="Help and support">
          <CircleHelp className="size-5" aria-hidden="true" />
        </Link>
        <button type="button" className={iconButton} aria-label="Notifications">
          <Bell className="size-5" aria-hidden="true" />
        </button>
        <ProfileMenu />
      </div>
    </header>
  );
}
