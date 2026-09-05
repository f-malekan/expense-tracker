"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../Base/BaseInput";
import BaseSelectbox from "../Base/BaseSelectbox";
import BaseButton from "../Base/BaseButton";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { addTransaction, updateTransaction } from "@/lib/actions/transaction";
import { transactionSchema } from "@/lib/validations/transaction";
import { CategoryType } from "@/lib/types/category";
import { TransactionType } from "@/app/generated/prisma/enums";
import { TransactionDataType } from "@/lib/types/transaction";
import iziToast from "izitoast";

type FormData = z.infer<typeof transactionSchema>;

interface Props {
  categories?: CategoryType[];
  mode?: "create" | "edit";
  transaction?: TransactionDataType;
  onSuccess?: () => void;
}

const TransactionForm = ({
  categories,
  mode = "create",
  transaction,
  onSuccess,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      mode === "edit" && transaction
        ? {
            title: transaction.title,
            amount: Number(transaction.amount),
            type: transaction.type,
            categoryId: transaction.categoryId,
            description: transaction.description ?? "",
            date: new Date(transaction.date),
          }
        : {
            title: "",
            amount: undefined,
            type: TransactionType.EXPENSE,
            categoryId: "",
            description: "",
            date: new Date(),
          },
  });

  const onSubmit = async (data: FormData) => {
    let result;

    if (mode === "create") {
      result = await addTransaction(data);
    } else {
      if (!transaction) return;

      result = await updateTransaction(transaction.id, data);
    }

    if (result.success) {
      iziToast.success({
        message: result.message,
        rtl: true,
      });

      onSuccess?.();
    } else {
      setError("root", {
        message: result.message || "خطایی رخ داد",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
      {/* Title */}
      <BaseInput
        label="عنوان"
        {...register("title")}
        placeholder="مثلاً خرید روزانه"
        error={errors.title?.message ? [errors.title.message] : undefined}
      />

      {/* Amount */}
      <BaseInput
        label="مبلغ"
        type="number"
        {...register("amount", {
          valueAsNumber: true,
        })}
        placeholder="مبلغ را وارد کنید"
        error={errors.amount?.message ? [errors.amount.message] : undefined}
      />

      {/* Type */}
      <BaseSelectbox
        label="نوع"
        {...register("type")}
        error={errors.type?.message ? [errors.type.message] : undefined}
      >
        <option value={TransactionType.EXPENSE}>هزینه</option>
        <option value={TransactionType.INCOME}>درآمد</option>
      </BaseSelectbox>

      {/* Category */}
      {categories && (
        <BaseSelectbox
          label="دسته‌بندی"
          {...register("categoryId")}
          error={
            errors.categoryId?.message ? [errors.categoryId.message] : undefined
          }
        >
          <option value="">انتخاب دسته‌بندی</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </BaseSelectbox>
      )}

      {/* Description */}
      <BaseInput
        label="توضیحات"
        {...register("description")}
        placeholder="اختیاری"
        error={
          errors.description?.message ? [errors.description.message] : undefined
        }
      />

      {/* Date */}
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text">تاریخ</label>

            <DatePicker
              value={field.value}
              onChange={(date) => field.onChange(date?.toDate())}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              inputClass="
                h-8
                w-full
                rounded-lg
                border border-border
                bg-surface
                px-3
                text-xs
                text-text
                outline-none
                transition-colors
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />

            {errors.date?.message && (
              <span className="block text-[11px] text-destructive">
                {errors.date.message}
              </span>
            )}
          </div>
        )}
      />

      {/* Submit */}
      <BaseButton
        type="submit"
        loading={isSubmitting}
        fullWidth
        className="mt-1"
      >
        {mode === "create" ? "افزودن تراکنش" : "ذخیره تغییرات"}
      </BaseButton>
    </form>
  );
};

export default TransactionForm;
