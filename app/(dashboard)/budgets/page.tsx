import { getBudgets } from "@/lib/queries/budget";
import { getCategories } from "@/lib/queries/category";
import AddBudgetButton from "../../components/Budget/AddBudgetButton";
import BudgetTable from "../../components/Budget/BudgetTable";
import ErrorState from "@/app/components/Base/ErrorState";
import EmptyState from "@/app/components/Base/EmptyState";

const BudgetsPage = async () => {
  const [{ success, data }, categoriesResult] = await Promise.all([
    getBudgets(),
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
      <EmptyState description="ابتدا باید دسته‌بندی بسازید تا بتوانید بودجه ایجاد کنید!" />
    );
  }

  const categories = categoriesResult.data;

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-text md:text-2xl">
          بودجه‌ها
        </h1>

        <AddBudgetButton categories={categories} />
      </div>

      {data.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm md:p-12">
          <h2 className="text-base font-semibold text-text">
            هنوز بودجه‌ای ثبت نشده است
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            برای مدیریت بهتر هزینه‌ها، اولین بودجه خود را ایجاد کنید.
          </p>

          <div className="mt-5">
            <AddBudgetButton categories={categories} />
          </div>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <BudgetTable
              budgets={data}
              categories={categories}
            />
          </div>

          <div className="md:hidden">
            <BudgetTable
              budgets={data}
              categories={categories}
            />
          </div>
        </>
      )}
    </>
  );
};

export default BudgetsPage;