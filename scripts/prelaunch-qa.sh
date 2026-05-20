#!/usr/bin/env bash
# ============================================================================
# TAURO Pre-Launch QA Verification Script
# ============================================================================
# Automated checks for pre-launch readiness. Run before DNS cutover.
# Usage: bash scripts/prelaunch-qa.sh [--url https://taurorealty.com]
#
# Exit codes: 0 = all pass, 1 = failures found
# ============================================================================

set -euo pipefail

SITE_URL="${1:-https://taurorealty.com}"
PASS=0
FAIL=0
WARN=0

green() { printf "\033[32m✓ %s\033[0m\n" "$1"; }
red()   { printf "\033[31m✗ %s\033[0m\n" "$1"; }
yellow(){ printf "\033[33m⚠ %s\033[0m\n" "$1"; }

check_pass() { green "$1"; ((PASS++)); }
check_fail() { red "$1";   ((FAIL++)); }
check_warn() { yellow "$1"; ((WARN++)); }

section() { printf "\n\033[1;36m── %s ──\033[0m\n" "$1"; }

# ============================================================================
# 1. BUILD VERIFICATION
# ============================================================================
section "Build Verification"

if npm run build --silent 2>/dev/null; then
  check_pass "Next.js production build succeeds"
else
  check_fail "Next.js production build FAILED"
fi

# ============================================================================
# 2. FILE EXISTENCE CHECKS
# ============================================================================
section "Critical Files"

files=(
  "src/app/layout.tsx:Root layout"
  "src/app/not-found.tsx:404 page"
  "src/app/error.tsx:Error page"
  "src/app/global-error.tsx:Global error page"
  "src/app/favicon.ico:Favicon"
  "src/app/icon.tsx:Dynamic icon generator"
  "src/app/apple-icon.tsx:Apple touch icon"
  "src/app/opengraph-image.tsx:OG image generator"
  "src/app/twitter-image.tsx:Twitter card image"
  "src/app/robots.ts:Robots.txt"
  "src/app/sitemap.ts:Sitemap"
  "src/app/(site)/privacy/page.tsx:Privacy Policy"
  "src/app/(site)/terms/page.tsx:Terms of Service"
  "src/app/(site)/cookie-policy/page.tsx:Cookie Policy"
  "src/app/(site)/fair-housing/page.tsx:Fair Housing Statement"
  "src/app/(site)/contact/page.tsx:Contact page"
)

for entry in "${files[@]}"; do
  file="${entry%%:*}"
  label="${entry##*:}"
  if [ -f "$file" ]; then
    check_pass "$label exists ($file)"
  else
    check_fail "$label MISSING ($file)"
  fi
done

# ============================================================================
# 3. CONTACT INFORMATION CONSISTENCY
# ============================================================================
section "Contact Information"

PHONE="(215) 839-4172"
EMAIL="info@taurorealty.com"

phone_count=$(grep -r "$PHONE" src/ --include="*.tsx" --include="*.ts" -l 2>/dev/null | wc -l)
email_count=$(grep -r "$EMAIL" src/ --include="*.tsx" --include="*.ts" -l 2>/dev/null | wc -l)

if [ "$phone_count" -gt 0 ]; then
  check_pass "Phone number ($PHONE) found in $phone_count files"
else
  check_fail "Phone number ($PHONE) not found in any source files"
fi

if [ "$email_count" -gt 0 ]; then
  check_pass "Email ($EMAIL) found in $email_count files"
else
  check_fail "Email ($EMAIL) not found in any source files"
fi

# Check for inconsistent phone numbers
other_phones=$(grep -roPh '\(\d{3}\)\s*\d{3}-\d{4}' src/ --include="*.tsx" --include="*.ts" 2>/dev/null | sort -u | grep -v "$PHONE" || true)
if [ -z "$other_phones" ]; then
  check_pass "No inconsistent phone numbers found"
else
  check_warn "Other phone numbers found: $other_phones"
fi

# ============================================================================
# 4. SEO & META VERIFICATION
# ============================================================================
section "SEO Configuration"

# Check metadata in layout
if grep -q 'metadataBase' src/app/layout.tsx; then
  check_pass "metadataBase is set in root layout"
else
  check_fail "metadataBase missing from root layout"
fi

