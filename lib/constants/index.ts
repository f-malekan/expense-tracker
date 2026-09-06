import { FiBarChart2, FiList, FiPieChart, FiSettings } from "react-icons/fi";

export const NAV_ITEMS = [
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
