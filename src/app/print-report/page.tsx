"use client";

import { useEffect, useMemo } from "react";
import type { EventFormState } from "@/types/event";
import { PRINT_SNAPSHOT_KEY, buildPrintHtml } from "@/lib/printReport";

export default function PrintReportPage() {
  const htmlDoc = useMemo(() => {
    if (typeof window === "undefined") return "";
    const raw = window.localStorage.getItem(PRINT_SNAPSHOT_KEY);
    if (!raw) return "<p>Lipsește snapshot-ul pentru print.</p>";
    try {
      const state = JSON.parse(raw) as EventFormState;
      return buildPrintHtml(state);
    } catch {
      return "<p>Snapshot invalid pentru print.</p>";
    }
  }, []);

  const bodyHtml = useMemo(() => {
    if (!htmlDoc) return "";
    const m = htmlDoc.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    return m ? m[1] : htmlDoc;
  }, [htmlDoc]);

  const styleHtml = useMemo(() => {
    if (!htmlDoc) return "";
    const m = htmlDoc.match(/<style[^>]*>([\s\S]*)<\/style>/i);
    return m ? m[1] : "";
  }, [htmlDoc]);

  useEffect(() => {
    if (!bodyHtml) return;
    const t = window.setTimeout(() => window.print(), 180);
    return () => window.clearTimeout(t);
  }, [bodyHtml]);

  return (
    <main className="mx-auto max-w-[900px] p-4">
      {styleHtml ? <style dangerouslySetInnerHTML={{ __html: styleHtml }} /> : null}
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </main>
  );
}
