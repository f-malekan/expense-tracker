import "server-only";

import prisma from "@/lib/prisma";
import { TransactionType } from "@/app/generated/prisma/enums";
import { auth } from "@/app/auth";

export interface GetTransactionsParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: TransactionType;
  categoryId?: string;
  from?: Date;
  to?: Date;
}

export const getTransactions = async ({
  page = 1,
  limit = 10,
  search,
  type,
  categoryId,
  from,
  to,
}: GetTransactionsParams = {}) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 100);

  const where = {
    userId,

    ...(type && {
      type,
    }),

    ...(categoryId && {
      categoryId,
    }),

    ...(search && {
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ],
    }),

    ...(from || to
      ? {
          date: {
            ...(from && {
              gte: from,
            }),
            ...(to && {
              lte: to,
            }),
          },
        }
      : {}),
  };

  try {
    const [transactions, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: {
          date: "desc",
        },
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
      }),

      prisma.transaction.count({
        where,
      }),
    ]);

    return {
      success: true,
      data: transactions,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  } catch (error) {
    console.error("getTransactions:", error);

    return {
      success: false,
      message: "خطایی در دریافت تراکنش‌ها رخ داد.",
    };
  }
};