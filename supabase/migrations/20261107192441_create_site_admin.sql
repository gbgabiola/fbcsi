create table public.site_admin (
  singleton boolean primary key default true check (singleton),
  user_id uuid not null references auth.users (id) on delete cascade
);

alter table public.site_admin enable row level security;

revoke all on table public.site_admin from public, anon, authenticated;
grant select (user_id) on table public.site_admin to authenticated;

create policy "Only the registered administrator can read the assignment"
  on public.site_admin for select to authenticated
  using (
    user_id = (select auth.uid())
    and coalesce((select auth.jwt() ->> 'is_anonymous'), 'false') = 'false'
  );
