"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../Base/BaseInput";
import BaseSelectbox from "../Base/BaseSelectbox";
import BaseButton from "../Base/BaseButton";
import { addTransaction, updateTransaction } from "@/lib/actions/transaction";
import { transactionSchema } from "@/lib/validations/transaction";
import { CategoryType } from "@/lib/types/category";
import { TransactionType } from "@/app/generated/prisma/enums";
import { TransactionDataType } from "@/lib/types/transaction";
import iziToast from "izitoast";
import BaseMessage from "../Base/BaseMessage";
import BaseDatePicker from "../Base/BaseDatePicker";

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
    const result =
      mode === "create"
        ? await addTransaction(data)
        : await updateTransaction(transaction!.id, data);

    if (result.success) {
      iziToast.success({ message: result.message, rtl: true });
      onSuccess?.();
    } else {
      setError("root", { message: result.message || "خطایی رخ داد" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
      <BaseInput
        label="عنوان"
        {...register("title")}
        placeholder="مثلاً خرید روزانه"
        error={errors.title?.message}
      />

      <BaseInput
        label="مبلغ"
        type="number"
        {...register("amount", {
          valueAsNumber: true,
        })}
        placeholder="مبلغ را وارد کنید"
        error={errors.amount?.message}
      />

      <BaseSelectbox
        label="نوع"
        {...register("type")}
        error={errors.type?.message}
      >
        <option value={TransactionType.EXPENSE}>هزینه</option>
        <option value={TransactionType.INCOME}>درآمد</option>
      </BaseSelectbox>

      {categories && (
        <BaseSelectbox
          label="دسته‌بندی"
          {...register("categoryId")}
          error={errors.categoryId?.message}
        >
          <option value="">انتخاب دسته‌بندی</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </BaseSelectbox>
      )}

      <BaseInput
        label="توضیحات"
        {...register("description")}
        placeholder="اختیاری"
        error={errors.description?.message}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <BaseDatePicker
            value={field.value}
            onChange={(date) => field.onChange(date)}
            error={errors.date?.message}
          />
        )}
      />

      {errors.root?.message && (
        <BaseMessage message={errors.root.message} variant="destructive" />
      )}

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
