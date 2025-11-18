**Repository Summary**

Fashionix is a headless e-commerce storefront built on Next.js (App Router, Next 15) that proxies and queries a Bagisto GraphQL backend. The codebase mixes Server Components (App Router) with client-side UI (HeroUI + Tailwind). Key responsibilities:
- Frontend pages and route handlers: `app/` (App Router)
- API-proxies and server endpoints: `app/api/*` (e.g. `app/api/bagisto/graphql/route.ts`)
- Bagisto GraphQL queries/mutations: `lib/bagisto/queries/` and `lib/bagisto/mutations/`
- Shared UI: `components/`
- State & data layers: `store/`, `context/`, `providers/` (Redux + TanStack Query + NextAuth)

**How To Run / Build**
- **Dev (preferred)**: README recommends `bun dev` (project contains `bun.lock`). If Bun not available, `npm run dev` or `pnpm dev` will run the `next dev --turbopack` script in `package.json`.
- **Build**: `bun run build` or `npm run build` (runs `next build --turbopack`).
- **Lint/Checks**: `bun run lint` or `npm run lint` (runs `eslint --fix`).
- **Env file**: copy `.env.example` -> `.env.local` and fill variables (notable keys: `BAGISTO_STORE_DOMAIN`, `BAGISTO_SESSION`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_API_URL`).

**Big-picture Architecture & Data Flow**
- **App Router** (`app/`): pages, layouts, error boundaries and `app/api/*` server routes. Server components are default; client components must include `"use client"`.
- **Bagisto integration**: GraphQL queries and mutations live under `lib/bagisto/*`. Server-side requests often proxy through `app/api/bagisto/graphql/route.ts` or use helpers in `lib/bagisto/index.ts`.
- **State & Fetching**: UI uses `@tanstack/react-query` for caching and `redux` for global app state (cart, preferences). Look at `providers/tanstack-provider.tsx` and `store/` for wiring.

**Project-specific Patterns & Gotchas**
- **GraphQL query organization**: Queries and mutations are split into `lib/bagisto/queries/` and `mutations/`. Use the existing GraphQL templates to add new operations.
- **Bagisto cache workaround**: Some code generates dynamic query names (timestamped) to bypass a Bagisto caching bug—see `lib/bagisto/queries/checkout.ts` for an example.
- **API proxying**: Internal routes call Bagisto via `fetchHandler` or the API route at `app/api/bagisto/graphql/route.ts`. Note inconsistent env var names in the repo (`BAGISTO_STORE_DOMAIN` in `.env.example` and some files referencing `BAGISTO_URL`) — verify which env var is expected before editing `app/api/bagisto/*`.
- **File-based grouping**: Components are grouped by feature (e.g. `components/customer/`, `components/checkout/`) — follow existing folder structure when adding features.

**Where To Make Common Changes**
- Add UI components: `components/` (feature subfolders exist).
- Add page or route: `app/(segment)/...` for App Router pages; server route handlers go in `app/api/*`.
- Add GraphQL operation: add the query/mutation under `lib/bagisto/queries` or `mutations` and call via `lib/bagisto/index.ts` or the API proxy.
- Modify global CSS: `app/globals.css` and `styles/`.

**Important Files to Inspect When Working**
- `README.md` — environment and run notes (mentions `bun`).
- `.env.example` — required env variables.
- `package.json` — `dev`, `build`, `lint` scripts.
- `app/api/bagisto/graphql/route.ts` — GraphQL proxy route (watch for env var mismatch).
- `lib/bagisto/` — main GraphQL client helpers, queries, and mutations.
- `providers/` — how contexts and global data clients (NextAuth, TanStack, Redux) are wired.

**Testing & Debugging Tips**
- When Bagisto calls fail, check `.env.local` for correct `BAGISTO_STORE_DOMAIN` (and any session tokens).
- Inspect network requests to `http://localhost:3000/api/bagisto/graphql` to see proxied payloads and server errors.
- Server-side logs: use `console.error` in `app/api/*` handlers to capture backend errors during `dev`.

**Representative Examples**
- Proxy GraphQL from client code: client calls `fetch('/api/bagisto/graphql', { method: 'POST', body: JSON.stringify({ query, variables }) })` and server route forwards to Bagisto.
- Unique query name pattern: see `lib/bagisto/queries/checkout.ts` for generating timestamped query names to avoid Bagisto cache.

If anything here is incorrect or you want more detail on a specific area (auth flows, cart state, or GraphQL helpers), tell me which area and I'll expand the instructions.
