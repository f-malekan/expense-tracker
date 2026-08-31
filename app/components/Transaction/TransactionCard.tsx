import { CategoryType } from "@/lib/types/category";
import { TransactionDataType } from "@/lib/types/transaction";
import TransactionActionColumn from "./TransactionActionColumn";

interface Props {
  transactions: TransactionDataType[];
  categories: CategoryType[];
  className?: string;
}

const TransactionCard = ({
  transactions,
  categories,
  className = "",
}: Props) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {transactions.map((transaction) => {
        const isIncome = transaction.type === "INCOME";

        return (
          <article
            key={transaction.id}
            className="
              rounded-2xl
              border border-border
              bg-surface
              p-4
              shadow-sm
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-text">
                  {transaction.title}
                </h2>

                {transaction.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-text-secondary">
                    {transaction.description}
                  </p>
                )}
              </div>

              <TransactionActionColumn
                transaction={{
                  ...transaction,
                  amount: transaction.amount.toString(),
                }}
                categories={categories}
              />
            </div>

            {/* Amount */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                مبلغ
              </span>

              <span
                className={`text-base font-bold ${
                  isIncome
                    ? "text-success"
                    : "text-destructive"
                }`}
              >
                {isIncome ? "+" : "-"}
                {transaction.amount.toString()}
              </span>
            </div>

            {/* Details */}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
              <div>
                <p className="text-xs text-text-secondary">
                  دسته‌بندی
                </p>
                <p className="mt-1 text-sm font-medium text-text">
                  {transaction.category?.name ?? "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-text-secondary">
                  نوع
                </p>

                <span
                  className={`
                    mt-1 inline-flex rounded-full
                    px-2.5 py-1
                    text-xs font-medium
                    ${
                      isIncome
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }
                  `}
                >
                  {isIncome ? "درآمد" : "هزینه"}
                </span>
              </div>

              <div>
                <p className="text-xs text-text-secondary">
                  تاریخ
                </p>

                <p className="mt-1 text-sm text-text">
                  {new Intl.DateTimeFormat("fa-IR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(transaction.date))}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default TransactionCard;