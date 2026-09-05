import * as z from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(2, { error: "نام باید حداقل ۲ کاراکتر باشد." }).trim(),

  email: z.email({ error: "لطفاً یک ایمیل معتبر وارد کنید." }).trim(),

  password: z
    .string()
    .min(8, { error: "رمز عبور باید حداقل ۸ کاراکتر باشد." })
    .regex(/[a-zA-Z]/, {
      error: "رمز عبور باید حداقل شامل یک حرف انگلیسی باشد.",
    })
    .regex(/[0-9]/, {
      error: "رمز عبور باید حداقل شامل یک عدد باشد.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      error: "رمز عبور باید حداقل شامل یک کاراکتر خاص باشد.",
    }),
});

export const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { error: "رمز عبور باید حداقل ۸ کاراکتر باشد." }),
});

export type SignupFormState = {
  success: boolean;
  message:
    | {
        name?: string[];
        email?: string[];
        password?: string[];
      }
    | string;
};

export type LoginFormState = {
  success: boolean;
  message:
    | string
    | {
        email?: string[];
        password?: string[];
      };
};
