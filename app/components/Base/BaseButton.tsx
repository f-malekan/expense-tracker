import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "destructive" | "ghost";
  loading?: boolean;
  fullWidth?: boolean;
}

const BaseButton = ({
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  className = "",
  disabled = false,
  type = "button",
  ...props
}: Props) => {
  const baseStyles =
    "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover",

    secondary:
      "border border-border bg-surface text-text hover:bg-background",

    outline:
      "border border-border bg-transparent text-text hover:bg-surface",

    destructive:
      "bg-destructive text-white hover:opacity-90",

    ghost:
      "bg-transparent text-text-secondary hover:bg-surface hover:text-text",
  };

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading && (
        <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {children}
    </button>
  );
};

export default BaseButton;