"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";
import { categorySchema, type CategoryInput } from "@/lib/validations/category";

export const addCategory = async (input: CategoryInput) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  const result = categorySchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "اطلاعات واردشده معتبر نیست.",
    };
  }

  const { name, type } = result.data;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: {
        name_userId: {
          name,
          userId,
        },
      },
    });

    if (existingCategory) {
      return {
        success: false,
        message: "دسته‌بندی با این نام قبلاً وجود دارد.",
      };
    }

    const category = await prisma.category.create({
      data: {
        name,
        userId,
      },
    });

    return {
      success: true,
      data: category,
      message: "دسته‌بندی با موفقیت اضافه شد.",
    };
  } catch (error) {
    console.error("addCategory:", error);

    return {
      success: false,
      message: "خطایی در ثبت دسته‌بندی رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};

export const updateCategory = async (id: string, input: CategoryInput) => {
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
      message: "شناسه دسته‌بندی معتبر نیست.",
    };
  }

  const result = categorySchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "اطلاعات واردشده معتبر نیست.",
    };
  }

  const { name, type } = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "دسته‌بندی پیدا نشد.",
      };
    }

    const duplicateCategory = await prisma.category.findFirst({
      where: {
        name,
        userId,
        NOT: {
          id,
        },
      },
    });

    if (duplicateCategory) {
      return {
        success: false,
        message: "دسته‌بندی با این نام قبلاً وجود دارد.",
      };
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name,
      },
    });

    return {
      success: true,
      data: updatedCategory,
      message: "دسته‌بندی با موفقیت بروزرسانی شد.",
    };
  } catch (error) {
    console.error("updateCategory:", error);

    return {
      success: false,
      message: "خطایی در بروزرسانی دسته‌بندی رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};

export const deleteCategory = async (id: string) => {
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
      message: "شناسه دسته‌بندی معتبر نیست.",
    };
  }

  try {
    const category = await prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "دسته‌بندی پیدا نشد.",
      };
    }

    const transactionCount = await prisma.transaction.count({
      where: {
        categoryId: category.id,
        userId,
      },
    });

    if (transactionCount > 0) {
      return {
        success: false,
        message: "این دسته‌بندی دارای تراکنش است و نمی‌توان آن را حذف کرد.",
      };
    }

    await prisma.category.delete({
      where: {
        id: category.id,
      },
    });

    return {
      success: true,
      message: "دسته‌بندی با موفقیت حذف شد.",
    };
  } catch (error) {
    console.error("deleteCategory:", error);

    return {
      success: false,
      message: "خطایی در حذف دسته‌بندی رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};
