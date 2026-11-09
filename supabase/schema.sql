create table if not exists public.site_content (
  key text primary key check (key in ('settings', 'products', 'categories')),
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.site_admins enable row level security;

grant select on public.site_admins to authenticated;

drop policy if exists "Admins can view their own access" on public.site_admins;
create policy "Admins can view their own access"
  on public.site_admins
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.site_admins
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_site_admin() from public, anon;
grant execute on function public.is_site_admin() to authenticated;

alter table public.site_content enable row level security;

grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;

drop policy if exists "Anyone can view site content" on public.site_content;
create policy "Anyone can view site content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated admins manage site content" on public.site_content;
create policy "Authenticated admins manage site content"
  on public.site_content
  for all
  to authenticated
  using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()));

do $$
begin
  alter publication supabase_realtime add table public.site_content;
exception
  when duplicate_object then null;
end
$$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  12582912,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view site media" on storage.objects;
create policy "Anyone can view site media"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'site-media');

drop policy if exists "Authenticated admins manage site media" on storage.objects;
create policy "Authenticated admins manage site media"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'site-media' and (select public.is_site_admin()))
  with check (bucket_id = 'site-media' and (select public.is_site_admin()));