if grep -q 'openGraph' src/app/layout.tsx; then
  check_pass "OpenGraph metadata configured"
else
  check_fail "OpenGraph metadata missing"
fi

if grep -q 'twitter' src/app/layout.tsx; then
  check_pass "Twitter card metadata configured"
else
  check_fail "Twitter card metadata missing"
fi

if grep -q 'canonical' src/app/layout.tsx; then
  check_pass "Canonical URL configured"
else
  check_warn "Canonical URL not set"
fi

# JSON-LD structured data
if grep -q 'JsonLd' src/app/layout.tsx; then
  check_pass "JSON-LD structured data present"
else
  check_warn "JSON-LD structured data missing"
fi

# ============================================================================
# 5. SECURITY CHECKS
# ============================================================================
section "Security"

# Turnstile CAPTCHA on forms
captcha_forms=$(grep -rl 'Turnstile\|turnstile' src/components/ --include="*.tsx" 2>/dev/null | wc -l)
if [ "$captcha_forms" -gt 0 ]; then
  check_pass "Turnstile CAPTCHA found in $captcha_forms form components"
else
  check_warn "No CAPTCHA protection found on forms"
fi

# Honeypot fields
if grep -rq 'honeypot\|honey_pot' src/ --include="*.tsx" --include="*.ts" 2>/dev/null; then
  check_pass "Honeypot bot protection found"
else
  check_warn "No honeypot fields found"
fi

# API route validation
if grep -rq 'zod\|z\.object\|z\.string' src/app/api/ --include="*.ts" 2>/dev/null; then
  check_pass "Zod schema validation in API routes"
else
  check_warn "No Zod validation found in API routes"
fi

# robots.txt disallows /api/
if grep -q '/api/' src/app/robots.ts; then
  check_pass "robots.ts disallows /api/ crawling"
else
  check_warn "robots.ts does not disallow /api/"
fi

# ============================================================================
# 6. ACCESSIBILITY
# ============================================================================
section "Accessibility"

if grep -q 'skip.*main.*content' src/app/layout.tsx 2>/dev/null; then
  check_pass "Skip-to-main-content link present"
else
  check_warn "Skip-to-main-content link missing"
fi

if grep -q 'lang="en"' src/app/layout.tsx 2>/dev/null; then
  check_pass "HTML lang attribute set"
else
  check_fail "HTML lang attribute missing"
fi

if grep -rq 'aria-label\|aria-hidden\|aria-describedby' src/ --include="*.tsx" 2>/dev/null; then
  check_pass "ARIA attributes found in components"
else
  check_warn "No ARIA attributes found"
fi

# ============================================================================
# 7. PERFORMANCE
# ============================================================================
section "Performance"

if grep -q 'display.*swap' src/app/layout.tsx; then
  check_pass "Font display: swap configured (prevents FOIT)"
else
  check_warn "Font display: swap not found"
fi

if grep -q 'preconnect' src/app/layout.tsx; then
  check_pass "Preconnect hints for external origins"
else
  check_warn "No preconnect hints found"
fi

if grep -q 'dynamic.*import' src/app/layout.tsx; then
  check_pass "Non-critical widgets lazy-loaded"
else
  check_warn "No dynamic imports found for widgets"
fi

# ============================================================================
# 8. ENVIRONMENT VARIABLES
# ============================================================================
section "Environment Variables"

if [ -f ".env.example" ]; then
  check_pass ".env.example exists for documentation"
else
  check_warn ".env.example missing"
fi

# Check critical env vars are referenced
env_vars=(
  "NEXT_PUBLIC_SUPABASE_URL:Supabase URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY:Supabase anon key"
  "RESEND_API_KEY:Email delivery"
  "NEXT_PUBLIC_SITE_URL:Site URL"
)

for entry in "${env_vars[@]}"; do
  var="${entry%%:*}"
  label="${entry##*:}"
  if grep -rq "$var" src/ --include="*.ts" --include="*.tsx" 2>/dev/null; then
    check_pass "$label ($var) referenced in code"
  else
    check_warn "$label ($var) not found in code"
  fi
done

# ============================================================================
# 9. ANALYTICS & MONITORING
# ============================================================================
section "Analytics & Monitoring"

if grep -rq 'Analytics\|analytics' src/app/layout.tsx 2>/dev/null; then
  check_pass "Vercel Analytics configured"
