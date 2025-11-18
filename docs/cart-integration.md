# Shopping Cart Integration (Quick Reference)

This file documents the key server routes, helpers, and env vars used by the Shopping Cart and Checkout features.

## Important environment variables
- `BAGISTO_STORE_DOMAIN` (preferred) — domain or full URL to your Bagisto store, e.g. `https://store.example.com` or `store.example.com`.
- `BAGISTO_SESSION` — cookie name used to persist the cart session (defined in `lib/constants`).

Notes:
- The project will also tolerate `BAGISTO_URL` for backward compatibility, but `BAGISTO_STORE_DOMAIN` is canonical.
- Make sure the env var does not include surrounding brackets (`[` or `]`) and has no trailing slash.

## Server-side Bagisto client
- `lib/bagisto/index.ts` exposes helpers used by server routes (e.g. `getCart()`, `addToCart()`, `updateCart()`, `createPlaceOrder()`).
- These helpers call Bagisto GraphQL using the domain from `BAGISTO_STORE_DOMAIN`.

## Public API routes used by the frontend
- `GET /api/cart-detail` — returns the current cart. Used by `useCartDetail` and server pages.
- `POST /api/cart/addToCart` — add item to cart.
- `POST /api/cart/updateCart` — update item quantities.
- `POST /api/cart/removeCart` — remove item from cart.
- `POST /api/bagisto/graphql` — low-level GraphQL proxy (normalized to use `BAGISTO_STORE_DOMAIN`).

## Frontend helpers
- `lib/bagisto/fetch-handler.ts` — client helper that posts to `/api/<route>` and returns parsed JSON.
- `components/hooks/use-cart-detail.ts` — uses React Query to fetch `/api/cart-detail` and syncs to Redux.
- `components/cart/modal.tsx` and `app/(public)/cart/page.tsx` — UI entry points (popup and full page) that reuse the same cart components.

## Verification / Local dev steps
1. Copy example env: `cp .env.example .env.local` (or copy manually) and set `BAGISTO_STORE_DOMAIN` and `BAGISTO_SESSION`.
2. Start dev server (PowerShell):
```powershell
pnpm dev
# or
npm run dev
# or (if using Bun)
bun dev
```
3. Visit the cart page: `http://localhost:3000/cart` and the site root. Add a product and confirm:
  - Items appear in the popup cart and on the `/cart` page.
  - Quantity buttons and trash icon call the same API routes and update the cart.
  - Clicking the checkout CTA redirects to `/checkout` with correct step based on cart state.

## Troubleshooting
- If you see proxy errors from `/api/bagisto/graphql`, confirm `BAGISTO_STORE_DOMAIN` is set and reachable from your environment.
- Server logs (next dev) will show `console.error` messages from the GraphQL proxy if network errors occur.

---
If you want, I can also add this content to the top-level `README.md` or surface env validation at startup.
