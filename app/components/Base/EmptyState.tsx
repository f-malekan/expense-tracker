interface Props {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title = "موردی یافت نشد",
  description = "هنوز هیچ موردی اضافه نشده است.",
  icon,
  action,
  className = "",
}: Readonly<Props>) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center ${className}`}
    >
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      )}

      <h3 className="text-sm font-semibold text-text">{title}</h3>

      {description && (
        <p className="mt-1.5 max-w-xs text-xs leading-5 text-text-secondary">
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
