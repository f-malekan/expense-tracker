"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBarChart2, FiList, FiPieChart, FiSettings } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  {
    href: "/",
    label: "داشبورد",
    icon: FiPieChart,
  },
  {
    href: "/transactions",
    label: "تراکنش‌ها",
    icon: FiList,
  },
  {
    href: "/statistics",
    label: "آمار",
    icon: FiBarChart2,
  },
  {
    href: "/settings",
    label: "تنظیمات",
    icon: FiSettings,
  },
];

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
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
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
          {navItems.map((item) => {
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

        {/* Theme Button */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default AppHeader;
