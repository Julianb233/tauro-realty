# PPP Template V3 — Complete Rebuild

## What This Is

The PPP (Progress Portal Page) is AI Acrobatics' standard client-facing dashboard — every client gets one as a standalone Vercel deployment. V3 is a ground-up rebuild using the appsport design language (light glassmorphism, shadcn/ui, client brand colors), with full subpage routes for every section, a working chatbot/review/request system, and an automated data pipeline that pulls real client data from profiles, git, Linear, and Fireflies.

## Core Value

**Every client sees a beautiful, branded portal with their own colors that shows real project data — and can interact with it (chat, request changes, approve content, submit assets).**

## Requirements

### Validated

- ✓ 10 portal page routes exist (Home, Progress, Deliverables, Changelog, Action Items, Activity, Services, Calendar, Meetings, More) — existing
- ✓ 8 data files populate pages (client-data.ts, changelog.ts, deliverables.ts, action-items.ts, milestones.ts, services.ts, meetings.ts, content-calendar.ts) — existing
- ✓ Mobile-first responsive layout with bottom nav — existing
- ✓ ChatWidget component with text/media/voice UI — existing (but non-functional)
- ✓ verify.sh quality gate — existing (needs updating)
- ✓ setup.sh one-command scaffolding — existing (needs expanding)

### Active

**Design System (Appsport-inspired)**
- [ ] Light gradient background using client brand colors: `bg-gradient-to-br from-[brand-50] via-[brand-50] to-[accent-50]`
- [ ] Glass cards: `bg-white/80 backdrop-blur shadow-lg border-0 rounded-2xl`
- [ ] Full shadcn/ui component library (Card, Button, Badge, Tabs, Accordion, Dialog, Sheet, Avatar, etc.)
- [ ] Client brand colors injected via CSS variables from PROFILE.md `brand/colors.json`
- [ ] Brand gradient on headings and CTAs (client primary → secondary)
- [ ] Geist font family
- [ ] Lucide icons throughout
- [ ] Hover effects: `hover:shadow-lg hover:scale-[1.02] transition-all`

**Subpage Routes (Full Depth)**
- [ ] `/deliverables/[id]` — full detail: assets list, approval history, comments thread, screenshots, linked URLs
- [ ] `/meetings/[id]` — full transcript, all decisions with status, action items with owners, recording link
- [ ] `/progress/phase/[id]` — phase detail: every deliverable, timeline, blockers, completion proof
- [ ] `/changelog/[id]` — full entry: before/after, linked PRs, deploy URLs, items shipped
- [ ] `/services/[slug]` — full service page: scope, features, included/excluded, upgrade CTA
- [ ] `/action-items/[id]` — full detail: upload form, step-by-step guide, status history, due date countdown
- [ ] `/calendar/[id]` — content detail: preview, approve/reject buttons, edit request form

**Chatbot & Interaction System (Currently Broken)**
- [ ] Working Claude API integration for text chat (`/api/chat/`)
- [ ] Working media upload with Vercel Blob storage (`/api/chat/media/`)
- [ ] Voice message transcription via Whisper/Deepgram (`/api/chat/voice/`)
- [ ] Auto-create Linear issues from client requests with `client-request` + `chat-request` labels
- [ ] Content approval workflow: approve/reject → status update in data + notification to Julian
- [ ] Client can submit assets for action items (upload form on action-item detail page)
- [ ] Request confirmation shown to client after submission

**Data Pipeline (Real Data, Not Placeholders)**
- [ ] `setup.sh` reads PROFILE.md and populates ALL 8 data files with real client data
- [ ] Changelog auto-generated from `git log` + Linear closed issues + Fireflies meeting decisions
- [ ] Deliverables pulled from PROFILE.md Deliverables Tracker + Linear completed issues
- [ ] Action items from Linear `client-action` label + PROFILE.md Promises Made
- [ ] Milestones from `.planning/ROADMAP.md` or PROFILE.md Milestones table
- [ ] Meetings from Fireflies API (transcripts, decisions, action items)
- [ ] Services from PROFILE.md Engagement Summary (active vs available)
- [ ] Brand colors from `brand/colors.json` → CSS variables in globals.css
- [ ] Content calendar from Linear content-labeled issues

