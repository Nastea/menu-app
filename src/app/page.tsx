"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useEventForm } from "@/hooks/useEventForm";
import { useSupabaseEventSync } from "@/hooks/useSupabaseEventSync";

export default function Home() {
  const form = useEventForm();
  const persistence = useSupabaseEventSync(form);

  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col">
      <AppShell form={form} persistence={persistence} />
    </main>
  );
}
