"use client";

import { signup } from "@/lib/actions/auth";
import { useActionState } from "react";
import BaseInput from "../Base/BaseInput";
import BaseButton from "../Base/BaseButton";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  const fieldErrors =
    typeof state?.message === "object" ? state.message : undefined;

  const generalError =
    typeof state?.message === "string" ? state.message : undefined;

  return (
    <form action={action} className="space-y-4">
      <BaseInput
        name="name"
        type="text"
        required
        placeholder="نام خود را وارد کنید"
        label="نام"
        error={fieldErrors?.name}
      />

      <BaseInput
        name="email"
        type="email"
        required
        placeholder="example@email.com"
        label="ایمیل"
        error={fieldErrors?.email}
      />

      <BaseInput
        name="password"
        type="password"
        required
        placeholder="••••••••"
        label="رمز عبور"
        error={fieldErrors?.password}
      />

      {generalError && (
        <p className="text-xs leading-5 text-destructive">{generalError}</p>
      )}

      <BaseButton type="submit" loading={pending} fullWidth className="mt-2">
        ثبت‌نام
      </BaseButton>
    </form>
  );
}
