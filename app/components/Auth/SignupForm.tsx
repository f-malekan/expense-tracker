"use client";

import { signup } from "@/app/actions/auth";
import { useActionState } from "react";
import BaseInput from "../Base/BaseInput";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <BaseInput
        name="name"
        type="name"
        required
        placeholder="نام خود را وارد کنید"
        label="نام"
        error={state?.errors?.name}
      />

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
        className="mb-4"
        error={state?.errors?.password}
      />
      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  );
}
