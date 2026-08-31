import { getTransactions } from "@/lib/queries/transaction";
import AddTransActionButton from "../components/Transaction/AddTransActionButton";
import { getCategories } from "@/lib/actions/category";
import TransactionActionColumn from "../components/Transaction/TransactionActionColumn";

const TransactionsPage = async () => {
  const { success, message, data } = await getTransactions();
  const { data: categories } = await getCategories();
  if (!categories) return;

  if (!success) {
    return (
      <div className="p-6">
        <p>{message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Transactions</h1>

        <p className="text-gray-500">هنوز تراکنشی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">تراکنشها</h1>
      </div>

      <AddTransActionButton categories={categories} />

      <div className="overflow-x-auto rounded-lg border">
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
            {data.map((transaction) => (
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

                <td className="px-4 py-3">{transaction.category.name}</td>

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
    </div>
  );
};

export default TransactionsPage;
