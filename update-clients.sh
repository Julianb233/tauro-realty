#!/bin/bash
# Update all client PPP portals with latest template code
# Preserves each client's data/ directory
# Usage: bash update-clients.sh [--dry-run] [--build-only]

set -e

TEMPLATE_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE="/opt/agency-workspace"
DRY_RUN=false
BUILD_ONLY=false

for arg in "$@"; do
  case $arg in
    --dry-run) DRY_RUN=true ;;
    --build-only) BUILD_ONLY=true ;;
  esac
done

# Template files to sync (everything except data/ and node_modules/)
TEMPLATE_DIRS="app components public"
TEMPLATE_FILES="package.json package-lock.json tsconfig.json tailwind.config.ts postcss.config.mjs next.config.ts next.config.mjs next-env.d.ts"

echo "=== PPP Template Update ==="
echo "Template: $TEMPLATE_DIR"
echo ""

# Find all client portals (look for data/client-data.ts as marker)
UPDATED=0
for client_data in "$WORKSPACE"/*/dashboard/data/client-data.ts; do
  [ -f "$client_data" ] || continue
  CLIENT_DIR="$(dirname "$(dirname "$client_data")")"
  CLIENT_SLUG="$(basename "$(dirname "$CLIENT_DIR")")"

  # Skip the template itself
  [ "$CLIENT_DIR" = "$TEMPLATE_DIR" ] && continue

  echo "--- $CLIENT_SLUG ---"

  if $DRY_RUN; then
    echo "  [dry-run] Would update template code in $CLIENT_DIR"
    UPDATED=$((UPDATED + 1))
    continue
  fi

  # Sync template directories (rsync preserves client data/)
  for dir in $TEMPLATE_DIRS; do
    if [ -d "$TEMPLATE_DIR/$dir" ]; then
      rsync -a --delete "$TEMPLATE_DIR/$dir/" "$CLIENT_DIR/$dir/"
      echo "  Synced $dir/"
    fi
  done

  # Sync template files
  for file in $TEMPLATE_FILES; do
    if [ -f "$TEMPLATE_DIR/$file" ]; then
      cp "$TEMPLATE_DIR/$file" "$CLIENT_DIR/$file"
    fi
  done
  echo "  Synced config files"

  # Install dependencies
  cd "$CLIENT_DIR"
  npm install --silent 2>/dev/null
  echo "  Dependencies installed"

  # Build
  npm run build 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "  Build succeeded"
  else
    echo "  BUILD FAILED — skipping deploy"
    continue
  fi

  # Deploy (unless build-only)
  if ! $BUILD_ONLY; then
    VERCEL_TOKEN=$(op read "op://API-Keys/VERCEL-API-Token/credential" 2>/dev/null)
    if [ -n "$VERCEL_TOKEN" ]; then
      npx vercel --token "$VERCEL_TOKEN" --prod --yes --scope ai-acrobatics 2>/dev/null
      echo "  Deployed to Vercel"
    else
      echo "  No Vercel token — skipping deploy"
    fi
  fi

  UPDATED=$((UPDATED + 1))
  echo ""
done

echo "=== Done: $UPDATED client(s) updated ==="
