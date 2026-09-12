import prisma from "../prisma";

// 1. درآمد و هزینه ماه جاری
export async function getMonthlyIncomeExpense(userId: string) {
  const now = new Date();

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
  );

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      amount: true,
      type: true,
    },
  });

  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    const amount = Number(transaction.amount);

    if (transaction.type === "INCOME") {
      income += amount;
    }

    if (transaction.type === "EXPENSE") {
      expense += amount;
    }
  });

  return {
    income,
    expense,
    balance: income - expense,
  };
}


// 2. هزینه‌ها بر اساس دسته‌بندی در ماه جاری
export async function getMonthlyExpenseByCategory(userId: string) {
  const now = new Date();

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
  );

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      type: "EXPENSE",
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      amount: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const categories: Record<string, number> = {};

  transactions.forEach((transaction) => {
    const categoryName = transaction.category.name;
    const amount = Number(transaction.amount);

    categories[categoryName] =
      (categories[categoryName] || 0) + amount;
  });

  return Object.entries(categories).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );
}


// 3. هزینه‌های روزانه در ماه جاری
export async function getMonthlyDailyExpenses(userId: string) {
  const now = new Date();

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  );

  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1,
  );

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      type: "EXPENSE",
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      amount: true,
      date: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const dailyExpenses: Record<number, number> = {};

  transactions.forEach((transaction) => {
    const day = new Date(transaction.date).getDate();
    const amount = Number(transaction.amount);

    dailyExpenses[day] =
      (dailyExpenses[day] || 0) + amount;
  });

  return Object.entries(dailyExpenses).map(
    ([day, amount]) => ({
      day: Number(day),
      amount,
    }),
  );
}