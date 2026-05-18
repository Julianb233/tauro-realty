# PPP Template — Customization & Update Guide

## Architecture: Template Code vs Client Data

The PPP template separates **template code** (shared across all clients) from **client data** (unique per client).

### Template Code (DO NOT EDIT per-client)
- `app/` — All page components, layouts, API routes
- `components/` — Shared UI components (GlassCard, ReviewActions, TopNav, etc.)
- `app/api/` — Review workflow, chatbot, content approval endpoints
- `package.json`, `tailwind.config.ts`, `globals.css`

### Client Data (EDIT per-client via setup.sh)
- `data/client-data.ts` — Name, contact, stats, hub links
- `data/services.ts` — **Only services discussed with this client**
- `data/deliverables.ts` — Real deliverables with approval workflow
- `data/action-items.ts` — Client action items
- `data/changelog.ts` — Work log
- `data/milestones.ts` — Project roadmap
- `data/content-calendar.ts` — Content items with approval status
- `data/meetings.ts` — Meeting notes

## Updating All Client Portals

```bash
bash update-clients.sh           # Update all clients
bash update-clients.sh --dry-run # Preview changes
```

## Services Page Rules

**Only show services relevant to the client:**
- `active` — Currently paying for
- `discussed` — Showed interest / on roadmap

**NEVER add generic upsell services.**

## Detail Pages & Review Workflow

Every section has a detail page with `ReviewActions`:
- `/deliverables/[id]` — Full deliverable with approve/deny/comment
- `/calendar/[id]` — Content item with approve/deny/comment  
- `/action-items/[id]` — Action item with full instructions + respond
- `/meetings/[id]` — Meeting with decisions, takeaways, action items

Reviews stored in Supabase `portal_reviews` table.
