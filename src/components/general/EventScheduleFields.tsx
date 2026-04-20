"use client";

import type { EventSchedule, ScheduleMinute, ScheduleMoment } from "@/types/event";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

type Props = {
  schedule: EventSchedule;
  onChange: (patch: Partial<EventSchedule>) => void;
};

const MINUTES: ScheduleMinute[] = [0, 30];

const HOURS = Array.from({ length: 24 }, (_, i) => i);

type NullableKey = Exclude<
  keyof EventSchedule,
  "eventEnd"
>;

const LABELS: Record<keyof EventSchedule, string> = {
  bridalArrival: "Sosire miri",
  guestsArrival: "Sosire oaspeți",
  firstMeal: "Prima masă",
  mainMeal: "Masa mare",
  cake: "Torta",
  eventEnd: "Finisare eveniment",
};

function MomentRow({
  label,
  value,
  onChange,
  nullable,
}: {
  label: string;
  value: ScheduleMoment | null;
  onChange: (next: ScheduleMoment | null) => void;
  nullable: boolean;
}) {
  const setHour = (raw: string) => {
    if (raw === "") {
      if (nullable) onChange(null);
      return;
    }
    const hour = Number(raw);
    const minute = value?.minute ?? 0;
    onChange({ hour, minute: minute as ScheduleMinute });
  };

  const setMinute = (raw: string) => {
    const minute = Number(raw) as ScheduleMinute;
    if (value) onChange({ ...value, minute });
    else onChange({ hour: 0, minute });
  };

  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto] items-end gap-2">
      <span className="pb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <Select
        aria-label={`${label} oră`}
        value={value === null ? "" : String(value.hour)}
        onChange={(e) => setHour(e.target.value)}
        className="min-w-[4.5rem]"
      >
        {nullable ? <option value="">—</option> : null}
        {HOURS.map((h) => (
          <option key={h} value={h}>
            {String(h).padStart(2, "0")}
          </option>
        ))}
      </Select>
      <span className="pb-2 text-xs">:</span>
      <Select
        aria-label={`${label} minute`}
        value={value === null ? "" : String(value.minute)}
        onChange={(e) => setMinute(e.target.value)}
        disabled={value === null}
        className="min-w-[4rem]"
      >
        {value === null ? <option value="">—</option> : null}
        {MINUTES.map((m) => (
          <option key={m} value={m}>
            {String(m).padStart(2, "0")}
          </option>
        ))}
      </Select>
    </div>
  );
}

const ORDERED_KEYS: (keyof EventSchedule)[] = [
  "bridalArrival",
  "guestsArrival",
  "firstMeal",
  "mainMeal",
  "cake",
  "eventEnd",
];

export function EventScheduleFields({ schedule, onChange }: Props) {
  const setNullable = (key: NullableKey, next: ScheduleMoment | null) => {
    onChange({ [key]: next } as Partial<EventSchedule>);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Program eveniment
      </h3>
      {ORDERED_KEYS.map((key) => {
        if (key === "eventEnd") {
          return (
            <MomentRow
              key={key}
              label={LABELS.eventEnd}
              value={schedule.eventEnd}
              nullable={false}
              onChange={(next) => {
                if (next) onChange({ eventEnd: next });
              }}
            />
          );
        }
        const k = key as NullableKey;
        return (
          <div key={key} className="flex flex-col gap-1">
            <MomentRow
              label={LABELS[k]}
              value={schedule[k]}
              nullable
              onChange={(next) => setNullable(k, next)}
            />
            {schedule[k] !== null ? (
              <Button
                type="button"
                variant="ghost"
                className="self-end text-xs py-1"
                onClick={() => setNullable(k, null)}
              >
                Șterge ora
              </Button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
