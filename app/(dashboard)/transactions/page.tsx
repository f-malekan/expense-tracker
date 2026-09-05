import { getTransactions } from "@/lib/queries/transaction";
import { getCategories } from "@/lib/queries/category";
import AddTransactionButton from "../../components/Transaction/AddTransactionButton";
import TransactionTable from "../../components/Transaction/TransactionTable";
import TransactionCard from "../../components/Transaction/TransactionCard";
import ErrorState from "@/app/components/Base/ErrorState";
import EmptyState from "@/app/components/Base/EmptyState";

const TransactionsPage = async () => {
  const [{ success, data }, categoriesResult] = await Promise.all([
    getTransactions(),
    getCategories(),
  ]);

  if (!success || !categoriesResult.success) {
    return <ErrorState />;
  }

  if (!data) {
    return <EmptyState />;
  }

  if (!categoriesResult.data) {
    return (
      <EmptyState description="ابتدا باید دسته بندی بسازید تا بتوانید تراکنش ایجاد کنید!" />
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
            <TransactionTable
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
