import type { SelectHTMLAttributes } from "react";
import { clsx } from "clsx";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ className, id, label, children, ...props }: SelectProps) {
  const selectId = id ?? props.name;
  return (
    <div className="flex min-w-0 w-full flex-col gap-1">
      {label ? (
        <label htmlFor={selectId} className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={clsx(
          "min-w-0 w-full rounded-md border border-zinc-300 bg-background px-2 py-1.5 text-sm dark:border-zinc-600",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
