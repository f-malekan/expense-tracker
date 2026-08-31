import { CategoryType } from "@/lib/types/category";
import { TransactionDataType } from "@/lib/types/transaction";
import TransactionActionColumn from "./TransactionActionColumn";

interface Props {
  transactions: TransactionDataType[];
  categories: CategoryType[];
  className?: string;
}

const TransactionCard = ({ transactions, categories, className }: Props) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="rounded-lg border bg-white p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium truncate">{transaction.title}</p>

              {transaction.description && (
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                  {transaction.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <TransactionActionColumn
              transaction={{
                ...transaction,
                amount: transaction.amount.toString(),
              }}
              categories={categories}
            />
          </div>

          {/* Details */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-gray-500">دسته‌بندی</p>
              <p className="mt-1 font-medium">
                {transaction.category?.name ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">نوع</p>
              <p className="mt-1 font-medium">
                {transaction.type === "INCOME" ? "Income" : "Expense"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">مقدار</p>
              <p className="mt-1 font-medium">
                {transaction.amount.toString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">تاریخ</p>
              <p className="mt-1">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(transaction.date)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionCard;
