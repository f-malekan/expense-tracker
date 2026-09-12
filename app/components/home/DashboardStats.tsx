import StatsCard from "./StatsCard";

type DashboardStatsProps = {
  income: number;
  expense: number;
  balance: number;
};

export default function DashboardStats({
  income,
  expense,
  balance,
}: Readonly<DashboardStatsProps>) {
  const stats = [
    {
      title: "موجودی",
      value: balance,
      variant: "bg-warning-shade",
    },
    {
      title: "درآمد این ماه",
      value: income,
      variant: "bg-success-shade",
    },
    {
      title: "هزینه این ماه",
      value: expense,
      variant: "bg-destructive-shade",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          amount={stat.value}
          variant={stat.variant}
        />
      ))}
    </div>
  );
}
