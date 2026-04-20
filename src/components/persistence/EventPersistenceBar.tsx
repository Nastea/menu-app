"use client";

import type { SupabasePersistenceApi } from "@/hooks/useSupabaseEventSync";

type Props = {
  persistence: Pick<SupabasePersistenceApi, "currentKey" | "hasClient" | "loadLine" | "autosaveLine">;
};

export function EventPersistenceBar({ persistence }: Props) {
  const { currentKey, hasClient, loadLine, autosaveLine } = persistence;

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm dark:border-zinc-600 dark:bg-zinc-900/40">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-semibold text-zinc-800 dark:text-zinc-100">event_key</span>
        <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
          {currentKey ?? "— (incomplet: restaurant + dată + sală pentru Voyage)"}
        </span>
      </div>

      {loadLine ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{loadLine}</p>
      ) : null}

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

      {!hasClient ? (
        <p className="text-xs text-amber-700 dark:text-amber-400">
          Configurează NEXT_PUBLIC_SUPABASE_URL și NEXT_PUBLIC_SUPABASE_ANON_KEY în `.env.local`.
        </p>
      ) : null}
    </div>
  );
}
