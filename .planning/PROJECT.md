# PPP Template UI Overhaul

## What This Is

The PPP (Progress Portal Page) template is AI Acrobatics' standard client-facing dashboard. Every client gets one. It currently uses a dark glass-card theme built with custom CSS. This project migrates it to a light, professional, data-rich dashboard using shadcn/ui components (from a v0-generated reference at `ui-reference/`), adds missing deliverable tracking to the portal, and ensures all data flows properly to the central Supabase database.

## Core Value

**Clients see a polished, professional dashboard that makes AI Acrobatics look enterprise-grade — and deliverables actually get tracked end-to-end from agent work to portal display.**

## Requirements

### Validated

- 9 portal pages exist: Home, Progress, Deliverables, Changelog, Action Items, Activity, Services, Calendar, More — existing
- Data files populate all pages: client-data.ts, changelog.ts, deliverables.ts, action-items.ts, milestones.ts, services.ts, content-calendar.ts — existing
- Deliverables grouped by status AND service with live URLs, images, assets, approval workflow, comments — existing
- Content calendar with approve/reject buttons and timeline/approval queue views — existing
- Services page showing active/available/coming-soon services — existing
- Build passes (9 routes, all static) — existing
- verify.sh quality gate (9+ pages, 7 data files) — existing

### Active

- [ ] Migrate from dark glass-card theme to light shadcn/ui design system (reference: `ui-reference/`)
- [ ] Replace custom GlassCard/ScrollReveal/StatusBadge/etc with shadcn/ui Card, Badge, Progress, Tabs, etc
- [ ] Swap dark navy (#0f172a) background for light warm gray (#f5f4f0) with white cards
- [ ] Replace Inter font with Geist font family
- [ ] Add radar/spider chart for project health overview (like reference)
- [ ] Add circular progress rings for key metrics
- [ ] Redesign bottom nav with pill-style tabs (black active state)
- [ ] Rebuild all 9 pages using shadcn/ui components while preserving data layer
- [ ] Fix deliverables not being written to Supabase — ensure agent work flows through PPP SDK to portal_deliverables table
- [ ] Ensure portal_changelog entries are created on every deploy/phase completion
- [ ] Add "Book a Support Call" Calendly button prominently in chat + more page
- [ ] Content calendar approval buttons actually trigger status changes (write to Supabase)
- [ ] Responsive grid layout (12-col like reference: 4-5-3 split on desktop)

### Out of Scope

- Authentication/login — PPPs are token-URL based, no passwords
- Backend API routes — template is static data, Supabase writes happen via SDK
- Chatbot implementation — spec exists in CHATBOT-CONFIG.md, separate build
- Voice-to-Linear pipeline — specced, separate build
- Multi-tenant portal.aiacrobatics.com migration — that's the ai-acrobatics-portal project

## Context

- **UI Reference:** `ui-reference/` directory contains a v0-generated shadcn/ui dashboard with 60+ components, Geist font, light theme, radar charts, circular progress, pill nav
- **Current Design:** Dark navy (#0f172a) with glass-card (backdrop-blur, white/5 bg, white/10 border), framer-motion animations, mobile-first bottom nav
- **Target Design:** Light warm gray (#f5f4f0 container, #c5c3d1 outer), white cards with shadow-sm, rounded-2xl, emerald/orange accents, Geist font, professional data dashboard feel
- **Supabase:** Dashboard Daddy project `jrirksdiklqwsaatbhvg` — PPP SDK at `fleet-shared/sdk/ppp.ts` handles reads/writes
- **Missing table:** `portal_requests` — referenced in code but migration never created
- **Deliverable tracking gap:** Agents complete work but deliverables aren't consistently written to Supabase portal_deliverables table — this is a data flow problem, not a UI problem

## Constraints

- **Tech stack**: Next.js 14 (App Router), Tailwind CSS, shadcn/ui components — must keep static export capability
- **Data layer**: All existing data files (7 files in `data/`) must be preserved — UI changes only
- **Branding**: "Powered by AI Acrobatics" footer must remain on every page
- **Mobile-first**: Must work on 375px+ (clients check on phones)
- **Build target**: `npm run build` must pass with zero errors, all routes static
- **Accessibility**: min-h-[44px] touch targets, proper contrast ratios

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use shadcn/ui from v0 reference | Julian provided specific v0-generated design as the target look | — Pending |
| Light theme instead of dark | Professional, enterprise feel for client-facing dashboards | — Pending |
| Keep data layer unchanged | Separates UI overhaul from data architecture — lower risk | — Pending |
| Geist font over Inter | Matches v0 reference, modern feel | — Pending |
| 12-column grid layout | Reference uses 4-5-3 desktop split, responsive to single column mobile | — Pending |

---
*Last updated: 2026-03-30 after initialization*
