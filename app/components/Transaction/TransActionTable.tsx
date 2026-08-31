import { CategoryType } from "@/lib/types/category";
import { TransactionDataType } from "@/lib/types/transaction";
import TransactionActionColumn from "./TransactionActionColumn";

interface Props {
  transactions: TransactionDataType[];
  categories: CategoryType[];
}

const TransActionTable = ({
  transactions,
  categories,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-background">
          <tr>
            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              عنوان
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              دسته‌بندی
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              نوع
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              مبلغ
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              تاریخ
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "INCOME";

            return (
              <tr
                key={transaction.id}
                className="border-b border-border last:border-0 transition-colors hover:bg-background/60"
              >
                {/* Title */}
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-text">
                      {transaction.title}
                    </p>

                    {transaction.description && (
                      <p className="mt-1 max-w-xs truncate text-xs text-text-secondary">
                        {transaction.description}
                      </p>
                    )}
                  </div>
                </td>

                {/* Category */}
                <td className="px-5 py-4 text-text-secondary">
                  {transaction.category?.name ?? "-"}
                </td>

                {/* Type */}
                <td className="px-5 py-4">
                  <span
                    className={`
                      inline-flex rounded-full px-2.5 py-1 text-xs font-medium
                      ${
                        isIncome
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }
                    `}
                  >
                    {isIncome ? "درآمد" : "هزینه"}
                  </span>
                </td>

                {/* Amount */}
                <td
                  className={`px-5 py-4 font-semibold ${
                    isIncome
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {isIncome ? "+" : "-"}
                  {transaction.amount.toString()}
                </td>

                {/* Date */}
                <td className="px-5 py-4 text-text-secondary">
                  {new Intl.DateTimeFormat("fa-IR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(transaction.date))}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <TransactionActionColumn
                    transaction={{
                      ...transaction,
                      amount: transaction.amount.toString(),
                    }}
                    categories={categories}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransActionTable;