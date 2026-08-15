# Agency Knowledge Agent

The project record for your agency, made queryable.

It ingests everything a client project produces — recorded meetings, transcripts,
shared documents, specs, written decisions — and organises it into isolated corpora,
one per client. Your team asks questions in plain language and gets sourced answers
back in seconds, with the document named, the passage quoted, and the timestamp
or line referenced. No answer without a citation.

- **Web chat interface** — search any client corpus from the dashboard
- **Discord and Slack bot** — mention the bot in any channel to query inline
- **Hard client isolation** — corpora never mix; each project is walled off under its own NDA boundary
- **Exportable and deletable** — when a project closes, the corpus goes with it on request

## Features

- **Decision extraction**: At ingest time, commitments, constraints, approvals, and rejections are pulled out as structured records — speaker and timestamp attached — rather than left buried in raw transcript text.
- **Gap detection**: Questions the corpus cannot answer are automatically logged. Each week they are grouped into a draft agenda for the next client call, so nothing waits another seven days because nobody thought to ask.
- **Citation-first retrieval**: Every answer links back to the exact source. What the client agreed to is provable — not remembered, not assumed. Quoted, dated, attributed.
- **Multi-client architecture**: Built for agencies. One platform, many clients, each in a separate, permission-isolated corpus. Enterprise search tools assume one company; this one was built for the opposite shape.
- **Unified ingest**: Drop in meeting recordings, transcripts, PDFs, specs, or any text document. The pipeline handles extraction and indexing.

## Getting Started

You can use the platform in two ways:

- **Hosted**: Create an account and start ingesting immediately — no infrastructure setup required.
- **Self-hosted**: Deploy on your own infrastructure for full control over client data and storage.

### Self-Hosted With Docker

```bash
bun install
cp .env.example .env   # fill in the required variables
bun run containers:up  # start Postgres and Redis
bun run db:migrate
bun run dev
```

Then open the dashboard at `/app`. The first account created becomes the admin and
is prompted through the setup flow.

For local file storage, start the S3 mock in a separate terminal:

```bash
bun --cwd apps/s3rver run dev   # S3-compatible server on http://localhost:4566
```

## Tech Stack

