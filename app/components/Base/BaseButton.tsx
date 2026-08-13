import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const BaseButton = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className = "",
  disabled = false,
  ...props
}: Props) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 cursor-pointer rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary: "bg-surface text-text border border-border hover:bg-background",
    outline: "border border-border bg-transparent text-text hover:bg-surface",
    destructive: "bg-destructive text-white hover:opacity-90",
    ghost:
      "bg-transparent text-text-secondary hover:bg-surface hover:text-text",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading && (
        <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default BaseButton;
