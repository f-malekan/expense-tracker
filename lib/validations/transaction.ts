import * as z from "zod";
import { TransactionType } from "@/app/generated/prisma/enums";

export const transactionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "عنوان تراکنش الزامی است.")
    .max(100, "عنوان تراکنش نباید بیشتر از 100 کاراکتر باشد."),

  amount: z.number().positive("مبلغ باید بیشتر از صفر باشد."),

  type: z.nativeEnum(TransactionType),

  categoryId: z.string().min(1, "دسته‌بندی الزامی است."),

  description: z
    .string()
    .trim()
    .max(500, "توضیحات نباید بیشتر از 500 کاراکتر باشد.")
    .optional(),

  date: z.date(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
