'use server'

import { SignupFormSchema, FormState } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "../auth";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, name } = validatedFields.data;

  if (!email || !password) {
    return { success: false, message: "شماره موبایل و رمز عبور الزامی است" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { success: false, message: "این شماره قبلاً ثبت شده است" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "ثبت‌نام انجام شد اما ورود خودکار ناموفق بود.",
    };
  }
  return { success: true, message: "ثبت‌نام با موفقیت انجام شد!" };
}
