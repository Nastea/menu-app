"use client";

import { clsx } from "clsx";

type ToggleProps = {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
};

export function Toggle({
  checked,
  onCheckedChange,
  label,
  disabled,
  className,
}: ToggleProps) {
  return (
    <label
      className={clsx(
        "inline-flex cursor-pointer items-center gap-2 text-sm select-none",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={clsx(
          "relative h-6 w-10 shrink-0 rounded-full border border-zinc-300 transition-colors dark:border-zinc-600",
          checked ? "bg-foreground" : "bg-zinc-200 dark:bg-zinc-700",
        )}
      >
        <span
          className={clsx(
            "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-4",
          )}
        />
      </button>
      <span>{label}</span>
    </label>
  );
}
