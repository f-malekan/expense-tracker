"use client";

import { login } from "@/lib/actions/auth";
import { useActionState } from "react";
import BaseInput from "../Base/BaseInput";
import BaseButton from "../Base/BaseButton";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="space-y-5">
      <BaseInput
        name="email"
        type="email"
        required
        placeholder="example@email.com"
        label="ایمیل"
        error={state?.errors?.email}
      />

      <BaseInput
        name="password"
        type="password"
        required
        placeholder="••••••••"
        label="رمز عبور"
        error={state?.errors?.password}
      />

      {state?.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <BaseButton type="submit" loading={pending} fullWidth>
        ورود
      </BaseButton>
    </form>
  );
}
