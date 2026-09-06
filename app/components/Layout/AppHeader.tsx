"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { NAV_ITEMS } from "../../../lib/constants";

const AppHeader = () => {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-background">
      <div
        className="
          mx-auto flex h-16 w-full max-w-7xl
          items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-2
                  rounded-lg
                  px-3 py-2
                  text-sm
                  transition-colors
                  ${
                    isActive
                      ? "bg-surface text-text"
                      : "text-text-secondary hover:bg-surface hover:text-text"
                  }
                `}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <nav className="flex items-center gap-1 md:hidden">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`
                  flex size-9 items-center justify-center
                  rounded-lg
                  transition-colors
                  ${
                    isActive
                      ? "bg-surface text-text"
                      : "text-text-secondary hover:bg-surface"
                  }
                `}
              >
                <Icon size={17} />
              </Link>
            );
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default AppHeader;
