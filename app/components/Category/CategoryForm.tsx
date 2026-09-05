"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../Base/BaseInput";
import BaseButton from "../Base/BaseButton";
import { addCategory, updateCategory } from "@/lib/actions/category";
import { CategoryType } from "@/lib/types/category";
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
    defaultValues: {
      name: mode === "edit" && category ? category.name : "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const result =
      mode === "create"
        ? await addCategory(data)
        : await updateCategory(category!.id, data);

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

      {errors.root && (
        <p className="text-xs text-destructive">{errors.root.message}</p>
      )}

      <BaseButton type="submit" fullWidth loading={isSubmitting}>
        {mode === "create" ? "افزودن دسته‌بندی" : "ذخیره تغییرات"}
      </BaseButton>
    </form>
  );
}
