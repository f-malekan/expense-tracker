"use server";

import prisma from "@/lib/prisma";
import { auth } from "../auth";

export const addCategory = async (name: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  try {
    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        userId,
      },
    });

    return {
      success: true,
      data: category,
      message: "دسته‌بندی با موفقیت ثبت شد",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "خطایی در ثبت دسته‌بندی رخ داد. لطفاً دوباره تلاش کنید.",
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

  try {
    const category = await prisma.category.delete({
      where: {
        id,
        userId,
      },
    });

    return {
      success: true,
      data: category,
      message: "دسته بندی با موفقیت حذف شد.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "خطایی در حذف دسته‌بندی رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};

export const getCategories = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  try {
    const categories = await prisma.category.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("getCategories error:", error);
    return {
      success: false,
      message: "خطایی در دریافت دسته‌بندی‌ها رخ داد.",
    };
  }
};

export const updateCategory = async (id: string, name: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  try {
    const category = await prisma.category.update({
      where: { id, userId },
      data: { name: name.trim() },
    });

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "خطایی در بروزرسانی دسته‌بندی رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
};
