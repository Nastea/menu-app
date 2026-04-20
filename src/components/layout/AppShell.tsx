"use client";

import type { UseEventFormReturn } from "@/hooks/useEventForm";
import type { SupabasePersistenceApi } from "@/hooks/useSupabaseEventSync";
import { GeneralInfoForm } from "@/components/general/GeneralInfoForm";
import { MenuSelection } from "@/components/menu/MenuSelection";
import { ExtrasSelection } from "@/components/menu/ExtrasSelection";
import { PreviewPanel } from "@/components/preview/PreviewPanel";
import { NotesEditor } from "@/components/preview/NotesEditor";
import { TotalsCard } from "@/components/totals/TotalsCard";
import { EventPersistenceBar } from "@/components/persistence/EventPersistenceBar";

type Props = {
  form: UseEventFormReturn;
  persistence: SupabasePersistenceApi;
};

export function AppShell({ form, persistence }: Props) {
  const {
    state,
    updateField,
    setRestaurantAndSeedMenu,
    updateEventSchedule,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    addNoteLine,
    removeNoteLine,
    updateNoteLineText,
  } = form;

  return (
    <div className="mx-auto grid min-h-0 w-full min-w-0 max-w-[1600px] flex-1 grid-cols-1 gap-3 px-2 py-3 sm:gap-4 sm:px-4 sm:py-4 lg:grid-cols-12 lg:px-6">
      <div className="min-w-0 lg:col-span-12">
        <EventPersistenceBar persistence={persistence} />
      </div>

      <aside className="flex min-w-0 w-full flex-col gap-4 lg:col-span-3">
        <GeneralInfoForm
          state={state}
          updateField={updateField}
          setRestaurantAndSeedMenu={setRestaurantAndSeedMenu}
          updateEventSchedule={updateEventSchedule}
        />
      </aside>

      <main className="flex min-w-0 w-full flex-col gap-4 lg:col-span-6">
        <MenuSelection
          state={state}
          addMenuItem={addMenuItem}
          updateMenuItem={updateMenuItem}
          removeMenuItem={removeMenuItem}
        />
        <ExtrasSelection state={state} updateField={updateField} />
      </main>

      <aside className="flex min-w-0 w-full flex-col gap-4 lg:col-span-3">
        <div className="flex min-w-0 w-full flex-col gap-4 lg:sticky lg:top-4">
          <PreviewPanel state={state} updateField={updateField} />
          <NotesEditor
            state={state}
            addNoteLine={addNoteLine}
            removeNoteLine={removeNoteLine}
            updateNoteLineText={updateNoteLineText}
          />
          <TotalsCard state={state} />
        </div>
      </aside>
    </div>
  );
}
