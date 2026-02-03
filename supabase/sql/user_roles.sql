-- Create a simple role table for strict authorization
-- Run this in Supabase SQL editor.

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('admin', 'student')),
  created_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

-- Users can read their own role
create policy "read own role"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

-- Only service role can assign roles (do it from backend/admin tooling)
-- If you want authenticated admins to assign roles, create an RPC and validate admin there.

-- Seed yourself as admin (replace UUID)
-- insert into public.user_roles (user_id, role) values ('00000000-0000-0000-0000-000000000000', 'admin')
-- on conflict (user_id) do update set role = excluded.role;

