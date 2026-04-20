import type { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className, id, label, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex min-w-0 w-full flex-col gap-1">
      {label ? (
        <label htmlFor={inputId} className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={clsx(
          "min-w-0 w-full rounded-md border border-zinc-300 bg-background px-2 py-1.5 text-sm dark:border-zinc-600",
          className,
        )}
        {...props}
      />
    </div>
  );
}
