import { getTransactions } from "@/lib/queries/transaction";
import AddTransActionButton from "../components/Transaction/AddTransActionButton";
import { getCategories } from "@/lib/queries/category";
import TransActionTable from "../components/Transaction/TransActionTable";
import TransactionCard from "../components/Transaction/TransactionCard";

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

  const formattedData = data.map((i) => ({
    ...i,
    amount: i.amount.toString(),
  }));

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">تراکنشها</h1>
      </div>

      <AddTransActionButton categories={categories} />

      <TransActionTable
        transactions={formattedData}
        categories={categories}
        className="hidden md:block"
      />
      <TransactionCard
        transactions={formattedData}
        categories={categories}
        className="block md:hidden"
      />
    </div>
  );
};

export default TransactionsPage;
