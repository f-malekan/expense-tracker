import { CategoryType } from "@/lib/types/category";
import { TransactionDataType } from "@/lib/types/transaction";
import TransactionActionColumn from "./TransactionActionColumn";

interface Props {
  transactions: TransactionDataType[];
  categories: CategoryType[];
  className?: string;
}

const TransActionTable = ({ transactions, categories, className }: Props) => {
  return (
    <div className={`overflow-x-auto rounded-lg border ${className}`}>
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-right font-medium">عنوان</th>
            <th className="px-4 py-3 text-right font-medium">دسته بندی</th>
            <th className="px-4 py-3 text-right font-medium">نوع</th>
            <th className="px-4 py-3 text-right font-medium">مقدار</th>
            <th className="px-4 py-3 text-right font-medium">تاریخ</th>
            <th className="px-4 py-3 text-right font-medium">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b last:border-0">
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium">{transaction.title}</p>

                  {transaction.description && (
                    <p className="text-xs text-gray-500">
                      {transaction.description}
                    </p>
                  )}
                </div>
              </td>

              <td className="px-4 py-3">{transaction.category?.name}</td>

              <td className="px-4 py-3">
                {transaction.type === "INCOME" ? "Income" : "Expense"}
              </td>

              <td className="px-4 py-3 font-medium">
                {transaction.amount.toString()}
              </td>

              <td className="px-4 py-3">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(transaction.date)}
              </td>

              <td>
                <TransactionActionColumn
                  transaction={{
                    ...transaction,
                    amount: transaction.amount.toString(),
                  }}
                  categories={categories}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransActionTable;
