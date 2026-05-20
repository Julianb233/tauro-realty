#!/usr/bin/env bash
#
# update-agent-photo.sh — Replace an agent's photo with a real headshot
#
# Usage:
#   ./scripts/update-agent-photo.sh <agent-slug> <path-to-new-photo>
#
# Examples:
#   ./scripts/update-agent-photo.sh morris-brown ~/Downloads/morris-headshot.jpg
#   ./scripts/update-agent-photo.sh tony-goodman /tmp/tony-professional.png
#
# What this does:
#   1. Validates the agent slug exists in src/data/agents.ts
#   2. Validates the source image file exists and is a valid image
#   3. Backs up the current photo to public/agents/backup/
#   4. Copies the new photo to public/agents/<slug>.jpg (converting if needed)
#   5. Updates photoStatus from "pending"/"placeholder" to "real" in agents.ts
#   6. Prints next steps (commit, push, deploy)
#
# Requirements: ImageMagick (convert) for format conversion/resizing
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
AGENTS_DIR="$PROJECT_ROOT/public/agents"
BACKUP_DIR="$AGENTS_DIR/backup"
AGENTS_TS="$PROJECT_ROOT/src/data/agents.ts"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
GOLD='\033[0;33m'
NC='\033[0m' # No Color

usage() {
  echo "Usage: $0 <agent-slug> <path-to-new-photo>"
  echo ""
  echo "Agent slugs:"
  echo "  tony-goodman"
  echo "  shaquonda-garrett"
  echo "  morris-brown"
  echo "  stephen-stevens"
  echo "  chris-lane"
  echo ""
  echo "Example:"
  echo "  $0 morris-brown ~/Downloads/morris-headshot.jpg"
  exit 1
}

if [ $# -ne 2 ]; then
  usage
fi

SLUG="$1"
SOURCE="$2"

# Validate slug exists in agents.ts
if ! grep -q "slug: \"$SLUG\"" "$AGENTS_TS"; then
  echo -e "${RED}Error: Agent slug '$SLUG' not found in agents.ts${NC}"
  echo "Valid slugs: tony-goodman, shaquonda-garrett, morris-brown, stephen-stevens, chris-lane"
  exit 1
fi

# Validate source file exists
if [ ! -f "$SOURCE" ]; then
  echo -e "${RED}Error: Source file '$SOURCE' does not exist${NC}"
  exit 1
fi

# Validate it's an image
MIME=$(file --mime-type -b "$SOURCE")
if [[ ! "$MIME" =~ ^image/ ]]; then
  echo -e "${RED}Error: '$SOURCE' is not an image (detected: $MIME)${NC}"
  exit 1
fi

echo -e "${GOLD}Updating agent photo for: $SLUG${NC}"
echo "  Source: $SOURCE"
echo "  MIME type: $MIME"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup current photo
DEST="$AGENTS_DIR/$SLUG.jpg"
if [ -f "$DEST" ]; then
  TIMESTAMP=$(date +%Y%m%d-%H%M%S)
  BACKUP="$BACKUP_DIR/${SLUG}_${TIMESTAMP}.jpg"
  cp "$DEST" "$BACKUP"
  echo -e "  ${GREEN}Backed up current photo to: $BACKUP${NC}"
fi

# Copy/convert the new photo
EXT="${SOURCE##*.}"
EXT_LOWER=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')

if command -v convert &>/dev/null; then
  # Use ImageMagick to resize and convert to JPG
  echo "  Converting and optimizing with ImageMagick..."
  convert "$SOURCE" \
    -resize "1200x1600>" \
    -quality 85 \
    -strip \
    "$DEST"
  echo -e "  ${GREEN}Photo converted and optimized${NC}"
elif [ "$EXT_LOWER" = "jpg" ] || [ "$EXT_LOWER" = "jpeg" ]; then
  cp "$SOURCE" "$DEST"
  echo -e "  ${GREEN}Photo copied (no conversion needed)${NC}"
else
  echo -e "${RED}Warning: Source is $EXT_LOWER but ImageMagick not available for conversion${NC}"
  echo "  Copying as-is (may need manual conversion to JPG)"
  cp "$SOURCE" "$DEST"
fi

# Update photoStatus in agents.ts
# Find the agent block and change photoStatus to "real"
if grep -A2 "slug: \"$SLUG\"" "$AGENTS_TS" | grep -q 'photoStatus:'; then
  # Use sed to find the photoStatus line after the slug match and update it
  sed -i "/${SLUG}/,/photoStatus:/{s/photoStatus: \"pending\"/photoStatus: \"real\"/;s/photoStatus: \"placeholder\"/photoStatus: \"real\"/}" "$AGENTS_TS"
  echo -e "  ${GREEN}Updated photoStatus to 'real' in agents.ts${NC}"
else
  echo -e "${GOLD}  Note: photoStatus field not found near slug. Manual update may be needed.${NC}"
fi

# Show final file info
SIZE=$(du -h "$DEST" | cut -f1)
if command -v identify &>/dev/null; then
  DIMS=$(identify -format "%wx%h" "$DEST" 2>/dev/null || echo "unknown")
  echo -e "\n${GREEN}Done!${NC} New photo: $DEST ($SIZE, ${DIMS}px)"
else
  echo -e "\n${GREEN}Done!${NC} New photo: $DEST ($SIZE)"
fi

echo ""
echo "Next steps:"
echo "  1. Review the photo: open $DEST"
echo "  2. Commit: git add public/agents/$SLUG.jpg src/data/agents.ts"
echo "  3. Push and deploy"
