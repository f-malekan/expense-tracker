import { CategoryType } from "@/lib/types/category";
import { TransactionDataType } from "@/lib/types/transaction";
import TransactionActionColumn from "./TransactionActionColumn";

interface Props {
  transactions: TransactionDataType[];
  categories: CategoryType[];
}

const TransActionTable = ({ transactions, categories }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-background/70">
            <tr>
              <th className="px-6 py-4 text-right text-xs font-medium text-text-secondary">
                تراکنش
              </th>

              <th className="px-5 py-4 text-right text-xs font-medium text-text-secondary">
                دسته‌بندی
              </th>

              <th className="px-5 py-4 text-right text-xs font-medium text-text-secondary">
                نوع
              </th>

              <th className="px-5 py-4 text-right text-xs font-medium text-text-secondary">
                مبلغ
              </th>

              <th className="px-5 py-4 text-right text-xs font-medium text-text-secondary">
                تاریخ
              </th>

              <th className="px-5 py-4 text-center text-xs font-medium text-text-secondary">
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
                  className="
                    border-b border-border
                    last:border-0
                    transition-colors
                    hover:bg-background/50
                  "
                >
                  {/* Title */}
                  <td className="px-6 py-5">
                    <div className="max-w-xs">
                      <p className="font-semibold text-text">
                        {transaction.title}
                      </p>

                      {transaction.description && (
                        <p className="mt-1 truncate text-xs text-text-secondary">
                          {transaction.description}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-5">
                    <span className="inline-flex rounded-lg bg-background px-3 py-1.5 text-xs font-medium text-text">
                      {transaction.category?.name ?? "بدون دسته‌بندی"}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-5 py-5">
                    <span
                      className={`
                        inline-flex items-center
                        rounded-full
                        px-3 py-1
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
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-5">
                    <div
                      className={`
                        font-bold
                        ${isIncome ? "text-success" : "text-destructive"}
                      `}
                    >
                      <span className="ml-1">{isIncome ? "+" : "-"}</span>

                      {Number(transaction.amount).toLocaleString("fa-IR")}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-5 py-5 text-text-secondary">
                    {new Intl.DateTimeFormat("fa-IR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(transaction.date))}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5">
                    <div className="flex justify-center">
                      <TransactionActionColumn
                        transaction={{
                          ...transaction,
                          amount: transaction.amount.toString(),
                        }}
                        categories={categories}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransActionTable;