**Standalone Deployment**
- [ ] Each client PPP is its own Vercel project at `{client-slug}-portal.vercel.app`
- [ ] No dependency on portal.aiacrobatics.com multi-tenant system
- [ ] "Powered by AI Acrobatics" footer on every page

**Skill Updates**
- [ ] `/client-portal` skill updated to use V3 template, inject brand colors, pull real data
- [ ] `/ppp-notify` skill updated for standalone Vercel URLs
- [ ] `verify-ppp.sh` checks for client brand colors (not hardcoded dark navy)
- [ ] `client-portal-standard.md` rule updated for standalone deploys

### Out of Scope

- Authentication/login — PPPs use token-URL based access, no passwords
- Multi-tenant portal.aiacrobatics.com — that project is separate; PPPs are standalone
- Native mobile app — web-only, mobile-responsive
- Real-time websocket updates — polling-based for now
- CRM/GoHighLevel integration — separate project
- Payment processing — links to external payment pages only

## Context

- **UI Reference:** `/opt/agency-workspace/appsport/` — SafeMove app with light gradient bg, `bg-white/80 backdrop-blur` cards, shadcn/ui, Supabase auth, pink/purple/teal gradients. Julian explicitly chose this as the design reference.
- **Current Template:** `/opt/agency-workspace/ppp-template/` — dark navy theme, hardcoded blue/emerald, placeholder "Acme Corp" data, no working chatbot/review, in-page expandable sections only (no subpages)
- **Client Profiles:** `/opt/agency-workspace/client-profiles/clients/{slug}/PROFILE.md` — contain brand colors, contact info, deliverables, milestones, meetings
- **Supabase:** Dashboard Daddy project `jrirksdiklqwsaatbhvg` — portal_clients, portal_feed, portal_action_items, portal_deliverables, portal_chat_messages, ppp_notifications tables
- **PPP SDK:** `/opt/agency-workspace/fleet-shared/sdk/ppp.ts` — read/write operations for Supabase portal data
- **Julian's frustration:** Current template colors are wrong, data is never accurate to the client, chatbot/review/request features don't actually work, pages are surface-level without detail views

## Constraints

- **Tech stack**: Next.js 14+ (App Router), Tailwind CSS, shadcn/ui, Framer Motion, Lucide icons
- **Data layer**: 8 data files in `data/` must exist and be populated with real client data
- **Branding**: Each client's brand colors from PROFILE.md, plus "Powered by AI Acrobatics" footer
- **Mobile-first**: Must work on 375px+ — clients check on phones
- **Build**: `npm run build` must pass with zero errors
- **Accessibility**: 44px min touch targets, proper contrast, sr-only labels
- **API keys**: Chatbot needs ANTHROPIC_API_KEY, LINEAR_API_KEY; media needs BLOB_READ_WRITE_TOKEN
- **Static + API**: Pages are static where possible, API routes for chat/media/voice/approval

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Appsport design language | Julian explicitly chose this as the reference — light, clean, glassmorphism | — Pending |
| Client brand colors via CSS vars | Each client's portal uses THEIR colors from PROFILE.md brand/colors.json | — Pending |
| Full subpage routes for every section | Julian wants depth — "not surface level, everything clickable with subpages" | — Pending |
| Standalone Vercel deploys | Julian wants each PPP as its own Vercel app, not through portal.aiacrobatics.com | — Pending |
| Fix chatbot/review/request | These features exist as UI but are non-functional — must work end-to-end | — Pending |
| Real data pipeline in setup.sh | Auto-populate from PROFILE.md, git log, Linear, Fireflies — no more placeholders | — Pending |
| Overwrite V2 PROJECT.md | V2 was UI-only migration; V3 is a complete rebuild with new scope from Julian | ✓ Good |

---
*Last updated: 2026-04-09 after V3 scope expansion from Julian*
