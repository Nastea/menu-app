"use client";

import type { EventFormState } from "@/types/event";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Props = {
  state: EventFormState;
  addNoteLine: () => void;
  removeNoteLine: (id: string) => void;
  updateNoteLineText: (id: string, text: string) => void;
};

export function NotesEditor({
  state,
  addNoteLine,
  removeNoteLine,
  updateNoteLineText,
}: Props) {
  return (
    <section className="flex flex-col gap-2 rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
      <h2 className="text-sm font-semibold">Note</h2>
      <div className="flex flex-col gap-2">
        {state.notes.map((line, i) => (
          <div key={line.id} className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-2">
            <div className="min-w-0 flex-1">
              <Input
                label={i === 0 ? "Linia 1" : `Linia ${i + 1}`}
                value={line.text}
                onChange={(e) => updateNoteLineText(line.id, e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              className="shrink-0 text-xs text-red-600 sm:mb-0.5 dark:text-red-400"
              onClick={() => removeNoteLine(line.id)}
            >
              Șterge linia
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="secondary" className="self-start" onClick={addNoteLine}>
        + Linie
      </Button>
    </section>
  );
}
