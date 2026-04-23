"use client";

import { useEffect, useState } from "react";
import type { SupabasePersistenceApi } from "@/hooks/useSupabaseEventSync";
import type { EventFormState } from "@/types/event";
import { Button } from "@/components/ui/Button";
import { PRINT_SNAPSHOT_KEY } from "@/lib/printReport";

type Props = {
  state: EventFormState;
  persistence: Pick<
    SupabasePersistenceApi,
    | "currentKey"
    | "hasClient"
    | "autosaveLine"
    | "deleteCurrentEvent"
    | "canDeleteCurrent"
    | "isWorking"
  >;
};

export function EventPersistenceBar({ state, persistence }: Props) {
  const { currentKey, hasClient, autosaveLine, deleteCurrentEvent, canDeleteCurrent, isWorking } =
    persistence;
  const [deleteArmed, setDeleteArmed] = useState(false);

  useEffect(() => {
    setDeleteArmed(false);
  }, [currentKey]);

  const onDelete = async () => {
    if (!deleteArmed) {
      setDeleteArmed(true);
      return;
    }
    const confirmed = window.confirm("Confirmi ștergerea evenimentului?");
    if (!confirmed) return;
    setDeleteArmed(false);
    await deleteCurrentEvent();
  };

  const onPrintDocument = () => {
    window.localStorage.setItem(PRINT_SNAPSHOT_KEY, JSON.stringify(state));
    window.open("/print-report", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="no-print flex flex-col gap-1.5 rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm dark:border-zinc-600 dark:bg-zinc-900/40">
      {autosaveLine ? (
        <p
          className={
            autosaveLine === "Eroare la salvare"
              ? "text-xs text-red-600 dark:text-red-400"
              : "text-xs text-zinc-600 dark:text-zinc-400"
          }
        >
          {autosaveLine}
        </p>
      ) : null}

      <div className="mt-1 flex flex-wrap gap-2">
        <Button
          variant={deleteArmed ? "primary" : "secondary"}
          className="py-1.5 text-xs"
          disabled={!hasClient || !canDeleteCurrent || isWorking}
          onClick={() => void onDelete()}
        >
          {deleteArmed ? "Confirmă ștergerea" : "Șterge"}
        </Button>
        <Button variant="secondary" className="py-1.5 text-xs" onClick={onPrintDocument}>
          Print
        </Button>
        <a
          href="/master-menu"
          className="inline-flex items-center rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
        >
          Prețuri master menu
        </a>
      </div>

      {!hasClient ? (
        <p className="text-xs text-amber-700 dark:text-amber-400">
          Configurează NEXT_PUBLIC_SUPABASE_URL și NEXT_PUBLIC_SUPABASE_ANON_KEY în environment variables.
        </p>
      ) : null}
    </div>
  );
}
