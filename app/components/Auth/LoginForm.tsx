"use client";

import { login } from "@/lib/actions/auth";
import { useActionState } from "react";
import BaseInput from "../Base/BaseInput";
import BaseButton from "../Base/BaseButton";
import { LoginFormState } from "@/lib/validations/auth";

export default function LoginForm() {
  const initialState: LoginFormState = {
    success: false,
    message: "",
  };
  const [state, action, pending] = useActionState(login, initialState);

  const fieldErrors =
    typeof state?.message === "object" ? state.message : undefined;

  const generalMessage =
    typeof state?.message === "string" && !!state.message.length
      ? state.message
      : undefined;

  return (
    <form action={action} className="space-y-4">
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

      {generalMessage && (
        <p
          className={`text-xs leading-5 ${
            state.success ? "text-success" : "text-destructive"
          }`}
        >
          {generalMessage}
        </p>
      )}

      <BaseButton type="submit" loading={pending} fullWidth className="mt-2">
        ورود
      </BaseButton>
    </form>
  );
}
