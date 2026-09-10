"use server";

import prisma from "@/lib/prisma";
import { auth } from "../../app/auth";
import { BudgetInput, budgetSchema } from "../validations/budget";

export const addBudget = async (input: BudgetInput) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  const result = budgetSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "اطلاعات واردشده معتبر نیست.",
    };
  }

  const { amount, month, year, categoryId } = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "دسته‌بندی معتبر نیست.",
      };
    }

    const budget = await prisma.budget.create({
      data: {
        amount,
        month,
        year,
        categoryId,
        userId,
      },
    });

    return {
      success: true,
      data: {
        ...budget,
        amount: budget.amount.toString(),
      },
      message: "بودجه با موفقیت ثبت شد.",
    };
  } catch (error) {
    console.error("addBudget:", error);

    return {
      success: false,
      message: "خطایی در ثبت بودجه رخ داد.",
    };
  }
};

export const updateBudget = async (id: string, input: BudgetInput) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  if (!id) {
    return {
      success: false,
      message: "شناسه بودجه معتبر نیست.",
    };
  }

  const result = budgetSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "اطلاعات واردشده معتبر نیست.",
    };
  }

  const { amount, month, year, categoryId } = result.data;

  try {
    const budget = await prisma.budget.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!budget) {
      return {
        success: false,
        message: "بودجه پیدا نشد.",
      };
    }

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "دسته‌بندی معتبر نیست.",
      };
    }

    const updatedBudget = await prisma.budget.update({
      where: {
        id: budget.id,
      },
      data: {
        amount,
        month,
        year,
        categoryId,
      },
    });

    return {
      success: true,
      data: {
        ...updatedBudget,
        amount: updatedBudget.amount.toString(),
      },
      message: "بودجه با موفقیت بروزرسانی شد.",
    };
  } catch (error) {
    console.error("updateBudget:", error);

    return {
      success: false,
      message: "خطایی در بروزرسانی بودجه رخ داد.",
    };
  }
};

export const deleteBudget = async (id: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  if (!id) {
    return {
      success: false,
      message: "شناسه بودجه معتبر نیست.",
    };
  }

  try {
    const budget = await prisma.budget.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!budget) {
      return {
        success: false,
        message: "بودجه پیدا نشد.",
      };
    }

    await prisma.budget.delete({
      where: {
        id: budget.id,
      },
    });

    return {
      success: true,
      message: "بودجه با موفقیت حذف شد.",
    };
  } catch (error) {
    console.error("deleteBudget:", error);

    return {
      success: false,
      message: "خطایی در حذف بودجه رخ داد.",
    };
  }
};
