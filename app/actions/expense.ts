"use server";

import prisma from "@/lib/prisma";
import { auth } from "../auth";

export const addExpense = async (
  amount: number,
  categoryId: string,
  description?: string,
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  try {
    const expense = await prisma.expense.create({
      data: {
        amount,
        categoryId,
        userId,
        description,
      },
    });

    return {
      success: true,
      data: expense,
      message: "هزینه با موفقیت ثبت شد",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "خطایی در ثبت هزینه رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};

export const deleteExpense = async (id: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  try {
    const expense = await prisma.expense.delete({
      where: {
        id,
        userId,
      },
    });

    return {
      success: true,
      data: expense,
      message: "هزینه با موفقیت حذف شد.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "خطایی در حذف هزینه رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};

export const getExpenses = async (
  filters: {
    categoryId?: string;
    startDate?: Date;
    endDate?: Date;
    search?: string;
  } = {},
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId,
        ...(filters.categoryId && {
          categoryId: filters.categoryId,
        }),
        ...(filters.startDate && {
          date: {
            gte: filters.startDate,
          },
        }),
        ...(filters.endDate && {
          date: {
            lte: filters.endDate,
          },
        }),
        ...(filters.search && {
          OR: [
            { description: { contains: filters.search, mode: "insensitive" } },
            { amount: { equals: Number(filters.search) } },
          ],
        }),
      },
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: expenses,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "خطایی در دریافت هزینه ها رخ داد.",
    };
  }
};

export const updateExpense = async (
  id: string,
  amount: number,
  description: string,
  categoryId: string,
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  try {
    const expense = await prisma.expense.update({
      where: { id, userId },
      data: { amount, description, categoryId },
    });

    return {
      success: true,
      data: expense,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "خطایی در بروزرسانی هزینه رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};
