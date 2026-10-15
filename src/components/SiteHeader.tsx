"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandMark from "@/components/BrandMark";
import WhatsAppButton from "@/components/WhatsAppButton";
import { NAV_ITEMS } from "@/lib/site";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

const GENERAL_WA_URL = waLink(WA_MESSAGES.general);

function isCurrent(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="border-arena-200 bg-papel/92 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <Link
          href="/"
          className="rounded-lg py-1"
          aria-label="DeAventura, ir al inicio"
        >
          <BrandMark />
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const current = isCurrent(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                      current
                        ? "bg-bosque-100 text-bosque-900"
                        : "text-tinta-suave hover:bg-papel-2 hover:text-bosque-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton
            href={GENERAL_WA_URL}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Reservar
          </WhatsAppButton>
          <button
            type="button"
            className="border-arena-200 text-bosque-900 hover:bg-papel-2 inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">
              {open ? "Cerrar menú" : "Abrir menú"}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          id="menu-movil"
          className={`border-arena-200 bg-papel shadow-card absolute inset-x-0 top-full border-b px-4 pt-2 pb-6 sm:px-6 lg:hidden ${
            open ? "block" : "hidden"
          }`}
        >
          <nav aria-label="Navegación móvil">
            <ul className="divide-arena-100 divide-y">
              {NAV_ITEMS.map((item) => {
                const current = isCurrent(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`block py-3 text-base font-medium ${
                        current ? "text-bosque-800" : "text-tinta"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <WhatsAppButton href={GENERAL_WA_URL} className="mt-5 w-full">
            Escribir por WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </header>
  );
}
