# Online Assessment Platform

> A full-stack online assessment platform built for **Akij Resource**, featuring Employer and Candidate panels with real-time exam management, multi-step form workflows, and behavioral tracking.

## Live Demo

**[https://i-bos-interview-task-172d.vercel.app](https://i-bos-interview-task-172d.vercel.app)**

## Video Walkthrough

**[Watch Video Walkthrough](https://drive.google.com/drive/folders/1051fobRaJrxGWDpufngGPXqn38a23plI?usp=drive_link)**

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| State Management | Zustand |
| Forms & Validation | React Hook Form + Zod |
| UI Components | shadcn/ui + Tailwind CSS v4 |
| Data Fetching | TanStack React Query + Axios |
| Backend | Next.js API Routes |
| Database | Prisma 7 + SQLite (libSQL adapter) |
| Authentication | JWT (jose) |
| Deployment | Vercel |

---

## Features

### Employer Panel
- [x] Login with email/password authentication
- [x] Dashboard with exam cards, search, and pagination
- [x] Empty state when no exams exist
- [x] Create online test via multi-step form (Basic Info -> Questions)
- [x] Step 1: Basic information form with validation
- [x] Step 1: Read-only review mode with edit capability
- [x] Step 2: Add/edit/delete questions with modal
- [x] Support for MCQ, Checkbox, and Text question types
- [x] Dynamic options management (add/remove options, set correct answers)
- [x] View candidates and their submission data

### Candidate Panel
- [x] Login with email/password authentication
- [x] Dashboard showing available exams with duration, questions, and negative marking info
- [x] Full exam-taking experience with question navigation
- [x] Timer countdown with auto-submit on timeout
- [x] Support for Radio (MCQ), Checkbox, and Text question types
- [x] Skip question functionality
- [x] Behavioral tracking: tab switch detection with warning toasts
- [x] Behavioral tracking: fullscreen exit detection with warnings
- [x] Timeout modal with personalized message
- [x] Test completed screen with congratulations message
- [x] Automatic score calculation

### Backend (Bonus Points)
- [x] RESTful API with Next.js Route Handlers
- [x] JWT authentication with token-based authorization
- [x] Prisma ORM with SQLite database
- [x] CRUD operations for exams and questions
- [x] Exam submission with automated scoring
- [x] Negative marking calculation
- [x] Duplicate submission prevention

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm 9+

### Installation

```bash
git clone https://github.com/Piash-Akbar/iBOS-Interview-Task.git
cd online-assessment-platform
npm install
```

### Setup Database

```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="akij-resource-assessment-platform-secret-key-2026"
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Employer | employer@akij.com | password123 |
| Candidate | candidate@akij.com | password123 |

---

## Project Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth route group (login pages)
│   ├── (employer)/         # Employer route group
│   ├── (candidate)/        # Candidate route group
│   ├── dashboard/          # Unified dashboard (role-based)
│   └── api/                # Backend API routes
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── layout/             # Navbar, Footer
│   ├── employer/           # Employer-specific components
│   ├── candidate/          # Candidate-specific components
│   └── shared/             # Shared components (pagination, empty state, auth guard)
├── hooks/                  # Custom React hooks (useExamTimer, useBehavioralTracking, useFullscreen)
├── stores/                 # Zustand state stores (auth, exam, create-exam)
├── schemas/                # Zod validation schemas (shared frontend + API)
├── types/                  # TypeScript type definitions
└── lib/                    # Utilities (Prisma client, JWT auth, Axios API client)
```

### Key Design Decisions

- **Zustand over Redux**: Chosen for simpler API and less boilerplate. The app scope doesn't warrant Redux's complexity. Zustand stores use selective subscriptions to prevent unnecessary re-renders.
- **React Hook Form + Zod**: Uncontrolled inputs for performance. Zod schemas are shared between frontend validation and API request validation, ensuring a single source of truth.
- **Route Groups**: `(auth)`, `(employer)`, and `(candidate)` separate layouts cleanly without URL path pollution.
- **Custom Hooks**: `useExamTimer`, `useBehavioralTracking`, and `useFullscreen` encapsulate complex browser API logic into reusable, testable units.
- **API Routes as Backend**: Same codebase, zero deployment overhead, demonstrates full-stack capability with Prisma ORM.

---

## Additional Questions

### 1. MCP Integration

Yes, I have worked with MCP (Model Context Protocol). For this project specifically, I used **Claude Code** (Anthropic's CLI tool) which leverages MCP to interact with my development environment — reading files, running commands, and managing the full development workflow.

MCP could be further leveraged in this project through:

- **Supabase MCP**: To provide real-time database interactions, enabling live updates when candidates submit exams — employers could see results in real-time without polling, using Supabase's real-time subscriptions through the MCP protocol.
- **Figma MCP**: To extract design tokens (colors, spacing, typography) directly from the provided Figma file into Tailwind configuration. This would streamline the design-to-code process significantly, ensuring pixel-perfect implementation.
- **Chrome DevTools MCP**: For automated accessibility auditing and performance profiling during development, catching issues like missing ARIA labels on form elements or slow component renders.
- **Database MCP**: To allow AI assistants to directly query and understand the database schema, making it easier to generate correct Prisma queries and validate API endpoints against the actual data model.

### 2. AI Tools for Development

I used **Claude Code** (Anthropic's CLI) as my primary AI development tool for this project. It excels at:

- Architecting project structure and making technology stack decisions
- Generating consistent, type-safe code across the full stack
- Writing Zod schemas shared between frontend validation and API request validation
- Parallel development of independent features through its agent system
- Debugging complex state management interactions between Zustand stores, React Hook Form, and React Query

I also recommend:
- **GitHub Copilot**: For inline code completion, especially repetitive patterns like form fields and API handlers
- **v0 by Vercel**: For rapidly prototyping UI components matching a design, then customizing the output
- **Cursor**: As an AI-first IDE with deep codebase understanding for larger refactoring tasks

### 3. Offline Mode Strategy

If a candidate loses internet during an exam, here's how I would handle it:

1. **Service Worker + Cache API**: Register a service worker that caches the exam page and all question data when the exam starts. The entire exam payload (questions, options) is fetched upfront and stored locally, so the UI remains functional offline.

2. **IndexedDB for Answer Persistence**: Store all answer changes in IndexedDB immediately (not just in-memory Zustand state). This survives browser crashes, accidental page refreshes, and tab closures. On every `setAnswer()` call, mirror the write to IndexedDB.

3. **Client-Side Timer**: The countdown timer already runs purely client-side (`setInterval`), so it continues accurately during offline periods without server dependency.

4. **Background Sync API**: Queue the submission as a Background Sync event. When connectivity returns, the browser automatically retries the submission — even if the user has closed the tab.

5. **Online/Offline Detection**: Use `navigator.onLine` and `window.addEventListener('online'/'offline')` to show a non-intrusive banner: _"You're offline — your answers are saved locally and will be submitted when connection returns."_

6. **Conflict Resolution**: On reconnection, compare the local timestamp with server state. If the exam window has closed, submit with an `offlineCompletion: true` flag for employer review. If a submission already exists (race condition), show the user their existing submission.

This approach ensures **zero data loss** and a seamless candidate experience even with intermittent connectivity.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npx prisma db push` | Sync database schema |
| `npx prisma generate` | Generate Prisma client |
| `npx tsx prisma/seed.ts` | Seed database with demo data |
| `npx prisma studio` | Open database GUI |
