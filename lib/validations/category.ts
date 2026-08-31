import { z } from "zod";
import { TransactionType } from "@/app/generated/prisma/enums";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "نام دسته‌بندی باید حداقل ۳ کاراکتر باشد.")
    .max(50, "نام دسته‌بندی نباید بیشتر از ۵۰ کاراکتر باشد."),

  type: z.nativeEnum(TransactionType),
});

export type CategoryInput = z.infer<typeof categorySchema>;
