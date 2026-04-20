-- Upgrade de la `advance_*` text la numeric (dacă ai aplicat o versiune veche a migrației 001).
-- Pe o bază nouă creată doar din 20260415120000, coloanele sunt deja numeric — acest script
-- rămâne compatibil (SET DATA TYPE numeric USING …).

alter table public.events
  alter column advance_1 type numeric using coalesce(nullif(trim(advance_1::text), '')::numeric, 0);

alter table public.events
  alter column advance_2 type numeric using coalesce(nullif(trim(advance_2::text), '')::numeric, 0);

alter table public.events
  alter column advance_1 set default 0,
  alter column advance_1 set not null;

alter table public.events
  alter column advance_2 set default 0,
  alter column advance_2 set not null;
