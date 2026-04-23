"use client";

import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";

type Props = {
  value: string;
  markedDates: string[];
  onSelectDate: (nextDate: string) => void;
};

const WEEKDAYS = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"];

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, delta: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseIsoDate(iso: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function buildMonthGrid(monthStart: Date): Date[] {
  const firstWeekday = (monthStart.getDay() + 6) % 7;
  const gridStart = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1 - firstWeekday);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });
}

export function EventDateCalendar({ value, markedDates, onSelectDate }: Props) {
  const parsedSelected = parseIsoDate(value);
  const [viewMonth, setViewMonth] = useState<Date>(() => startOfMonth(parsedSelected ?? new Date()));

  useEffect(() => {
    if (!parsedSelected) return;
    setViewMonth(startOfMonth(parsedSelected));
  }, [parsedSelected?.getFullYear(), parsedSelected?.getMonth(), value]);

  const markedSet = useMemo(() => new Set(markedDates), [markedDates]);
  const cells = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);

  return (
    <div className="rounded-lg bg-white/80 p-2 dark:bg-zinc-950/40">
      <div className="mb-2 flex items-center justify-between">
        <Button
          variant="ghost"
          className="px-2 py-1 text-xs"
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
        >
          {"<"}
        </Button>
        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
          {viewMonth.toLocaleDateString("ro-RO", { month: "long", year: "numeric" })}
        </p>
        <Button
          variant="ghost"
          className="px-2 py-1 text-xs"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
        >
          {">"}
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-zinc-500 dark:text-zinc-400">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d) => {
          const inMonth = d.getMonth() === viewMonth.getMonth();
          const key = dateKey(d);
          const isSelected = key === value;
          const isMarked = markedSet.has(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate(key)}
              className={clsx(
                "relative h-8 rounded-md text-xs transition-colors",
                inMonth
                  ? "text-zinc-800 hover:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  : "text-zinc-400 hover:bg-zinc-100 dark:text-zinc-600 dark:hover:bg-zinc-900",
                isSelected && "bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900",
              )}
            >
              {d.getDate()}
              {isMarked ? (
                <span
                  className={clsx(
                    "absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full",
                    isSelected ? "bg-white dark:bg-zinc-900" : "bg-emerald-500",
                  )}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