| Area            | Choice                                                                            |
| --------------- | --------------------------------------------------------------------------------- |
| Runtime / PM    | [Bun](https://bun.sh) `1.3.5`                                                     |
| Monorepo        | [Turborepo](https://turbo.build)                                                  |
| API             | [Hono](https://hono.dev)                                                          |
| Database        | PostgreSQL + [Drizzle ORM](https://orm.drizzle.team)                              |
| Queue / cache   | Redis + [BullMQ](https://docs.bullmq.io)                                          |
| Dashboard (SPA) | Vite + React 19 + [TanStack Router](https://tanstack.com/router) + TanStack Query |
| Marketing site  | [Next.js 16](https://nextjs.org) (App Router, static export)                      |
| UI              | Tailwind CSS v4 + shadcn/ui                                                       |
| Forms           | react-hook-form + Zod                                                             |
| i18n            | next-intl (front) + react-i18next (client), shared catalogs                       |
| Billing         | [Stripe](https://stripe.com)                                                      |
| Email           | [Resend](https://resend.com)                                                      |
| Storage         | S3-compatible (AWS S3, or `s3rver` locally)                                       |

## Monorepo Layout

```
apps/
  server/   Hono API + background workers; in prod serves the front & client too
  client/   Vite + React SPA — the authenticated dashboard, mounted at /app
  front/    Next.js marketing site — statically exported, localized per locale
  s3rver/   Local S3-compatible server for development (port 4566)
packages/
  constants/  Shared types & constants (@repo/constants)
  ui/         Shared shadcn/ui component library (@repo/ui)
  i18n/       Shared locale config + message catalogs (@repo/i18n)
```

## How Requests Are Routed

In production the server (`apps/server`) is the single entry point:

| Path          | Served by                                                                          |
| ------------- | ---------------------------------------------------------------------------------- |
| `/`           | Redirect to `/{locale}/` (from `NEXT_LOCALE` cookie → `Accept-Language` → default) |
| `/{locale}/…` | Marketing site — Next.js static export                                             |
| `/app/*`      | Dashboard SPA — Vite build, router basepath `/app`                                 |
| `/api/*`      | Hono API                                                                           |

## Environment Variables

All apps read a single root `.env`. Copy `.env.example` and fill it in.

| Variable                                                                              | Description                                                     |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `NODE_ENV`                                                                            | `development` or `production`                                   |
| `API_PORT`                                                                            | Port the server listens on                                      |
| `VITE_API_URL`                                                                        | Base URL the dashboard uses to reach the API                    |
| `CLIENT_URL`                                                                          | Public URL of the dashboard (server builds email links from it) |
| `NEXT_PUBLIC_CLIENT_URL`                                                              | Marketing site's link target for the app                        |
| `VITE_LP_URL`                                                                         | Dashboard's link back to the marketing site                     |
| `POSTGRES_HOST` / `PORT` / `USER` / `PASS` / `NAME`                                   | PostgreSQL connection                                           |
| `REDIS_HOST` / `PORT` / `PASSWORD`                                                    | Redis connection (queue + rate limiting)                        |
| `RATE_LIMIT_KEY_SECRET`                                                               | Secret used to hash rate-limit keys                             |
| `TRUST_PROXY`                                                                         | `true` when running behind a reverse proxy                      |
| `QUEUE_CONCURRENCY`                                                                   | Max concurrent background jobs                                  |
| `QUEUE_BACKLOG_THRESHOLD`                                                             | Waiting-jobs count that triggers a backlog alert (default 100)  |
| `S3_ENDPOINT` / `REGION` / `ACCESS_KEY` / `SECRET_KEY` / `BUCKET_NAME` / `PUBLIC_URL` | Object storage                                                  |
| `RESEND_API_KEY` / `MAIL_DOMAIN`                                                      | Transactional email                                             |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`                                         | Billing                                                         |
| `SENTRY_DSN` / `SENTRY_TRACES_SAMPLE_RATE`                                            | Server error tracking                                           |
| `VITE_SENTRY_DSN`                                                                     | Dashboard error tracking                                        |
| `NEXT_PUBLIC_SENTRY_DSN`                                                              | Marketing error tracking                                        |

Run `bun run check:env` to validate your `.env` against every app's schema.

## Scripts

| Script                    | What it does                                     |
| ------------------------- | ------------------------------------------------ |
| `bun run dev`             | Start all apps in watch mode                     |
| `bun run build`           | Build all apps                                   |
| `bun run test`            | Run the test suites (server tests need Postgres) |
| `bun run lint`            | ESLint across workspaces                         |
| `bun run typecheck`       | `tsc` across workspaces                          |
| `bun run format`          | Prettier                                         |
| `bun run check:env`       | Validate `.env` against every app's schema       |
| `bun run db:generate`     | Generate a Drizzle migration from schema changes |
| `bun run db:migrate`      | Apply pending migrations                         |
| `bun run db:studio`       | Open Drizzle Studio                              |
| `bun run stripe:listen`   | Forward Stripe webhooks to the local server      |
| `bun run containers:up`   | `docker compose up` (Postgres + Redis)           |
| `bun run containers:down` | `docker compose down`                            |

## Database & Migrations

Schemas live in `apps/server/src/infrastructure/database/schemas`, migrations in
`apps/server/drizzle/`. After changing a schema:

```bash
bun run db:generate   # writes a new migration
bun run db:migrate    # applies it
```

## Testing

Server tests use Bun's test runner against a real PostgreSQL instance. Each test
gets an isolated database spun from a migrated template.

```bash
bun run test                   # all suites
bun --cwd apps/server test     # server only
```

E2E tests live in `apps/e2e` and drive the real app in a browser via Playwright
against a running stack. See `apps/e2e/README.md`.

## Deployment

`bun run build` compiles the server into a single self-contained binary and builds
the marketing and dashboard bundles. The [`Dockerfile`](Dockerfile) assembles them
so the runtime image serves the API, the marketing export, and the dashboard SPA
from one process on `API_PORT`.

CI ([`.github/workflows/build-and-push.yml`](.github/workflows/build-and-push.yml))
builds the image and pushes it to GitHub Container Registry on every push to `main`.

## Architecture

The server follows a strict three-layer architecture (controllers → services →
repositories) with a provider-agnostic infrastructure layer for billing, email,
storage, queues, and rate limiting. See [`AGENTS.md`](AGENTS.md) for the full
conventions.

---
