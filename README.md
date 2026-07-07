# Harith Malan — Portfolio

A React + Three.js portfolio: scroll-driven 3D hero, an interactive skills
grid, a cinematic horizontal project gallery, animated background birds,
background music with a mute toggle, and an admin panel (Supabase Auth +
Postgres + Storage) so you can add/edit/delete projects and moderate visitor
reviews without touching code.

## Stack

- **React 19 + Vite** — build tooling
- **react-three-fiber / drei / three** — the 3D hero core & decorative shapes
- **framer-motion + GSAP/ScrollTrigger + Lenis** — scroll reveals, parallax, smooth scroll
- **Tailwind CSS v4** — styling, custom design tokens in `src/index.css`
- **Supabase** (Auth, Postgres, Storage) — powers `/admin` and public reviews
- **react-router-dom** — routing (`/`, `/admin/login`, `/admin`)

## Run locally

```bash
npm install
npm run dev
```

The site works immediately with **no Supabase setup** — projects/reviews come
from `src/lib/projectsData.js` and `src/lib/reviewsData.js` (fallback/seed
data), and `/admin` will show a "Supabase not configured" message until you
add keys.

## Setting up Supabase

You do **not** need a GitHub account — Supabase's dashboard has a plain
email/password signup.

1. Go to supabase.com/dashboard/sign-up and create an account + a new project (pick a region close to your visitors).
2. **Get your API keys**: Project Settings → API → copy the **Project URL** and the **anon/public key**.
3. Copy `.env.example` to `.env` and fill in:

   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

4. **Create the tables** — go to the SQL Editor in the Supabase dashboard and run:

   ```sql
   create table projects (
     id uuid primary key default gen_random_uuid(),
     title text not null,
     tagline text,
     description text not null,
     tech text[] default '{}',
     link text,
     repo text,
     image text,
     featured boolean default false,
     order_index int default 0,
     created_at timestamptz default now()
   );

   create table reviews (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     role text,
     message text not null,
     rating int not null check (rating between 1 and 5),
     approved boolean default false,
     created_at timestamptz default now()
   );
   ```

5. **Row Level Security** — enable RLS and add policies so visitors can read published content and submit reviews, but only you (signed in) can write projects or moderate reviews:

   ```sql
   alter table projects enable row level security;
   alter table reviews enable row level security;

   -- Anyone can read projects
   create policy "public read projects" on projects
     for select using (true);

   -- Only signed-in users (you) can add/edit/delete projects
   create policy "auth write projects" on projects
     for all using (auth.uid() is not null) with check (auth.uid() is not null);

   -- Anyone can read *approved* reviews; you can read all of them
   create policy "public read approved reviews" on reviews
     for select using (approved = true or auth.uid() is not null);

   -- Anyone can submit a review, but only as pending (approved = false)
   create policy "public insert pending reviews" on reviews
     for insert with check (approved = false);

   -- Only you can approve/unpublish/delete reviews
   create policy "auth moderate reviews" on reviews
     for update using (auth.uid() is not null);
   create policy "auth delete reviews" on reviews
     for delete using (auth.uid() is not null);
   ```

6. **Storage bucket for project images** — Storage → New bucket → name it `projects` → toggle **Public bucket** on (so images can be viewed without auth). Then add policies (Storage → Policies):

   ```sql
   create policy "public read project images" on storage.objects
     for select using (bucket_id = 'projects');

   create policy "auth upload project images" on storage.objects
     for insert with check (bucket_id = 'projects' and auth.uid() is not null);
   ```

7. **Create your admin login** — Authentication → Users → Add user → enter your email + a password. This is what you'll use to sign in at `/admin`.

8. Restart `npm run dev`, go to `/admin/login`, sign in, and start adding projects.

### The free-tier catch to know about

Supabase's free tier doesn't need a credit card and doesn't expire, but a
**free project auto-pauses after 7 days with no activity** (it just needs one
click to "Resume" from the dashboard when that happens — no data is lost).
If you want it to never sleep, either visit the site/admin at least once a
week, or set up a free scheduled ping (a GitHub Actions cron job or a service
like UptimeRobot hitting your Supabase URL) — not required, just convenient.

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. In Vercel: **Add New Project** → import the repo. Framework preset: **Vite** (auto-detected).
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel's Project Settings → Environment Variables.
4. Deploy. `vercel.json` is already included so client-side routes like `/admin` work on refresh/direct load.

## Before you deploy — two things to update

1. **Social links** — `src/lib/constants.js` has placeholder GitHub/LinkedIn/Instagram URLs. Swap in your real profile URLs there; it's the single source used by the nav and contact section.

2. **CV download** — also in `src/lib/constants.js`, `CV_URL` points at your Google Drive file using the `uc?export=download` format, which triggers a direct download instead of opening the preview page. Two things to check on the Drive side:
   - File sharing must be set to **"Anyone with the link" → Viewer**, or the download will 403 for visitors.
   - Very large files can show Google's "can't scan for viruses" interstitial instead of downloading directly — shouldn't be an issue for a normal résumé PDF.

## Background music

The mute/unmute button in the bottom-right controls a background track,
played through the actual YouTube embedded player (muted by default, since
browsers block unmuted autoplay). To change the track, edit `VIDEO_ID` in
`src/components/BackgroundMusic.jsx`. Make sure you have the right to use
whatever track you point it at as site music.

## Project structure

```
src/
  components/         shared UI (Nav, HUDFrame, ProjectCard-alternatives, SectionLabel,
                       AmbientBackground, BackgroundMusic, FloatingActions, CustomCursor…)
  components/three/   the 3D pieces (SignalCore, DecorativeCore)
  sections/            Hero, Stats, About, Skills, Projects, Experience, Reviews, Contact
  pages/               Home, and admin/ (Login, Dashboard, ProjectForm, ReviewsPanel, ProtectedRoute)
  context/             AuthContext (Supabase auth state)
  lib/                 supabase.js (init), constants.js (CV/social links),
                       projectsData.js + reviewsData.js (fallback content)
```

## Customizing

- **Colors/fonts** — edit the CSS variables and `@import` at the top of `src/index.css`.
- **Copy** — About/Experience/Contact text lives directly in their section files.
- **Seed projects** — edit `src/lib/projectsData.js`; shown before any Supabase project exists.
- **Seed reviews** — edit `src/lib/reviewsData.js`; shown before any approved Supabase review exists.
- **3D core** — `src/components/three/SignalCore.jsx`, tune geometry, colors, or speed there.
- **Background birds/particles** — `src/components/AmbientBackground.jsx`; adjust the `BIRDS`/`ORBS` arrays for density, speed, and opacity.
