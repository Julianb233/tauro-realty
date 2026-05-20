# TAURO Pre-Launch QA Checklist

> Last verified: 2026-04-07
> Verified by: Agent4 (automated + manual review)
> Status: **READY FOR LAUNCH**

## Automated Verification

Run the QA script to verify all items programmatically:

```bash
bash scripts/prelaunch-qa.sh [--url https://taurorealty.com]
```

---

## 1. Forms & Lead Capture

| Check | Status | Notes |
|-------|--------|-------|
| Contact form submits to `/api/leads` | PASS | Zod validation, Turnstile CAPTCHA, honeypot |
| Tour booking form submits correctly | PASS | Date constraints, property selection, CAPTCHA |
| Seller inquiry form submits correctly | PASS | Email regex validation, required fields, CAPTCHA |
| Newsletter signup submits to `/api/newsletter` | PASS | Zod email validation, honeypot, CAPTCHA |
| Agent application form submits correctly | PASS | Type "agent-application", full Zod validation |
| API input sanitization | PASS | All inputs sanitized in `/api/leads/route.ts` |
| Rate limiting on form submissions | PASS | IP-based rate limiting via `getClientIp()` |
| GoHighLevel CRM sync | PASS | Leads synced to GHL on successful submission |

## 2. Error Pages

| Check | Status | Notes |
|-------|--------|-------|
| 404 page exists and styled | PASS | Gold/midnight theme, popular links, home CTA |
| 404 returns proper HTTP status | PASS | Next.js `not-found.tsx` convention |
| Error page (500) exists and styled | PASS | Sentry integration, contact info, retry/home buttons |
| Global error page exists | PASS | Inline styles (no CSS dependency), full branding |
| Error pages show contact info | PASS | Phone + email on both error pages |

## 3. Favicon & Icons

| Check | Status | Notes |
|-------|--------|-------|
| `favicon.ico` exists | PASS | 7.0 KB, app directory |
| Dynamic `icon.tsx` (32x32) | PASS | Generated from `tauro-logo.png` |
| Apple touch icon (180x180) | PASS | Rounded corners for iOS home screen |

## 4. OG & Social Images

| Check | Status | Notes |
|-------|--------|-------|
| `opengraph-image.tsx` generates 1200x630 | PASS | Dark theme, gold accents, "Premium Philadelphia Real Estate" |
| `twitter-image.tsx` generates 1200x630 | PASS | Matches OG image design |
| OG metadata in root layout | PASS | Type, locale, siteName, url, images configured |
| Twitter card set to `summary_large_image` | PASS | In root layout metadata |

## 5. SSL & Security

| Check | Status | Notes |
|-------|--------|-------|
| SSL certificate valid | VERIFY | Check after DNS cutover |
| Turnstile CAPTCHA on all public forms | PASS | Contact, tour booking, seller, newsletter, agent app |
| Honeypot bot protection | PASS | Hidden fields on forms |
| API routes validate with Zod schemas | PASS | All `/api/leads` and `/api/newsletter` routes |
| `robots.ts` blocks `/api/` and `/proposal/` | PASS | Prevents crawler access to internal routes |
| Input sanitization on all form data | PASS | Server-side sanitization in API routes |

## 6. Legal & Compliance

| Check | Status | Notes |
|-------|--------|-------|
| Privacy Policy page | PASS | Comprehensive, dated March 18, 2026 |
| Terms of Service page | PASS | 10 sections, contact info included |
| Cookie Policy page | PASS | Detailed cookie table, consent mechanism |
| Fair Housing Statement | PASS | Equal Housing Opportunity icon + statement |
| Cookie consent banner | PASS | `CookieConsent` component in root layout |

## 7. SEO

| Check | Status | Notes |
|-------|--------|-------|
| `metadataBase` set | PASS | Uses `siteUrl` from site-config |
| Canonical URLs configured | PASS | `alternates.canonical: "./"` |
| `robots.ts` properly configured | PASS | Allow `/`, disallow `/api/` and `/proposal/` |
| `sitemap.ts` with dynamic routes | PASS | Properties, neighborhoods, agents, location pages |
| Sitemap revalidation interval | PASS | 3600s (1 hour) |
| JSON-LD structured data | PASS | Organization + WebSite schemas |
| Page-specific titles via template | PASS | `"%s | Tauro"` template |
| Keywords configured | PASS | Philadelphia real estate, luxury homes, etc. |

## 8. Contact Information

| Check | Status | Notes |
|-------|--------|-------|
| Phone: (215) 839-4172 | PASS | Consistent across 21+ files |
| Email: info@taurorealty.com | PASS | Consistent across 21+ files |
| No conflicting phone numbers | PASS | Only one phone number pattern found |
| Contact page functional | PASS | Form + direct contact info |

## 9. Performance & UX

| Check | Status | Notes |
|-------|--------|-------|
| Font `display: swap` on all fonts | PASS | Playfair Display, DM Sans, Montserrat |
| Preconnect to external origins | PASS | Unsplash, Google Fonts |
| Non-critical widgets lazy-loaded | PASS | CookieConsent, ChatWidget, ScrollToTop, etc. |
| Skip-to-main-content link | PASS | Accessible focus styling |
| HTML `lang="en"` attribute | PASS | Root `<html>` tag |
| ARIA attributes in components | PASS | Found across form and navigation components |
| Viewport configured for mobile | PASS | device-width, initial-scale 1 |

## 10. Analytics & Monitoring

| Check | Status | Notes |
|-------|--------|-------|
| Vercel Analytics | PASS | In root layout |
| Vercel Speed Insights | PASS | In root layout |
| Google Analytics | PASS | Dynamic component in layout |
| Sentry error tracking | PASS | Client + server + edge configs |

## 11. Environment Variables

| Variable | Purpose | Status |
|----------|---------|--------|
| `NEXT_PUBLIC_SITE_URL` | Base URL | PASS |
| `NEXT_PUBLIC_SUPABASE_URL` | Database | PASS |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Database auth | PASS |
| `SUPABASE_SERVICE_ROLE_KEY` | Server DB access | PASS |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Maps | PASS |
| `RESEND_API_KEY` | Email delivery | PASS |
| `CRON_SECRET` | Cron security | PASS |
| `UPLOAD_API_KEY` | File uploads | PASS |
| `.env.example` documented | Reference | PASS |
| `.env.production.example` documented | Production ref | PASS |

## 12. Build & Deploy

| Check | Status | Notes |
|-------|--------|-------|
| `npm run build` succeeds | PASS | Clean compilation, no errors |
| TypeScript compilation | PASS | No type errors |
| ESLint passes | PASS | No lint errors in build |

---

## Pre-DNS Cutover Checklist

Before pointing `taurorealty.com` DNS to Vercel:

- [ ] All environment variables set in Vercel dashboard
- [ ] Custom domain added in Vercel project settings
- [ ] SSL certificate will auto-provision via Vercel
- [ ] Verify Supabase production database is seeded
- [ ] Verify GoHighLevel webhook URL updated for production domain
- [ ] Verify Turnstile site key is configured for production domain
- [ ] Verify Google Analytics property ID for production
- [ ] Verify Sentry DSN for production
- [ ] Run `bash scripts/prelaunch-qa.sh https://taurorealty.com` after DNS propagation
- [ ] Stakeholder walkthrough completed

## Sign-Off

| Role | Name | Date | Approved |
|------|------|------|----------|
| Developer QA | Agent4 | 2026-04-07 | Yes |
| Stakeholder | _Pending_ | _TBD_ | _Pending_ |
