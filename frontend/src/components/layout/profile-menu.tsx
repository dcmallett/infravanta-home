"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { accountMenuNavigation } from "@/lib/navigation";

const itemClasses =
  "flex h-11 items-center gap-3 rounded-md px-3 text-body text-neutral-900 transition-colors duration-150 hover:bg-muted";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  // Close after navigating
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative ml-1">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Account menu"
        className="flex size-11 items-center justify-center rounded-full"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-100 text-label text-brand-900">
          AJ
        </span>
      </button>

      {open && (
        <nav
          id={menuId}
          aria-label="Account"
          className="absolute top-full right-0 z-40 mt-2 w-64 origin-top-right animate-scale-in rounded-lg border border-border bg-card p-2 shadow-overlay"
        >
          <div className="mb-1 border-b border-border px-3 pt-1 pb-3">
            <p className="text-body font-semibold text-neutral-950">Alex Jones</p>
            <p className="text-caption text-muted-foreground">alex@example.com</p>
          </div>
          <ul>
            {accountMenuNavigation.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={itemClasses}>
                  <Icon className="size-[18px] text-neutral-600" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-1 border-t border-border pt-1">
            <Link href="/" className={itemClasses}>
              <LogOut className="size-[18px] text-neutral-600" aria-hidden="true" />
              Sign out
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
