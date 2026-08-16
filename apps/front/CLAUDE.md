# CLAUDE.md

Guidance for Claude Code when working in `@repo/front` — the marketing site.

## Project Overview

`@repo/front` is the public marketing/landing site (Next.js 16, App Router). It
is a **static-friendly front end only**: all backend concerns (auth, billing,
data) live in `apps/server`. The original template's auth/database/email/comments
stack has been removed — do not reintroduce it here.

- **Content**: Fumadocs (MDX) blog under `content/*.mdx`
- **UI**: shadcn/ui primitives in `src/components/ui`, plus fumadocs-ui layout
  components (header, TOC, search)
- **Tooling**: Biome (via Ultracite) for format/lint, TypeScript strict mode

## Common Commands

```bash
bun dev          # dev server (http://localhost:3000)
bun run build    # production build
bun run typecheck# fumadocs typegen + tsc --noEmit
bun run check:write  # Biome format + safe fixes
```

Run from the repo root via turbo: `bunx turbo <task> --filter=@repo/front`.

## Environment Variables

Validated in `src/env.ts` (`@t3-oss/env-nextjs` + zod). Only client-side keys
remain:

- `NEXT_PUBLIC_APP_URL` — target of "Sign up"/CTA links. Has a dev default and
  is inlined into the client bundle via `next.config.ts` `env`, so it must never
  resolve to `undefined` (an undefined `<Link href>` crashes prerender).
- `NEXT_PUBLIC_UMAMI_URL` / `NEXT_PUBLIC_UMAMI_WEBSITE_ID` — optional analytics.

Keep `.env.example` in sync with the schema.

## Architecture

```
src/
├── app/
│   ├── (home)/            # marketing route group
│   │   ├── (blog)/        # blog + tags (fumadocs MDX)
│   │   ├── about/  pricing/  privacy/  terms/
│   │   └── _components/    # home sections (hero, features, pricing, …)
│   ├── api/search/         # fumadocs static search index
│   └── og/  banner.png/    # OG image generation
├── components/
│   ├── ui/                 # shadcn primitives
│   ├── sections/           # header (fumadocs) + footer
│   └── blog/  tags/  icons/
└── lib/
    ├── source.ts           # fumadocs blog accessors (typed page data)
    ├── metadata.ts  constants.ts  utils.ts
```

### Fumadocs blog typing

`src/lib/source.ts` restates the blog frontmatter type via `DocCollectionEntry`
and casts the source once. This is a deliberate workaround: fumadocs-mdx's
typegen drops our schema because the `date` transform in `source.config.ts`
collapses schema inference. Keep `BlogData` in sync with `source.config.ts`.

### shadcn

Components live in `src/components/ui` (style: new-york, base color: zinc) and
use the unified `radix-ui` package. Refresh with
`bunx shadcn@latest add <name> --overwrite`. This app is intentionally
self-contained — it does **not** consume the shared `@repo/ui`.

## Notes

- Comment sparingly; the codebase is near comment-free. Add a comment only for a
  non-obvious _why_ (like the `source.ts` typing workaround).
- Contact/newsletter CTAs point at a placeholder `mailto:` — swap for a real
  address when branding.
