create table if not exists public.master_menu_items (
  restaurant text not null check (restaurant in ('tesalia', 'voyage')),
  category_id text not null,
  category_name text not null,
  item_id text not null,
  item_name text not null default '',
  quantity_or_weight text not null default '',
  adult_price numeric not null default 0,
  kids_included boolean not null default true,
  staff_included boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  primary key (restaurant, category_id, item_id)
);

create index if not exists master_menu_items_restaurant_sort_idx
  on public.master_menu_items (restaurant, sort_order);

create or replace function public.set_master_menu_items_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists master_menu_items_set_updated_at on public.master_menu_items;
create trigger master_menu_items_set_updated_at
  before update on public.master_menu_items
  for each row
  execute procedure public.set_master_menu_items_updated_at();

alter table public.master_menu_items enable row level security;

drop policy if exists "master_menu_items_mvp_anon_all" on public.master_menu_items;
create policy "master_menu_items_mvp_anon_all"
  on public.master_menu_items
  for all
  to anon, authenticated
  using (true)
  with check (true);
