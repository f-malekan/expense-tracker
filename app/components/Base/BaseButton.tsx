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
  type = "button",
  ...props
}: Props) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover active:scale-[0.98]",

    secondary:
      "border border-border bg-surface text-text hover:bg-background active:scale-[0.98]",

    outline:
      "border border-border bg-transparent text-text hover:bg-surface active:scale-[0.98]",

    destructive:
      "bg-destructive text-white hover:opacity-90 active:scale-[0.98]",

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
      type={type}
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
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {children}
    </button>
  );
};

export default BaseButton;