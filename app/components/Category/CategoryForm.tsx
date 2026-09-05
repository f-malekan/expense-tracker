"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../Base/BaseInput";
import BaseSelectbox from "../Base/BaseSelectbox";
import BaseButton from "../Base/BaseButton";
import { addCategory, updateCategory } from "@/lib/actions/category";
import { CategoryType } from "@/lib/types/category";
import { TransactionType } from "@/app/generated/prisma/enums";
import { categorySchema } from "@/lib/validations/category";

type FormData = z.infer<typeof categorySchema>;

interface Props {
  mode?: "create" | "edit";
  category?: CategoryType;
  onSuccess?: () => void;
}

export default function CategoryForm({
  mode = "create",
  category,
  onSuccess,
}: Readonly<Props>) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(categorySchema),

    defaultValues:
      mode === "edit" && category
        ? {
            name: category.name,
            type: category.type,
          }
        : {
            name: "",
            type: TransactionType.EXPENSE,
          },
  });

  const onSubmit = async (data: FormData) => {
    let result;

    if (mode === "create") {
      result = await addCategory(data);
    } else {
      if (!category) return;

      result = await updateCategory(category.id, data);
    }

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
        {...register("name")}
        type="text"
        label="نام دسته‌بندی"
        placeholder="مثلاً غذا"
        error={errors.name?.message ? [errors.name.message] : undefined}
      />

      <BaseSelectbox
        {...register("type")}
        label="نوع دسته‌بندی"
        error={errors.type?.message ? [errors.type.message] : undefined}
      >
        <option value={TransactionType.EXPENSE}>هزینه</option>
        <option value={TransactionType.INCOME}>درآمد</option>
      </BaseSelectbox>

      <BaseButton type="submit" fullWidth loading={isSubmitting}>
        {mode === "create" ? "افزودن دسته‌بندی" : "ذخیره تغییرات"}
      </BaseButton>
    </form>
  );
}
