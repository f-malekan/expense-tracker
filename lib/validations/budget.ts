import * as z from "zod";

export const budgetSchema = z.object({
  amount: z
    .number()
    .positive("مبلغ بودجه باید بیشتر از صفر باشد."),

  month: z
    .number()
    .int()
    .min(1, "ماه نامعتبر است.")
    .max(12, "ماه نامعتبر است."),

  year: z
    .number()
    .int()
    .min(2000, "سال نامعتبر است.")
    .max(2100, "سال نامعتبر است."),

  categoryId: z
    .string()
    .min(1, "دسته‌بندی الزامی است."),
});

export type BudgetInput = z.infer<typeof budgetSchema>;