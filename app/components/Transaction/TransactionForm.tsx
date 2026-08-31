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

type FormData = z.infer<typeof transactionSchema>;

interface Props {
  categories: CategoryType[];
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
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <BaseInput
        {...register("title")}
        placeholder="عنوان"
        error={errors.title?.message ? [errors.title.message] : undefined}
      />

      <BaseInput
        {...register("amount", {
          valueAsNumber: true,
        })}
        type="number"
        placeholder="مقدار"
        error={errors.amount?.message ? [errors.amount.message] : undefined}
      />

      <BaseSelectbox {...register("type")}>
        <option value="EXPENSE">هزینه</option>
        <option value="INCOME">درآمد</option>
      </BaseSelectbox>

      <BaseSelectbox {...register("categoryId")}>
        <option value="">انتخاب دسته‌بندی</option>

        {categories
          .filter((category) => {
            const selectedType = control._formValues.type;

            return category.type === selectedType;
          })
          .map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
      </BaseSelectbox>

      <BaseInput
        {...register("description")}
        placeholder="توضیحات"
        error={
          errors.description?.message ? [errors.description.message] : undefined
        }
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={(date) => field.onChange(date?.toDate())}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
        )}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md px-4 py-2 disabled:opacity-50"
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
