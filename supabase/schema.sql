-- Jalankan seluruh file ini di Supabase Dashboard > SQL Editor.
create table if not exists public.site_content (
  id text primary key default 'main' check (id = 'main'),
  payload jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

-- Semua pengunjung dapat membaca konten website.
create policy "public can read site content" on public.site_content
for select to anon, authenticated using (true);

-- Ganti alamat ini dengan email admin perusahaan yang dibuat di Authentication > Users.
create policy "only admin can change site content" on public.site_content
for all to authenticated
using ((auth.jwt() ->> 'email') = 'admin@technolife.com')
with check ((auth.jwt() ->> 'email') = 'admin@technolife.com');

insert into public.site_content (id, payload) values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- Storage untuk gambar admin.
insert into storage.buckets (id, name, public) values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;
create policy "public can view site assets" on storage.objects for select to public using (bucket_id = 'site-assets');
create policy "admin can manage site assets" on storage.objects for all to authenticated
using (bucket_id = 'site-assets' and (auth.jwt() ->> 'email') = 'admin@technolife.com')
with check (bucket_id = 'site-assets' and (auth.jwt() ->> 'email') = 'admin@technolife.com');
