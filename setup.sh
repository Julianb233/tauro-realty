#!/bin/bash
# PPP Setup Script — Clone and customize template for a new client
# Usage: bash setup.sh <client-slug> "<Client Name>" "<+phone>"
#
# Example: bash setup.sh shipping-savior "Shipping Savior" "+16198475543"

set -e

SLUG="${1:?Usage: bash setup.sh <slug> '<name>' '<phone>'}"
NAME="${2:?Provide client name as second argument}"
PHONE="${3:?Provide client phone as third argument}"
CONTACT="${4:-$NAME}"  # Optional 4th arg for contact name, defaults to business name

TARGET="/opt/agency-workspace/${SLUG}/dashboard"

echo "=== PPP Setup for ${NAME} ==="
echo "Slug: ${SLUG}"
echo "Target: ${TARGET}"

# Check profile exists
PROFILE="/opt/agency-workspace/client-profiles/clients/${SLUG}/PROFILE.md"
if [ -f "$PROFILE" ]; then
  echo "✓ Client profile found at ${PROFILE}"
else
  echo "⚠ No profile at ${PROFILE} — run /client-profile-setup first for best results"
fi

# Copy template
if [ -d "$TARGET" ]; then
  echo "✗ Directory already exists: ${TARGET}"
  echo "  Delete it first or choose a different slug"
  exit 1
fi

echo "Copying template..."
cp -r /opt/agency-workspace/ppp-template/ "$TARGET"
cd "$TARGET"

# Replace placeholders in data files
echo "Customizing data files..."
sed -i "s/Acme Corp/${NAME}/g" data/client-data.ts
sed -i "s/acme-corp/${SLUG}/g" data/client-data.ts
sed -i "s/Alex/${CONTACT}/g" data/client-data.ts
sed -i "s/+15551234567/${PHONE}/g" data/client-data.ts

# Install dependencies
echo "Installing dependencies..."
npm install --silent 2>&1 | tail -3

# Run quality check
echo ""
echo "Running quality gate..."
bash verify.sh . || echo "⚠ Quality gate has findings — customize data files before deploying"

echo ""
echo "=== Setup Complete ==="
echo "Next steps:"
echo "  1. Edit data/ files with real client data (see TEMPLATE.md)"
echo "  2. Run: npm run build"
echo "  3. Run: bash verify.sh ."
echo "  4. Deploy: npx vercel --yes --prod"
