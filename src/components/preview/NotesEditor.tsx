"use client";

import { useState } from "react";
import type { EventFormState } from "@/types/event";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Props = {
  state: EventFormState;
  addNoteLine: (text: string) => void;
  removeNoteLine: (id: string) => void;
};

export function NotesEditor({ state, addNoteLine, removeNoteLine }: Props) {
  const [draft, setDraft] = useState("");

  const addDraft = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    addNoteLine(trimmed);
    setDraft("");
  };

  return (
    <section className="flex flex-col gap-2 rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
      <h2 className="text-sm font-semibold">Note</h2>
      <div className="flex flex-col gap-2">
        {state.notes.map((line, i) => (
          <div key={line.id} className="flex items-start gap-2">
            <div className="min-w-0 flex-1 px-1 py-0.5 text-sm text-zinc-700 dark:text-zinc-300">
              <p className="whitespace-pre-wrap">
                <span className="mr-1 text-zinc-400">•</span>
                {line.text}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="shrink-0 px-1 py-0.5 text-xs text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
              onClick={() => removeNoteLine(line.id)}
            >
              șterge
            </Button>
          </div>
        ))}
      </div>
      <Input
        label="Adaugă linie nouă"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addDraft();
          }
        }}
      />
      <Button type="button" variant="secondary" className="self-start" onClick={addDraft}>
        + Linie
      </Button>
    </section>
  );
}
