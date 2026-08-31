import prisma from "@/lib/prisma";
const USER_ID = "cmss0brnz0000q0ut30nfdgva";

async function main() {
  // 1. Make sure the user exists
  const user = await prisma.user.findUnique({
    where: {
      id: USER_ID,
    },
  });

  if (!user) {
    throw new Error(`User with id ${USER_ID} not found.`);
  }

  // 2. Create categories
  const food = await prisma.category.upsert({
    where: {
      name_userId: {
        name: "Food",
        userId: USER_ID,
      },
    },
    update: {},
    create: {
      name: "Food",
      type: "EXPENSE",
      userId: USER_ID,
    },
  });

  const transportation = await prisma.category.upsert({
    where: {
      name_userId: {
        name: "Transportation",
        userId: USER_ID,
      },
    },
    update: {},
    create: {
      name: "Transportation",
      type: "EXPENSE",
      userId: USER_ID,
    },
  });

  const shopping = await prisma.category.upsert({
    where: {
      name_userId: {
        name: "Shopping",
        userId: USER_ID,
      },
    },
    update: {},
    create: {
      name: "Shopping",
      type: "EXPENSE",
      userId: USER_ID,
    },
  });

  const bills = await prisma.category.upsert({
    where: {
      name_userId: {
        name: "Bills",
        userId: USER_ID,
      },
    },
    update: {},
    create: {
      name: "Bills",
      type: "EXPENSE",
      userId: USER_ID,
    },
  });

  const salary = await prisma.category.upsert({
    where: {
      name_userId: {
        name: "Salary",
        userId: USER_ID,
      },
    },
    update: {},
    create: {
      name: "Salary",
      type: "INCOME",
      userId: USER_ID,
    },
  });

  const freelance = await prisma.category.upsert({
    where: {
      name_userId: {
        name: "Freelance",
        userId: USER_ID,
      },
    },
    update: {},
    create: {
      name: "Freelance",
      type: "INCOME",
      userId: USER_ID,
    },
  });

  // 3. Clear previous seeded transactions/budgets
  // We use a recognizable title prefix so we don't delete
  // data created manually by you.
  await prisma.transaction.deleteMany({
    where: {
      userId: USER_ID,
      title: {
        startsWith: "[SEED]",
      },
    },
  });

  await prisma.budget.deleteMany({
    where: {
      userId: USER_ID,
    },
  });

  // 4. Create transactions
  await prisma.transaction.createMany({
    data: [
      {
        title: "[SEED] Monthly Salary",
        amount: "3000.00",
        type: "INCOME",
        date: new Date("2026-06-01"),
        userId: USER_ID,
        categoryId: salary.id,
      },
      {
        title: "[SEED] Freelance Project",
        amount: "850.00",
        type: "INCOME",
        date: new Date("2026-06-15"),
        userId: USER_ID,
        categoryId: freelance.id,
      },
      {
        title: "[SEED] Grocery Shopping",
        amount: "120.50",
        type: "EXPENSE",
        date: new Date("2026-06-05"),
        userId: USER_ID,
        categoryId: food.id,
      },
      {
        title: "[SEED] Restaurant",
        amount: "45.00",
        type: "EXPENSE",
        date: new Date("2026-06-10"),
        userId: USER_ID,
        categoryId: food.id,
      },
      {
        title: "[SEED] Taxi",
        amount: "28.00",
        type: "EXPENSE",
        date: new Date("2026-06-12"),
        userId: USER_ID,
        categoryId: transportation.id,
      },
      {
        title: "[SEED] New Shoes",
        amount: "140.00",
        type: "EXPENSE",
        date: new Date("2026-06-18"),
        userId: USER_ID,
        categoryId: shopping.id,
      },
      {
        title: "[SEED] Internet Bill",
        amount: "35.00",
        type: "EXPENSE",
        date: new Date("2026-06-20"),
        userId: USER_ID,
        categoryId: bills.id,
      },

      {
        title: "[SEED] Monthly Salary",
        amount: "3000.00",
        type: "INCOME",
        date: new Date("2026-07-01"),
        userId: USER_ID,
        categoryId: salary.id,
      },
      {
        title: "[SEED] Freelance Project",
        amount: "500.00",
        type: "INCOME",
        date: new Date("2026-07-08"),
        userId: USER_ID,
        categoryId: freelance.id,
      },
      {
        title: "[SEED] Grocery Shopping",
        amount: "180.00",
        type: "EXPENSE",
        date: new Date("2026-07-03"),
        userId: USER_ID,
        categoryId: food.id,
      },
      {
        title: "[SEED] Restaurant",
        amount: "75.00",
        type: "EXPENSE",
        date: new Date("2026-07-11"),
        userId: USER_ID,
        categoryId: food.id,
      },
      {
        title: "[SEED] Taxi",
        amount: "40.00",
        type: "EXPENSE",
        date: new Date("2026-07-14"),
        userId: USER_ID,
        categoryId: transportation.id,
      },
      {
        title: "[SEED] Clothes",
        amount: "220.00",
        type: "EXPENSE",
        date: new Date("2026-07-19"),
        userId: USER_ID,
        categoryId: shopping.id,
      },
      {
        title: "[SEED] Electricity Bill",
        amount: "55.00",
        type: "EXPENSE",
        date: new Date("2026-07-21"),
        userId: USER_ID,
        categoryId: bills.id,
      },

      {
        title: "[SEED] Monthly Salary",
        amount: "3000.00",
        type: "INCOME",
        date: new Date("2026-08-01"),
        userId: USER_ID,
        categoryId: salary.id,
      },
      {
        title: "[SEED] Freelance Website",
        amount: "1200.00",
        type: "INCOME",
        date: new Date("2026-08-07"),
        userId: USER_ID,
        categoryId: freelance.id,
      },
      {
        title: "[SEED] Grocery Shopping",
        amount: "210.00",
        type: "EXPENSE",
        date: new Date("2026-08-04"),
        userId: USER_ID,
        categoryId: food.id,
      },
      {
        title: "[SEED] Coffee",
        amount: "18.00",
        type: "EXPENSE",
        date: new Date("2026-08-06"),
        userId: USER_ID,
        categoryId: food.id,
      },
      {
        title: "[SEED] Gas",
        amount: "60.00",
        type: "EXPENSE",
        date: new Date("2026-08-09"),
        userId: USER_ID,
        categoryId: transportation.id,
      },
      {
        title: "[SEED] Headphones",
        amount: "160.00",
        type: "EXPENSE",
        date: new Date("2026-08-13"),
        userId: USER_ID,
        categoryId: shopping.id,
      },
      {
        title: "[SEED] Phone Bill",
        amount: "30.00",
        type: "EXPENSE",
        date: new Date("2026-08-15"),
        userId: USER_ID,
        categoryId: bills.id,
      },
    ],
  });

  // 5. Create budgets for August 2026
  await prisma.budget.createMany({
    data: [
      {
        amount: "500.00",
        month: 8,
        year: 2026,
        userId: USER_ID,
        categoryId: food.id,
      },
      {
        amount: "200.00",
        month: 8,
        year: 2026,
        userId: USER_ID,
        categoryId: transportation.id,
      },
      {
        amount: "300.00",
        month: 8,
        year: 2026,
        userId: USER_ID,
        categoryId: shopping.id,
      },
      {
        amount: "150.00",
        month: 8,
        year: 2026,
        userId: USER_ID,
        categoryId: bills.id,
      },
    ],
  });

  console.log("🌱 Seed completed successfully.");
  console.log(`👤 User: ${user.email}`);
  console.log("📂 Categories: 6");
  console.log("💰 Transactions: 21");
  console.log("📊 Budgets: 4");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
