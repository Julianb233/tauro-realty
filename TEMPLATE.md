# PPP Template — Field Replacement Guide

Replace these values in `data/` files with real client data from their PROFILE.md.

## Required Replacements

| Field | File | Replace With | Profile Source |
|-------|------|-------------|----------------|
| clientInfo.name | client-data.ts | Business name | PROFILE.md frontmatter `name` |
| clientInfo.slug | client-data.ts | URL-safe slug | PROFILE.md frontmatter `slug` |
| clientInfo.contact.name | client-data.ts | Primary contact first name | Contact Information |
| clientInfo.contact.phone | client-data.ts | Phone with country code | Contact Information |
| clientInfo.domain | client-data.ts | Client website URL | Engagement Summary |
| hubLinks | client-data.ts | Real URLs (site, Linear, Drive) | PPP Portal Configuration |
| snapshot | client-data.ts | Current month stats | Goals & Outcomes + git log |
| changelog entries | changelog.ts | Real work done (10+ entries) | git log + Linear closed issues |
| deliverables | deliverables.ts | Actual deliverables (10+ items) | Deliverables Tracker |
| actionItems | action-items.ts | Real client tasks (3+ items) | Promises Made + Linear |
| milestones/phases | milestones.ts | Project phases | ROADMAP.md or Milestones table |

## Brand Customization (optional)

If the client has brand assets in their profile:
- `brand/colors.json` → update CSS variables in `app/globals.css`
- `brand/typography.json` → update font imports in `app/layout.tsx`
- `brand/logo.png` → copy to `public/` and reference in layout

Default theme is dark navy (#0f172a) with blue/emerald accents.

## After Replacement

1. Run `npm run build` — must pass with zero errors
2. Run `bash verify.sh .` — must pass all quality gates
3. Deploy to Vercel
