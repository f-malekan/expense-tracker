import { getTransactions } from "@/lib/queries/transaction";
import { getCategories } from "@/lib/queries/category";

import AddTransactionButton from "../../components/Transaction/AddTransactionButton";
import TransActionTable from "../../components/Transaction/TransActionTable";
import TransactionCard from "../../components/Transaction/TransactionCard";

const TransactionsPage = async () => {
  const [{ success, message, data }, categoriesResult] = await Promise.all([
    getTransactions(),
    getCategories(),
  ]);

  if (!success) {
    return (
      <main className="mx-auto w-full max-w-7xl p-4 md:p-6">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm text-destructive">{message}</p>
        </div>
      </main>
    );
  }

  if (!categoriesResult.success || !categoriesResult.data) {
    return (
      <main className="mx-auto w-full max-w-7xl p-4 md:p-6">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm text-destructive">{categoriesResult.message}</p>
        </div>
      </main>
    );
  }

  const categories = categoriesResult.data;

  const formattedData =
    data?.map((transaction) => ({
      ...transaction,
      amount: transaction.amount.toString(),
    })) ?? [];

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-text md:text-2xl">تراکنش‌ها</h1>

        <AddTransactionButton categories={categories} />
      </div>

      {formattedData.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm md:p-12">
          <h2 className="text-base font-semibold text-text">
            هنوز تراکنشی ثبت نشده است
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            اولین درآمد یا هزینه خود را ثبت کنید.
          </p>

          <div className="mt-5">
            <AddTransactionButton categories={categories} />
          </div>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <TransActionTable
              transactions={formattedData}
              categories={categories}
            />
          </div>

          <div className="md:hidden">
            <TransactionCard
              transactions={formattedData}
              categories={categories}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TransactionsPage;
