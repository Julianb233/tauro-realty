#!/bin/bash
# PPP Quality Gate Verification
# Run this BEFORE deploying. Exit 1 = fail, Exit 0 = pass.
# Usage: bash verify-ppp.sh /path/to/dashboard

DASH_DIR="${1:-.}"
ERRORS=0

echo "=== PPP QUALITY GATE CHECK ==="
echo "Directory: $DASH_DIR"
echo ""

# --- STRUCTURE CHECKS ---
echo "--- Structure ---"

# Minimum pages (7 required)
REQUIRED_PAGES=("app/page.tsx" "app/progress/page.tsx" "app/deliverables/page.tsx" "app/changelog/page.tsx" "app/action-items/page.tsx" "app/activity/page.tsx" "app/more/page.tsx")
for page in "${REQUIRED_PAGES[@]}"; do
  if [ -f "$DASH_DIR/$page" ]; then
    echo "  ✓ $page"
  else
    echo "  ✗ MISSING: $page"
    ((ERRORS++))
  fi
done

# Minimum data files (5 required)
REQUIRED_DATA=("data/client-data.ts" "data/changelog.ts" "data/deliverables.ts" "data/action-items.ts" "data/milestones.ts")
for file in "${REQUIRED_DATA[@]}"; do
  if [ -f "$DASH_DIR/$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ MISSING: $file"
    ((ERRORS++))
  fi
done

# --- DATA QUALITY CHECKS ---
echo ""
echo "--- Data Quality ---"

# Changelog must have 10+ entries
if [ -f "$DASH_DIR/data/changelog.ts" ]; then
  CHANGELOG_COUNT=$(grep -c "date:" "$DASH_DIR/data/changelog.ts" 2>/dev/null || echo 0)
  if [ "$CHANGELOG_COUNT" -ge 10 ]; then
    echo "  ✓ Changelog: $CHANGELOG_COUNT entries (min 10)"
  else
    echo "  ✗ Changelog: only $CHANGELOG_COUNT entries (need 10+)"
    ((ERRORS++))
  fi
fi

# Deliverables must have 10+ items
if [ -f "$DASH_DIR/data/deliverables.ts" ]; then
  DELIV_COUNT=$(grep -c "name:" "$DASH_DIR/data/deliverables.ts" 2>/dev/null || echo 0)
  if [ "$DELIV_COUNT" -ge 10 ]; then
    echo "  ✓ Deliverables: $DELIV_COUNT items (min 10)"
  else
    echo "  ✗ Deliverables: only $DELIV_COUNT items (need 10+)"
    ((ERRORS++))
  fi
fi

# Action items must have 3+ items with instructions
if [ -f "$DASH_DIR/data/action-items.ts" ]; then
  ACTION_COUNT=$(grep -c "instructions:" "$DASH_DIR/data/action-items.ts" 2>/dev/null || echo 0)
  if [ "$ACTION_COUNT" -ge 3 ]; then
    echo "  ✓ Action items: $ACTION_COUNT items with instructions (min 3)"
  else
    echo "  ✗ Action items: only $ACTION_COUNT items with instructions (need 3+)"
    ((ERRORS++))
  fi
fi

# --- CONTENT CHECKS ---
echo ""
echo "--- Content Quality ---"

# No placeholder text
PLACEHOLDERS=$(grep -rn "Lorem\|placeholder\|TODO\|FIXME\|Coming soon\|TBD" "$DASH_DIR/data/" "$DASH_DIR/app/" 2>/dev/null | grep -v node_modules | grep -v ".next" | head -5)
if [ -z "$PLACEHOLDERS" ]; then
  echo "  ✓ No placeholder text found"
else
  echo "  ✗ Placeholder text found:"
  echo "$PLACEHOLDERS" | while read line; do echo "    $line"; done
  ((ERRORS++))
fi

# AI Acrobatics branding present
if grep -rq "AI Acrobatics" "$DASH_DIR/app/layout.tsx" "$DASH_DIR/app/more/page.tsx" 2>/dev/null; then
  echo "  ✓ 'Powered by AI Acrobatics' branding found"
else
  echo "  ✗ Missing 'AI Acrobatics' branding"
  ((ERRORS++))
fi

# Dark theme present
if grep -q "0f172a" "$DASH_DIR/app/globals.css" 2>/dev/null; then
  echo "  ✓ Dark navy theme (#0f172a) present"
else
  echo "  ✗ Missing dark navy theme"
  ((ERRORS++))
fi

# Hub links with real URLs (not just #)
if [ -f "$DASH_DIR/data/client-data.ts" ]; then
  REAL_LINKS=$(grep -c "https://" "$DASH_DIR/data/client-data.ts" 2>/dev/null || echo 0)
  if [ "$REAL_LINKS" -ge 2 ]; then
    echo "  ✓ Hub links: $REAL_LINKS external URLs (min 2)"
  else
    echo "  ✗ Hub links: only $REAL_LINKS external URLs (need 2+)"
    ((ERRORS++))
  fi
fi

# --- BUILD CHECK ---
echo ""
echo "--- Build ---"

cd "$DASH_DIR"
BUILD_OUTPUT=$(npm run build 2>&1)
if echo "$BUILD_OUTPUT" | grep -q "Generating static pages"; then
  PAGE_COUNT=$(echo "$BUILD_OUTPUT" | grep "○\|●\|λ\|ƒ" | wc -l)
  echo "  ✓ Build passes — $PAGE_COUNT routes"
else
  echo "  ✗ Build FAILED"
  echo "$BUILD_OUTPUT" | tail -10
  ((ERRORS++))
fi

# --- SUMMARY ---
echo ""
echo "================================"
if [ "$ERRORS" -gt 0 ]; then
  echo "FAILED: $ERRORS errors"
  echo "DO NOT DEPLOY until all errors are fixed."
  exit 1
else
  echo "PASSED: All quality gates clear."
  echo "Safe to deploy."
  exit 0
fi
