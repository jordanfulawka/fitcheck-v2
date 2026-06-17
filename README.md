# FitCheck

_A fully functional job tracker application written using Next.js, featuring an analytics dashboard showing daily and monthly activity, a Kanban board for status tracking, and an AI "fit-check" feature to track job fit._

  <p align="center">
    <a href="https://fitcheck-v2.vercel.app/">Live </a>
    &middot;
    <a href="https://github.com/jordanfulawka/fitcheck-v2/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/jordanfulawka/fitcheck-v2/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>

In 2026, it's not uncommon for job seekers to be sending out hundreds of job applications in pursuit of finding their dream job. It can be really hard to keep track of all of these applications, especially when they're spread across platforms like LinkedIn, Indeed, and internal job sites. Usually, people will try and juggle applications across spreadsheets, text docs, emails and this inevitably leads to losing track of statuses and deadlines. Finding myself succumbing to the same problem, I decided to build FitCheck. FitCheck is a full-stack job application tracker that is built with Next.js, React, and MongoDB. In its current state, FitCheck comes with the following features:

- Secure Authentication - Sign in with Google OAuth via NextAuth.js, keeping your job search data private and tied to your account only
- Kanban Board - Drag-and-drop board (built with dnd-kit) for tracking each application's status: applied, interviewing, offer, rejected
- Analytics Dashboard - Visualize your job search activity with daily and monthly charts (using Recharts) showing application volume over time
- Paginated Job List - Searchable, filterable, paginated list view of every application with inline status updates and an optimistic UI.
- AI Powered Fit-Check - Upload a resume (PDF parsing via pdf-parse) and a job description to get an AI-powered fit score from Claude, showing how well you match the role before you apply. You're given an overall match score from 0 - 100, lists showing which skills match and which are missing, application strengths and gaps, as well as a short recommendation on how you can improve your profile / cover letter to better match the role.

## Built With

### Frontend (client)

- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS 4
- NextAuth.js (Google OAuth)
- @dnd-kit (drag-and-drop for the Kanban Board)
- Recharts (analytics charts)
- Axios
- React Hot Toast
- Lucide React (icons)

### Backend (server)

- Node.js + Express 5
- MongoDB + Mongoose
- Anthropic Claude SDK (AI fit-check)
- pdf-parse-new (resume parsing)
- Multer (file uploads)
- CORS, dotenv

## Getting Started

Following are instructions to install and setup the project should you want to run this app on your local machine.

1. Clone the repo
2. Install dependencies: `npm install` in the root, `client/`, and `server/` directories
3. Set up Google OAuth Credentials:
   - Go to Google Cloud Console -> create a project -> APIs & Services -> Credentials
   - Create an OAuth Client ID (web applications)
   - Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI
4. Create `client/.env.local`
   NEXT_PUBLIC_API_URL=http://localhost:3001
   API_URL=http://localhost:3001
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<generate with openssl rand -base64 32>
   GOOGLE_CLIENT_ID=<from step 3>
   GOOGLE_CLIENT_SECRET=<from step 3>
5. Create `server/.env`
   - DB_USER=<your MongoDB user>
   - DB_PASSWORD=<your MongoDB password>
   - DB_CONNECTION_STRING=<your MongoDB connection string>
   - ANTHROPIC_API_KEY=<from Anthropic console>
   - FRONTEND_URL=http://localhost:3000
6. Run both client and server: `npm run dev` (from root directory)

## Roadmap

- [ ] Resume version history / multiple resume supports
- [ ] Better integration for interviewing, calendar implementation with reminders for follow-ups and interview dates
- [ ] Browser Extensions to save job posting directly from LinkedIn / Indeed
- [ ] Export application data (CSV/PDF)
- [ ] Dark mode

## Contact

Jordan Fulawka - [jordan.fulawka@outlook.com](mailto:jordan.fulawka@outlook.com)

Portfolio - [jordanfulawka.ca](https://jordanfulawka.ca)
LinkedIn: [linkedin.com/in/jordan-fulawka](https://www.linkedin.com/in/jordanfulawka/)
GitHub: [@jordanfulawka](https://github.com/jordanfulawka)

Project Link: [github.com/jordanfulawka/fitcheck-v2](https://github.com/jordanfulawka/fitcheck-v2)
