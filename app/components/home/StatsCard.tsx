interface Props {
  title: string;
  amount: number;
  variant: string;
}

const StatsCard = ({ title, amount, variant }: Props) => {
  return (
    <div
      className={`rounded p-3 shadow-sm sm:p-4 text-center ${variant}`}
    >
      <p className="truncate text-xs text-text-secondary sm:text-sm">{title}</p>

      <p className="mt-1 truncate text-base font-bold text-text sm:text-lg">
        {amount.toLocaleString("fa-IR")}
      </p>

      <p className="text-[10px] text-text-secondary sm:text-xs">تومان</p>
    </div>
  );
};

export default StatsCard;
