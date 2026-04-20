-- MVP: un singur tabel `events`, fără RLS restrictiv (policy permisivă pentru anon).
-- Rulează în Supabase SQL Editor sau via CLI: `supabase db push`
-- gen_random_uuid() e disponibil nativ în PostgreSQL folosit de Supabase.

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  event_key text not null unique,
  restaurant text not null check (restaurant in ('tesalia', 'voyage')),
  voyage_hall text null check (voyage_hall is null or voyage_hall in ('isadora', 'oliva')),
  event_date date not null,
  client_name text not null default '',
  phone text not null default '',
  adults integer not null default 0,
  kids integer not null default 0,
  kids_special integer not null default 0,
  staff integer not null default 0,
  ten_staff_free boolean not null default false,
  decor_source text not null default 'internal' check (decor_source in ('internal', 'external')),
  external_table_count integer not null default 0,
  advance_1 numeric not null default 0,
  advance_2 numeric not null default 0,
  program jsonb not null default '{}'::jsonb,
  menu_categories jsonb not null default '[]'::jsonb,
  extras jsonb not null default '{}'::jsonb,
  notes jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists events_event_date_idx on public.events (event_date);
create index if not exists events_restaurant_idx on public.events (restaurant);

create or replace function public.set_events_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row
  execute procedure public.set_events_updated_at();

alter table public.events enable row level security;

-- MVP: acces complet pentru cheia anon (în producție înlocuiești cu auth real).
drop policy if exists "events_mvp_anon_all" on public.events;

create policy "events_mvp_anon_all"
  on public.events
  for all
  to anon, authenticated
  using (true)
  with check (true);

comment on table public.events is 'Evenimente MVP — unicitate pe event_key (tesalia__date / voyage__hall__date).';
