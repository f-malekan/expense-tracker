import prisma from "@/lib/prisma";
import { auth } from "../../app/auth";

export const getBudgets = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  try {
    const budgets = await prisma.budget.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
      },
      orderBy: [
        {
          year: "desc",
        },
        {
          month: "desc",
        },
      ],
    });

    return {
      success: true,
      data: budgets.map((budget) => ({
        ...budget,
        amount: budget.amount.toString(),
      })),
    };
  } catch (error) {
    console.error("getBudgets:", error);

    return {
      success: false,
      message: "خطایی در دریافت بودجه‌ها رخ داد.",
    };
  }
};