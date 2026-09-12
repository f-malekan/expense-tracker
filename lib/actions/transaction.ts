"use server";

import prisma from "@/lib/prisma";
import { auth } from "../../app/auth";
import { revalidatePath } from "next/cache";

import {
  TransactionInput,
  transactionSchema,
} from "../validations/transaction";

export const addTransaction = async (input: TransactionInput) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  const result = transactionSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "اطلاعات واردشده معتبر نیست.",
    };
  }

  const { title, amount, type, categoryId, description, date } = result.data;

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

    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount,
        type,
        categoryId,
        description,
        date,
        userId,
      },
    });

    revalidatePath("/transactions");

    return {
      success: true,
      data: {
        ...transaction,
        amount: transaction.amount.toString(),
      },
      message: "تراکنش با موفقیت ثبت شد.",
    };
  } catch (error) {
    console.error("addTransaction:", error);

    return {
      success: false,
      message: "خطایی در ثبت تراکنش رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};

export const updateTransaction = async (
  id: string,
  input: TransactionInput,
) => {
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
      message: "شناسه تراکنش معتبر نیست.",
    };
  }

  const result = transactionSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "اطلاعات واردشده معتبر نیست.",
    };
  }

  const { title, amount, type, categoryId, description, date } = result.data;

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!transaction) {
      return {
        success: false,
        message: "تراکنش پیدا نشد.",
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

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        title,
        amount,
        type,
        categoryId,
        description,
        date,
      },
    });

    revalidatePath("/transactions");

    return {
      success: true,
      data: {
        ...updatedTransaction,
        amount: updatedTransaction.amount.toString(),
      },
      message: "تراکنش با موفقیت بروزرسانی شد.",
    };
  } catch (error) {
    console.error("updateTransaction:", error);

    return {
      success: false,
      message: "خطایی در بروزرسانی تراکنش رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};

export const deleteTransaction = async (id: string) => {
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
      message: "شناسه تراکنش معتبر نیست.",
    };
  }

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!transaction) {
      return {
        success: false,
        message: "تراکنش پیدا نشد.",
      };
    }

    await prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
    });

    revalidatePath("/transactions");

    return {
      success: true,
      message: "تراکنش با موفقیت حذف شد.",
    };
  } catch (error) {
    console.error("deleteTransaction:", error);

    return {
      success: false,
      message: "خطایی در حذف تراکنش رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};
