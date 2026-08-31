import { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string[];
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
  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-text">
          {label}
        </label>
      )}

      <select
        {...props}
        disabled={disabled}
        className={`
          w-full h-11 rounded-xl px-4
          border border-border
          bg-surface
          text-sm text-text
          outline-none transition-colors
          focus:border-primary focus:ring-2 focus:ring-primary/20
          disabled:opacity-60 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {children}
      </select>

      {error?.map((err) => (
        <span key={err} className="block text-sm text-destructive">
          {err}
        </span>
      ))}
    </div>
  );
};

export default BaseSelectbox;