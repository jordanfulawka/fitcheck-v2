# FitCheck

> **Status: In Active Development** — Features are being added and the API surface is not yet stable.

A full-stack job application tracker that helps you stay on top of your search — log applications, visualize progress, drag cards through hiring stages, and score your resume against any job description using AI.

Built as a portfolio project to demonstrate a production-grade React/Next.js frontend integrated with a REST API and an LLM-powered matching engine.

---

## The Problem

Job searching is scattered across browser tabs, spreadsheets, and memory. FitCheck gives you a single dashboard: how many applications went out, which ones are moving, and where your resume falls short before you apply.

---

## Features

| View                 | What it does                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Dashboard**        | Live stats — total applications, interviews scheduled, offers received, rejections — plus an application activity bar chart                                  |
| **Job List**         | Paginated table of every application with Company, Role, Date Applied, and Status                                                                            |
| **Status Tracker**   | Drag-and-drop Kanban board (Applied → Phone Screen → Interview → Offer → Rejected) powered by `@dnd-kit`                                                     |
| **AI Match Checker** | Upload your resume (PDF/DOC/DOCX), paste a job description, get a scored match report with matched/missing skills, strengths, gaps, and an AI recommendation |

---

## Tech Stack

**Frontend**

- [Next.js 16](https://nextjs.org/) (App Router) with React 19
- TypeScript 5
- Tailwind CSS v4
- Recharts (activity chart)
- @dnd-kit (drag-and-drop Kanban)
- Axios (API client)
- react-hot-toast (notifications)

**Backend** — REST API (see backend repo, link TBD)

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9+ (or pnpm/yarn)
- A running backend API instance — set its base URL via the env var below

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/jordanfulawka/fitcheck-v2.git
cd fitcheck-v2/client

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Then edit .env.local and set API_URL (see Environment Variables below)

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the Dashboard.

### Verify it works

Navigate to **Job List**. If your API is running and seeded, you'll see a table of jobs populate. If the page renders (even empty) without a crash, the frontend is wired up correctly.

---

## Environment Variables

Create a `.env.local` file inside `client/`:

```env
# Base URL of your FitCheck backend API — no trailing slash
API_URL=https://fitcheck-v2.onrender.com
```

| Variable  | Required | Description               |
| --------- | -------- | ------------------------- |
| `API_URL` | Yes      | Backend REST API base URL |

---

## Key Commands

All commands are run from the `client/` directory.

```bash
npm run dev      # Start dev server with hot reload (localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

---

## Project Structure

```
fitcheck-v2/
└── client/                    # Next.js frontend
    ├── app/
    │   ├── (app)/             # Authenticated app shell
    │   │   ├── dashboard/     # Overview stats + activity chart
    │   │   ├── job-list/      # Paginated applications table
    │   │   ├── status-tracker/# Drag-and-drop Kanban board
    │   │   └── ai-matcher/    # Resume vs. JD AI scoring
    │   ├── contexts/          # React context (JobModal state)
    │   └── layout.tsx         # Root layout
    ├── components/            # Shared UI components
    ├── lib/
    │   └── api/               # Axios API wrappers (jobs, match)
    ├── types/                 # TypeScript type definitions
    └── public/                # Static assets
```

---

## Roadmap

- [ ] Authentication (sign up / log in)
- [ ] Backend repo & deployment guide
- [ ] Settings page (profile, preferences)
- [ ] Mobile-responsive layout
- [ ] Export applications to CSV

---
