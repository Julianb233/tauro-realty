# LYL Realty Group Conversion Checklist

Updated: 2026-05-16 final conversion pass
Source workspace: `/opt/agency-workspace/tauro`
Linear parent: AI-10065

## Current Scan Snapshot

Commands run from the VPS source:

```bash
rg -n "Tauro|TAURO|taurorealty|tauro-theme" src public package.json next.config.ts | wc -l
rg -il "LYL|Lyl|lyl" src public package.json next.config.ts .env.example .env.production.example | wc -l
rg -il "emerald|teal|green|cyan" src public package.json next.config.ts | wc -l
rg -il "Register for Access" src public package.json next.config.ts | wc -l
```

Results:

- Public source Tauro/domain matches: 0
- LYL reference files: verified present across source and env examples
- Green/teal/cyan token files: 26
- `Register for Access` files: 0
- Rendered local browser check at `http://localhost:3000/`: title, description, canonical, OpenGraph, and logo are LYL; Tauro matches: 0
- VPS build: `npm run build` passed, 114 pages generated
- Dev-server cache issue found and fixed by clearing `.next` and running `next dev --webpack` on port `3999`

## Finish Line

The conversion is complete when the ready real-estate website remains intact, but every intended public visitor and generated-client artifact presents the approved LYL Realty Group identity instead of Tauro.

## Workstreams

### 1. Public Page Copy and Navigation

- Convert public route copy, nav labels, footer language, CTAs, FAQ/legal/contact copy, and homepage sections to LYL Realty Group.
- Keep LYL Management separate from LYL Realty Group.
- Avoid blind global replace; preserve legacy file names only where renaming would be a separate refactor.
- Status: complete for public source/rendered copy.

Primary files found in scan include:

- `src/app/layout.tsx`
- `src/app/(site)/page.tsx`
- `src/app/(site)/about/page.tsx`
- `src/app/(site)/contact/page.tsx`
- `src/app/(site)/sell/page.tsx`
- `src/app/(site)/home-value/page.tsx`
- `src/app/(site)/buyers-guide/page.tsx`
- `src/app/(site)/sellers-guide/page.tsx`
- `src/app/(site)/careers/page.tsx`
- `src/app/(site)/why-join/page.tsx`
- `src/components/footer.tsx`
- `src/components/hero.tsx`
- `src/components/why-tauro.tsx`
- `src/components/homepage-ctas.tsx`

### 2. Metadata, Schema, Social Images, and Brand Assets

- Update titles, descriptions, keywords, canonical metadata, OpenGraph/Twitter metadata, JSON-LD organization data, generated icons, and generated social images.
- Replace old Tauro logo usage in generated cards and public fallback pages.
- Document any remaining legacy assets that stay only for rollback or archival purposes.
- Status: complete for public metadata/schema/social/offline surfaces. The old `public/tauro-logo*.svg` filenames remain as legacy filenames, but their rendered text now says LYL.

Primary files found in scan include:

- `src/app/layout.tsx`
- `src/components/JsonLd.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/twitter-image.tsx`
- `src/app/icon.tsx`
- `src/app/apple-icon.tsx`
- `public/offline.html`
- `public/sw.js`
- `public/tauro-logo.svg`
- `public/tauro-logo-light.svg`
- `src/components/TauroLogo.tsx`

### 3. Forms, Emails, PDFs, Chat, and Lead Plumbing

- Update transactional email subjects, bodies, preheaders, and footers.
- Update generated brochures/PDFs.
- Update AI chat system prompt and UI labels.
- Rename or safely map lead source names, GHL tags, newsletter tags, and email defaults.
- Do not send real emails or client messages during conversion without approval.
- Status: complete for source templates/prompts/defaults. No live email/client send was performed.

Primary files found in scan include:

- `src/lib/email.ts`
- `src/emails/lead-confirmation.tsx`
- `src/emails/application-confirmation.tsx`
- `src/emails/newsletter-confirmation.tsx`
- `src/emails/newsletter-welcome.tsx`
- `src/emails/monthly-newsletter.tsx`
- `src/emails/daily-digest.tsx`
- `src/app/api/chat/route.ts`
- `src/app/api/newsletter/confirm/route.ts`
- `src/lib/ghl.ts`
- `src/lib/brochure/BrochurePDF.tsx`
- `src/app/api/brochures/generate/route.ts`

### 4. Visual QA and Palette Cleanup

- Confirm LYL logo is used in header/footer/chat/fallback surfaces.
- Remove unintended green/teal/cyan from public marketing/listing surfaces.
- Keep or document technical status colors only when intentionally not public-brand related.
- Re-check contrast on desktop and mobile.
- Status: complete for the reported issues. Remaining green-like tokens are dashboard/status/technical UI, not the public seasonal banner or listing badges.

Known already fixed:

- Header logo now uses `/brand/lyl-logo-web.png`.
- Seasonal banner is solid midnight/gold, not green/teal.
- `Active` and `New Construction` property badges were changed from emerald to gold.
- `Register for Access` locked card treatment is removed.

Remaining scan categories:

- `src/components/ChatWidget.tsx`
- `src/components/CallbackRequestForm.tsx`
- `src/components/OpenHouseBanner.tsx`
- `src/components/NewsletterForm.tsx`
- `src/components/PriceHistory.tsx`
- `src/components/ShareButton.tsx`
- `src/components/neighborhood/*`
- `src/app/(site)/newsletter/*`
- dashboard-only green states, which may be acceptable if documented as operational status UI

### 5. Technical QA and Deployment Readiness

- Run targeted lint on touched files.
- Run `npm run build` from `/opt/agency-workspace/tauro`.
- Smoke-test homepage, properties, property detail, contact, home-value, generated metadata, and generated images.
- Review git diff and keep unrelated untracked files untouched.
- Do not deploy to production until Julian approves the branch/deploy target.
- Status: build passed and local browser smoke passed. Deployment is intentionally not done yet.

### 6. Production Deployment and Verification

- Deploy only after explicit approval.
- Verify production alias HTTP 200, rendered brand, metadata, screenshots, and source maps/cached assets.
- Update Linear parent AI-10065 and this checklist with deployment URL, commit, and evidence.
- Status: pending Julian approval.

## Linear Task Map

- AI-10065: Parent tracker
- AI-10066: Audit gaps and source checklist
- AI-10067: Public page copy and navigation
- AI-10068: Metadata, schema, social images, and assets
- AI-10069: Visual QA and palette cleanup
- AI-10070: Technical QA and deployment readiness
- AI-10071: Deploy approved conversion and verify production
- AI-10072: Forms, emails, PDFs, chat prompt, and lead/GHL plumbing
