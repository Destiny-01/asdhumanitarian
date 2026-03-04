# Lumina Foundation — Website

A modern, responsive charity website built with **Vite + React**, styled with **Tailwind CSS**, and backed by **Supabase** for real-time data and auth.

---

## Tech Stack

| Layer       | Tool                     |
|-------------|--------------------------|
| Framework   | React 18                 |
| Build tool  | Vite 5                   |
| Styling     | Tailwind CSS 3           |
| Routing     | React Router v6          |
| Database    | Supabase (Postgres)      |
| Storage     | Supabase Storage         |
| Auth        | Supabase Auth            |
| Deployment  | Vercel / Netlify         |

---

## Project Structure

```
lumina-foundation/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Work.jsx
│   │   ├── Donate.jsx
│   │   └── admin/
│   │       ├── Admin.jsx       ← orchestrates session
│   │       ├── AdminLogin.jsx
│   │       └── AdminPanel.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── WorkCard.jsx
│   │   └── Notification.jsx
│   ├── lib/
│   │   └── supabase.js         ← all DB/auth/storage helpers
│   ├── App.jsx                 ← router + notification context
│   ├── main.jsx
│   └── index.css               ← Tailwind + brand tokens
├── .env.example                ← safe to commit
├── .env.local                  ← NEVER commit this
├── tailwind.config.js
├── vite.config.js
└── supabase-setup.sql          ← run once in Supabase SQL editor
```

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd lumina-foundation
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste and run `supabase-setup.sql`
3. Go to **Storage** → New Bucket → name: `project-images` → **Public: ON**
4. Go to **Authentication → Users** → Add User → set the client's email + password

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values from **Supabase → Settings → API**:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ `.env.local` is gitignored. Never commit it. The anon key is safe to use client-side — Supabase RLS policies control what it can access.

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## Deployment (Vercel — recommended)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add environment variables in the Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. Every `git push` auto-deploys.

---

## Admin Access

- URL: `/admin`
- Login with the email/password you created in Supabase Auth
- You can add projects (with image upload), view, and delete
- Changes are instantly live on the public site

---

## TODO / Next Steps

- [ ] Wire up real payment gateway (Stripe / Paystack / Flutterwave) in `Donate.jsx`
- [ ] Add project edit functionality in `AdminPanel.jsx`
- [ ] Add individual project detail pages (`/work/:id`)
- [ ] Replace team placeholder avatars with real photos
- [ ] Add mobile hamburger nav
- [ ] Add a blog / news section
- [ ] Add fundraising goal / progress bar on Donate page
- [ ] Connect social media links in Footer
- [ ] Add a contact form
