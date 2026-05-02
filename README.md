# SportScope — Sports Analytics Dashboard

A React-based sports analytics platform built for the Capstone Project.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| State Management | Redux Toolkit |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| API | API-Sports (football) |
| Auth | Firebase Authentication |
| Charts | Recharts |
| Forms | React Hook Form + Yup |
| Deployment | Vercel |

## Features

1. **Dashboard with charts** — Goals trend, top scorers bar chart, league standings
2. **Search + filter + sort** — Debounced search, country filter, name/country sort
3. **Authentication + roles** — Firebase Auth, Google sign-in, Guest/Fan/Admin roles, protected routes
4. **Real-time data refresh** — Live match scores auto-refresh every 30 seconds
5. **Multi-step registration** — 3-step form with per-step Yup validation

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

**API-Sports**: Get a free key at https://dashboard.api-football.com/  
**Firebase**: Create a project at https://console.firebase.google.com/

### 3. Run development server

```bash
npm run dev
```

> **No API key?** The app automatically uses mock data — you can develop and test all features without any API keys.

### 4. Deploy to Vercel

```bash
npm run build
# Then drag the dist/ folder to vercel.com, or connect your GitHub repo
```

Set environment variables in Vercel Dashboard → Project Settings → Environment Variables.

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Layout wrapper
│   ├── ui/           # Reusable components (cards, badges, spinner)
│   └── charts/       # Recharts wrappers
├── pages/            # Home, Dashboard, Leagues, PlayerProfile, Compare, Register, Login
├── features/
│   ├── auth/         # authSlice
│   ├── matches/      # matchesSlice + async thunks
│   ├── players/      # playersSlice + async thunks
│   └── leagues/      # leaguesSlice + async thunks
├── hooks/            # useDebounce, useLiveRefresh, useAuth, useRole
├── routes/           # ProtectedRoute, RoleRoute
├── services/         # firebase.js, sportsApi.js, mockData.js
└── store/            # Redux store config
```

## Pages / Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Live matches + top scorers |
| `/leagues` | Public | Browse & search leagues |
| `/player/:id` | Public | Player profile + radar chart |
| `/dashboard` | Fan+ | Charts: trends, standings |
| `/compare` | Fan+ | Side-by-side player comparison |
| `/register` | Public | 3-step registration form |
| `/login` | Public | Email + Google sign-in |

## Anti-Plagiarism Notes

- Domain: **Sports Analytics**
- API: **API-Sports (football v3)**
- Unique features: role-based access, live score refresh with Redux thunks, multi-step Yup validation, player compare radar chart
