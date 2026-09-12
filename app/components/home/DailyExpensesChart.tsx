"use client";

import { CHARTS_COLORS } from "@/lib/constants";
import { BarChartDataType } from "@/lib/types/charts";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartContainerCard from "./ChartContainerCard";

interface Props {
  data: BarChartDataType[];
}

export default function DailyExpensesChart({ data }: Readonly<Props>) {
  const formatPersianDay = (day: number) => {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);

    return new Intl.DateTimeFormat("fa-IR", {
      day: "numeric",
    }).format(date);
  };

  return (
    <ChartContainerCard
      title="هزینه‌های روزانه"
      subtitle=" مجموع هزینه‌های هر روز در این ماه"
    >
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tickFormatter={(value) => formatPersianDay(Number(value))}
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "var(--primary-light)",
              }}
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-md)",
                color: "var(--text)",
                fontFamily: "var(--font-vazirmatn)",
              }}
              labelStyle={{
                color: "var(--text-secondary)",
                marginBottom: 4,
              }}
              itemStyle={{
                color: "var(--text)",
              }}
              formatter={(value) => [
                `${Number(value).toLocaleString("fa-IR")} تومان`,
                "هزینه",
              ]}
              labelFormatter={(label) =>
                `روز ${formatPersianDay(Number(label))}`
              }
            />

            <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHARTS_COLORS[index % CHARTS_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainerCard>
  );
}
