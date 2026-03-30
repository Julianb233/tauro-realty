# PPP Template — AI Acrobatics Client Portal

Standard template for creating Progress Portal Pages (PPPs) for AI Acrobatics clients.

## Quick Start

```bash
# 1. Clone this template for a new client
cp -r /opt/agency-workspace/ppp-template/ /opt/agency-workspace/{client-slug}/dashboard/

# 2. Customize data files (see TEMPLATE.md for field mapping)
# Edit data/client-data.ts, changelog.ts, deliverables.ts, action-items.ts, milestones.ts

# 3. Install and verify
cd /opt/agency-workspace/{client-slug}/dashboard/
npm install
bash verify.sh .
npm run build

# 4. Deploy
VERCEL_TOKEN=$(op item get "Vercel Production Token" --vault 'API-Keys' --fields label=credential --reveal)
npx vercel --yes --prod --token "$VERCEL_TOKEN"
```

## Or use the automated setup

```bash
bash setup.sh {client-slug} "Client Name" "+1234567890"
```

## Prerequisites

Before creating a PPP, the client MUST have a populated profile:
```bash
/client-profile-setup "{client-name}"
```

The PPP reads from `/opt/agency-workspace/client-profiles/clients/{slug}/PROFILE.md` for all data.

## Structure

```
app/           7 pages (Home, Progress, Deliverables, Changelog, Action Items, Activity, More)
components/    6 reusable components (GlassCard, HealthBadge, StatusBadge, PageHeader, BottomNav, ScrollReveal)
data/          5 data files (client-data, changelog, deliverables, action-items, milestones)
services/      Optional modules (SEO, CRM, Content, Chatbot)
verify.sh      Quality gate — run before every deploy
```

## Service Modules

See SERVICES.md for available add-ons (SEO tracking, CRM, Content marketing, Chatbot).

## Quality Gate

`verify.sh` checks: required pages exist, data file minimums (10+ changelog, 10+ deliverables, 3+ action items), no placeholder text, AI Acrobatics branding, dark theme, build passes.

## Tech Stack

Next.js 14, React 18, Tailwind CSS 3, Framer Motion, Recharts, TypeScript.

---
Powered by AI Acrobatics
