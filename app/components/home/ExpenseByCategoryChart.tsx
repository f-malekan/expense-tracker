"use client";

import { CHARTS_COLORS } from "@/lib/constants";
import { PieChartDataType } from "@/lib/types/charts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartContainerCard from "./ChartContainerCard";

interface Props {
  data: PieChartDataType[];
}

export default function ExpenseByCategoryChart({ data }: Readonly<Props>) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <ChartContainerCard title=" هزینه‌ها بر اساس دسته‌بندی" subtitle="این ماه">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
              stroke="var(--surface)"
              strokeWidth={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHARTS_COLORS[index % CHARTS_COLORS.length]}
                />
              ))}
            </Pie>

            <text
              x="50%"
              y="42%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--text)"
              fontSize="18"
              fontWeight="600"
            >
              {total.toLocaleString()}
            </text>

            <text
              x="50%"
              y="49%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--text-secondary)"
              fontSize="12"
            >
              تومان
            </text>

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-md)",
                color: "var(--text)",
                fontFamily: "var(--font-vazirmatn)",
              }}
              formatter={(value) => [
                `${Number(value).toLocaleString()} تومان`,
                "هزینه",
              ]}
            />

            <Legend
              verticalAlign="bottom"
              height={40}
              iconType="circle"
              wrapperStyle={{
                fontSize: "12px",
                color: "var(--text-secondary)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartContainerCard>
  );
}
