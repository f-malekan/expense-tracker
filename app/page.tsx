import {
  getMonthlyIncomeExpense,
  getMonthlyExpenseByCategory,
  getMonthlyDailyExpenses,
} from "@/lib/queries/dashboard";
import { auth } from "./auth";

import DashboardStats from "./components/home/DashboardStats";
import ExpenseByCategoryChart from "./components/home/ExpenseByCategoryChart";
import DailyExpensesChart from "./components/home/DailyExpensesChart";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  const [monthlyIncomeExpense, expenseByCategory, dailyExpenses] =
    await Promise.all([
      getMonthlyIncomeExpense(userId),
      getMonthlyExpenseByCategory(userId),
      getMonthlyDailyExpenses(userId),
    ]);

  return (
    <main className="space-y-6">
      {" "}
      <DashboardStats
        income={monthlyIncomeExpense.income}
        expense={monthlyIncomeExpense.expense}
        balance={monthlyIncomeExpense.balance}
      />
      <ExpenseByCategoryChart data={expenseByCategory} />
      <DailyExpensesChart data={dailyExpenses} />
    </main>
  );
}
