-- ══════════════════════════════════════════
--  LUMINA FOUNDATION — Supabase Setup SQL
--  Run this in your Supabase SQL Editor
-- ══════════════════════════════════════════

-- 1. Projects table
create table projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null check (category in ('education','health','livelihoods','infrastructure')),
  year        integer not null,
  description text not null,
  location    text,
  image_url   text,
  color       text default '#2a4a37',
  created_at  timestamptz default now()
);

-- 2. Seed with starter data
insert into projects (title, category, year, description, location, color) values
  ('Digital Classrooms in Rural Kenya', 'education', 2024, 'Equipped 12 schools with solar-powered computer labs, training 340 teachers in digital literacy.', 'Nairobi Region, Kenya', '#2a4a37'),
  ('Clean Water Initiative — Arid Regions', 'health', 2023, 'Installed 24 borehole systems serving 8,000+ residents in three underserved northern districts.', 'Northern Kenya', '#5c4a32'),
  ('Women''s Cooperative Seed Fund', 'livelihoods', 2023, 'Launched 30 women-led cooperatives with startup capital, mentoring, and market access support.', 'Lagos, Nigeria', '#2a3e5c'),
  ('Rural Health Clinics Network', 'health', 2022, 'Built and staffed 8 primary health clinics serving remote communities with limited medical access.', 'Rift Valley, Kenya', '#3d2a4a'),
  ('Youth Coding Bootcamps', 'education', 2022, 'Trained 500 youth aged 16–24 in software development, with 60% securing employment within 6 months.', 'Accra, Ghana', '#2a4a4a'),
  ('Bridge Construction — Flood Zone', 'infrastructure', 2021, 'Built 4 permanent bridges in flood-prone regions, reconnecting 3 isolated villages to markets and schools.', 'Bangladesh', '#4a3a2a');

-- 3. Row Level Security — allow public reads, restrict writes to authenticated (admin)
alter table projects enable row level security;

create policy "Public can read projects"
  on projects for select
  using (true);

create policy "Authenticated users can insert"
  on projects for insert
  to authenticated
  with check (true);

create policy "Authenticated users can delete"
  on projects for delete
  to authenticated
  using (true);

create policy "Authenticated users can update"
  on projects for update
  to authenticated
  using (true);


-- ── STORAGE BUCKET FOR PROJECT IMAGES ──
-- Run this separately in the Supabase Dashboard:
-- Storage → New Bucket → Name: "project-images" → Public: ON
-- (Can't create buckets via SQL editor, do it in the UI)


-- ══════════════════════════════════════════
--  ADMIN USER
--  Go to: Authentication → Users → Add User
--  Set the email + password your client will use
--  That's it. No extra config needed.
-- ══════════════════════════════════════════
