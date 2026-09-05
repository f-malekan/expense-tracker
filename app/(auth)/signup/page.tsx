import Link from "next/link";
import SignupForm from "../../components/Auth/SignupForm";

const SignupPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-7 text-center">
          <Link href="/" className="text-lg font-bold tracking-tight text-text">
            Expense Tracker
          </Link>

          <h1 className="mt-6 text-base font-semibold text-text">ایجاد حساب</h1>

          <p className="mt-1.5 text-xs text-text-secondary">
            برای شروع حساب کاربری خود را بسازید
          </p>
        </div>

        <SignupForm />

        <p className="mt-6 text-center text-xs text-text-secondary">
          قبلاً حساب ساخته‌اید؟
          <Link
            href="/login"
            className="mr-1 font-medium text-primary hover:underline"
          >
            وارد شوید
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
