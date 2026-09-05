import { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | string[];
  containerClassName?: string;
}

const BaseSelectbox = ({
  label,
  error,
  containerClassName = "",
  className = "",
  disabled = false,
  children,
  ...props
}: Props) => {
  const errors = typeof error === "string" ? [error] : error;

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-text">{label}</label>
      )}

      <select
        {...props}
        disabled={disabled}
        className={`
          h-11 w-full rounded-xl
          border border-border
          bg-surface
          px-4
          text-sm text-text
          outline-none
          transition
          focus:border-primary
          focus:ring-4 focus:ring-primary/10
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${
            error?.length
              ? "border-destructive focus:border-destructive focus:ring-destructive/10"
              : ""
          }
          ${className}
        `}
      >
        {children}
      </select>

      {errors?.map((err) => (
        <span key={err} className="block text-xs text-destructive">
          {err}
        </span>
      ))}
    </div>
  );
};

export default BaseSelectbox;
