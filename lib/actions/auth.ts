"use server";

import {
  loginFormSchema,
  LoginFormState,
  SignupFormSchema,
  SignupFormState,
} from "@/lib/validations/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "../../app/auth";
import { AuthError } from "next-auth";
import { Prisma } from "@/app/generated/prisma/client";

export async function signup(
  state: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      success: false,
      message: "این ایمیل قبلاً ثبت شده است.",
    };
  }

  try {
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

      return {
        success: true,
        message: "ثبت‌نام با موفقیت انجام شد!",
      };
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: "ثبت‌نام انجام شد اما ورود خودکار ناموفق بود.",
        };
      }

      console.error("Auto login error:", error);

      return {
        success: false,
        message: "ثبت‌نام انجام شد اما ورود خودکار ناموفق بود.",
      };
    }
  } catch (error) {
    // Duplicate email / unique constraint
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "این ایمیل قبلاً ثبت شده است.",
      };
    }

    console.error("Signup error:", error);

    return {
      success: false,
      message: "خطایی در ثبت‌نام رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
}

export async function login(
  state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const validatedFields = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      message: "ورود موفقیت‌آمیز بود.",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          success: false,
          message: "ایمیل یا رمز عبور اشتباه است.",
        };
      }

      console.error("Auth error:", error);

      return {
        success: false,
        message: "احراز هویت انجام نشد. لطفاً دوباره تلاش کنید.",
      };
    }

    console.error("Login error:", error);

    return {
      success: false,
      message: "خطایی در ورود رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
}
