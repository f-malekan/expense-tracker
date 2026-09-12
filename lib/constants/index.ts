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

export const MONTHS = [
  { value: 1, label: "فروردین" },
  { value: 2, label: "اردیبهشت" },
  { value: 3, label: "خرداد" },
  { value: 4, label: "تیر" },
  { value: 5, label: "مرداد" },
  { value: 6, label: "شهریور" },
  { value: 7, label: "مهر" },
  { value: 8, label: "آبان" },
  { value: 9, label: "آذر" },
  { value: 10, label: "دی" },
  { value: 11, label: "بهمن" },
  { value: 12, label: "اسفند" },
];

export const CHARTS_COLORS = [
  "#A7D8D1",
  "#B8C9E8",
  "#D8C4E8",
  "#F3C6B4",
  "#F1D99B",
  "#C7DDB5",
  "#E8B8C8",
  "#BFD8D2",
  "#D9C7B8",
  "#C9C4E4",
  "#F0C9A8",
  "#BFD0E8",
];
