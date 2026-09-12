import type { CategoryType } from "@/lib/types/category";
import { MONTHS } from "@/lib/constants";
import BudgetActionColumn from "./BudgetActionColumn";

interface BudgetData {
  id: string;
  amount: string;
  month: number;
  year: number;
  categoryId: string;
  category: {
    name: string;
  };
}

interface Props {
  budgets: BudgetData[];
  categories: CategoryType[];
}

const BudgetTable = ({ budgets, categories }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-background">
          <tr>
            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              دسته‌بندی
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              مبلغ بودجه
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              ماه
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              سال
            </th>

            <th className="px-5 py-4 text-right font-medium text-text-secondary">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody>
          {budgets.map((budget) => (
            <tr
              key={budget.id}
              className="border-b border-border last:border-0 transition-colors hover:bg-background/60"
            >
              <td className="px-5 py-4 font-medium text-text">
                {budget.category.name}
              </td>

              <td className="px-5 py-4 font-semibold text-text">
                {Number(budget.amount).toLocaleString("fa-IR")}
              </td>

              <td className="px-5 py-4 text-text-secondary">
                {MONTHS.find((month) => month.value === budget.month)?.label}
              </td>

              <td className="px-5 py-4 text-text-secondary">
                {budget.year}
              </td>

              <td className="px-5 py-4">
                <BudgetActionColumn
                  budget={budget}
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

export default BudgetTable;