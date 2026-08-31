import "server-only";

import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";

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
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("getCategories:", error);

    return {
      success: false,
      message: "خطایی در دریافت دسته‌بندی‌ها رخ داد.",
    };
  }
};