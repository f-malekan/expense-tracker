"use client";

import { addCategory } from "@/lib/actions/category";
import { useActionState } from "react";
import BaseInput from "../Base/BaseInput";
import BaseButton from "../Base/BaseButton";

export default function AddCategoryForm() {
  const [state, action, pending] = useActionState(addCategory, undefined);

  return (
    <form action={action}>
      <BaseInput
        name="name"
        type="tex t"
        required
        minLength={3}
        label="نام دسته بندی"
      />

      <BaseButton type="submit">افزودن دسته بندی</BaseButton>
    </form>
  );
}
