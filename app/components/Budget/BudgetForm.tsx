"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../Base/BaseInput";
import BaseSelectbox from "../Base/BaseSelectbox";
import BaseButton from "../Base/BaseButton";
import BaseMessage from "../Base/BaseMessage";
import { addBudget, updateBudget } from "@/lib/actions/budget";
import { budgetSchema } from "@/lib/validations/budget";
import type { CategoryType } from "@/lib/types/category";
import { MONTHS } from "@/lib/constants";

type FormData = z.infer<typeof budgetSchema>;

interface BudgetData {
  id: string;
  amount: string;
  month: number;
  year: number;
  categoryId: string;
}

interface Props {
  categories: CategoryType[];
  mode?: "create" | "edit";
  budget?: BudgetData;
  onSuccess?: () => void;
}

const currentYear = new Date().getFullYear();

const BudgetForm = ({
  categories,
  mode = "create",
  budget,
  onSuccess,
}: Readonly<Props>) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      amount: budget ? Number(budget.amount) : undefined,
      month: budget?.month ?? 1,
      year: budget?.year ?? currentYear,
      categoryId: budget?.categoryId ?? "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const result =
      mode === "create"
        ? await addBudget(data)
        : await updateBudget(budget!.id, data);

    if (result.success) {
      onSuccess?.();
    } else {
      setError("root", {
        message: result.message || "خطایی رخ داد",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <BaseInput
        {...register("amount", {
          valueAsNumber: true,
        })}
        type="number"
        label="مبلغ بودجه"
        placeholder="مثلاً ۵۰۰۰۰۰۰"
        error={
          errors.amount?.message ? [errors.amount.message] : undefined
        }
      />

      <BaseSelectbox
        {...register("categoryId")}
        label="دسته‌بندی"
        error={
          errors.categoryId?.message
            ? [errors.categoryId.message]
            : undefined
        }
      >
        <option value="">انتخاب دسته‌بندی</option>

        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </BaseSelectbox>

      <div className="grid grid-cols-2 gap-4">
        <BaseSelectbox
          {...register("month", {
            valueAsNumber: true,
          })}
          label="ماه"
          error={
            errors.month?.message ? [errors.month.message] : undefined
          }
        >
          {MONTHS.map((month) => (
            <option value={month.value} key={month.value}>
              {month.label}
            </option>
          ))}
        </BaseSelectbox>

        <BaseInput
          {...register("year", {
            valueAsNumber: true,
          })}
          type="number"
          label="سال"
          error={
            errors.year?.message ? [errors.year.message] : undefined
          }
        />
      </div>

      {errors.root?.message && (
        <BaseMessage
          message={errors.root.message}
          variant="destructive"
        />
      )}

      <BaseButton type="submit" fullWidth loading={isSubmitting}>
        {mode === "create" ? "افزودن بودجه" : "ذخیره تغییرات"}
      </BaseButton>
    </form>
  );
};

export default BudgetForm;