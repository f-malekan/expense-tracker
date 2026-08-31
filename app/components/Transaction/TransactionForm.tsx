"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../Base/BaseInput";
import BaseSelectbox from "../Base/BaseSelectbox";
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
      iziToast.error({
        message: result.message,
        rtl: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Title */}
      <BaseInput
        label="عنوان تراکنش"
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
        label="نوع تراکنش"
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
        placeholder="توضیحات اختیاری"
        error={
          errors.description?.message ? [errors.description.message] : undefined
        }
      />

      {/* Date */}
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text">تاریخ</label>

            <DatePicker
              value={field.value}
              onChange={(date) => field.onChange(date?.toDate())}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              inputClass="
                w-full
                h-11
                rounded-xl
                border border-border
                bg-surface
                px-4
                text-sm text-text
                outline-none
                transition
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
              "
            />

            {errors.date?.message && (
              <span className="block text-xs text-destructive">
                {errors.date.message}
              </span>
            )}
          </div>
        )}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          h-11
          w-full
          rounded-xl
          bg-primary
          px-4
          text-sm
          font-medium
          text-white
          transition
          hover:bg-primary-hover
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isSubmitting
          ? "در حال ذخیره..."
          : mode === "create"
            ? "افزودن تراکنش"
            : "ذخیره تغییرات"}
      </button>
    </form>
  );
};

export default TransactionForm;
