import Link from "next/link";
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-7 text-center">
          <Link href="/" className="text-lg font-bold tracking-tight text-text">
            Expense Tracker
          </Link>

          <h1 className="mt-6 text-base font-semibold text-text">
            ورود به حساب
          </h1>

          <p className="mt-1.5 text-xs text-text-secondary">
            برای ادامه وارد حساب کاربری خود شوید
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-xs text-text-secondary">
          حساب کاربری ندارید؟
          <Link
            href="/signup"
            className="mr-1 font-medium text-primary hover:underline"
          >
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