else
  check_warn "Vercel Analytics not found"
fi

if grep -rq 'SpeedInsights' src/app/layout.tsx 2>/dev/null; then
  check_pass "Vercel Speed Insights configured"
else
  check_warn "Speed Insights not found"
fi

if grep -rq 'GoogleAnalytics\|gtag\|GA_MEASUREMENT' src/ --include="*.tsx" --include="*.ts" 2>/dev/null; then
  check_pass "Google Analytics integration found"
else
  check_warn "Google Analytics not configured"
fi

if [ -f "sentry.client.config.ts" ] && [ -f "sentry.server.config.ts" ]; then
  check_pass "Sentry error tracking configured (client + server)"
else
  check_warn "Sentry config incomplete or missing"
fi

# ============================================================================
# 10. LIVE SITE CHECKS (if URL is reachable)
# ============================================================================
section "Live Site Checks ($SITE_URL)"

if curl -s --max-time 10 -o /dev/null -w "%{http_code}" "$SITE_URL" 2>/dev/null | grep -q "200"; then
  check_pass "Homepage returns 200"

  # Check SSL
  if curl -s --max-time 10 -o /dev/null "https://${SITE_URL#https://}" 2>/dev/null; then
    check_pass "SSL certificate valid"
  else
    check_warn "SSL check inconclusive"
  fi

  # Check key pages
  pages=("/properties" "/contact" "/privacy" "/terms" "/agents" "/neighborhoods")
  for page in "${pages[@]}"; do
    status=$(curl -s --max-time 10 -o /dev/null -w "%{http_code}" "${SITE_URL}${page}" 2>/dev/null)
    if [ "$status" = "200" ]; then
      check_pass "$page returns $status"
    else
      check_warn "$page returns $status"
    fi
  done

  # Check 404 handling
  status_404=$(curl -s --max-time 10 -o /dev/null -w "%{http_code}" "${SITE_URL}/this-page-does-not-exist-xyz" 2>/dev/null)
  if [ "$status_404" = "404" ]; then
    check_pass "404 page returns proper 404 status"
  else
    check_warn "Non-existent page returns $status_404 (expected 404)"
  fi

  # Check robots.txt
  robots_status=$(curl -s --max-time 10 -o /dev/null -w "%{http_code}" "${SITE_URL}/robots.txt" 2>/dev/null)
  if [ "$robots_status" = "200" ]; then
    check_pass "robots.txt accessible"
  else
    check_warn "robots.txt returns $robots_status"
  fi

  # Check sitemap
  sitemap_status=$(curl -s --max-time 10 -o /dev/null -w "%{http_code}" "${SITE_URL}/sitemap.xml" 2>/dev/null)
  if [ "$sitemap_status" = "200" ]; then
    check_pass "sitemap.xml accessible"
  else
    check_warn "sitemap.xml returns $sitemap_status"
  fi

  # Check OG image
  og_status=$(curl -s --max-time 10 -o /dev/null -w "%{http_code}" "${SITE_URL}/opengraph-image" 2>/dev/null)
  if [ "$og_status" = "200" ]; then
    check_pass "OG image endpoint returns 200"
  else
    check_warn "OG image endpoint returns $og_status"
  fi

else
  check_warn "Site not reachable at $SITE_URL — skipping live checks"
fi

# ============================================================================
# SUMMARY
# ============================================================================
printf "\n\033[1;37m════════════════════════════════════════════\033[0m\n"
printf "\033[1;37m  TAURO Pre-Launch QA Summary\033[0m\n"
printf "\033[1;37m════════════════════════════════════════════\033[0m\n"
printf "\033[32m  Passed:   %d\033[0m\n" "$PASS"
printf "\033[33m  Warnings: %d\033[0m\n" "$WARN"
printf "\033[31m  Failed:   %d\033[0m\n" "$FAIL"
printf "\033[1;37m════════════════════════════════════════════\033[0m\n"

if [ "$FAIL" -gt 0 ]; then
  printf "\033[31m  RESULT: FAILED — fix %d issue(s) before launch\033[0m\n" "$FAIL"
  exit 1
else
  printf "\033[32m  RESULT: READY FOR LAUNCH\033[0m\n"
  exit 0
fi
