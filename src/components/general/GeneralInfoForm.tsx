"use client";

import type { DecorSource, EventFormState, EventSchedule } from "@/types/event";
import type { RestaurantId, VoyageHallId } from "@/types/menu";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { EventScheduleFields } from "@/components/general/EventScheduleFields";
import { EventDateCalendar } from "@/components/general/EventDateCalendar";
import { getDecorSummaryLines } from "@/lib/decorSummary";

type Props = {
  state: EventFormState;
  markedEventDates: string[];
  updateField: <K extends keyof EventFormState>(key: K, value: EventFormState[K]) => void;
  setRestaurantAndSeedMenu: (restaurant: RestaurantId | "") => void;
  updateEventSchedule: (patch: Partial<EventSchedule>) => void;
};

export function GeneralInfoForm({
  state,
  markedEventDates,
  updateField,
  setRestaurantAndSeedMenu,
  updateEventSchedule,
}: Props) {
  const showVoyageHall = state.restaurant === "voyage";

  const decorLines = getDecorSummaryLines(state);

  return (
    <section className="flex flex-col gap-3 rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
      <h2 className="text-sm font-semibold">Date generale</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <Select
            label="Restaurant"
            value={state.restaurant}
            onChange={(e) =>
              setRestaurantAndSeedMenu((e.target.value || "") as RestaurantId | "")
            }
          >
            <option value="">Alege restaurant…</option>
            <option value="tesalia">Tesalia</option>
            <option value="voyage">Voyage</option>
          </Select>

          {showVoyageHall ? (
            <Select
              label="Sală Voyage (voyageHall)"
              value={state.voyageHall}
              onChange={(e) => updateField("voyageHall", e.target.value as VoyageHallId | "")}
            >
              <option value="">Alege sală…</option>
              <option value="isadora">Isadora</option>
              <option value="oliva">Oliva</option>
            </Select>
          ) : null}

          <Input
            type="date"
            label="Data"
            value={state.date}
            onChange={(e) => updateField("date", e.target.value)}
          />
          <EventDateCalendar
            value={state.date}
            markedDates={markedEventDates}
            onSelectDate={(nextDate) => updateField("date", nextDate)}
          />
          <Input
            label="Client"
            value={state.client}
            onChange={(e) => updateField("client", e.target.value)}
          />
          <Input
            type="tel"
            label="Telefon"
            value={state.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          <Input
            type="number"
            min={0}
            label="Adulți"
            value={state.adults || ""}
            onChange={(e) => updateField("adults", Number(e.target.value) || 0)}
          />
          <Input
            type="number"
            min={0}
            label="Copii"
            value={state.children || ""}
            onChange={(e) => updateField("children", Number(e.target.value) || 0)}
          />
          <Input
            type="number"
            min={0}
            label="Copii special"
            value={state.childrenSpecial || ""}
            onChange={(e) => updateField("childrenSpecial", Number(e.target.value) || 0)}
          />
          <Input
            type="number"
            min={0}
            label="Staff"
            value={state.staff || ""}
            onChange={(e) => updateField("staff", Number(e.target.value) || 0)}
          />
          <Toggle
            label="10 staff gratis"
            checked={state.staffFree10}
            onCheckedChange={(v) => updateField("staffFree10", v)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="pt-1">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Decor (decorSource)
            </h3>
            <Select
              label="Sursă decor"
              value={state.decorSource}
              onChange={(e) => updateField("decorSource", e.target.value as DecorSource)}
            >
              <option value="internal">Intern (reguli pe restaurant)</option>
              <option value="external">Extern (mesele × tarif MDL — la calcule)</option>
            </Select>

            {state.decorSource === "external" ? (
              <div className="space-y-2">
                <Input
                  type="number"
                  min={0}
                  label="Număr mese (externalTableCount)"
                  value={state.externalTableCount || ""}
                  onChange={(e) =>
                    updateField("externalTableCount", Number(e.target.value) || 0)
                  }
                />
                <Toggle
                  label="Fețe de masă de la noi"
                  checked={state.externalTableclothsFromUs}
                  onCheckedChange={(v) => updateField("externalTableclothsFromUs", v)}
                />
              </div>
            ) : null}

            <div className="mt-2 rounded-md bg-zinc-100 p-2 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {decorLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <Input
              className="mt-2"
              label="Note decor (opțional)"
              value={state.decor}
              onChange={(e) => updateField("decor", e.target.value)}
            />
          </div>

          <div className="pt-2">
            <EventScheduleFields schedule={state.eventSchedule} onChange={updateEventSchedule} />
          </div>
        </div>
      </div>
    </section>
  );
}
