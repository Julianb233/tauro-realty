#!/bin/bash
# PPP Auto-Post — Push deliverable updates to Telegram + iMessage + PPP
# Called by PostToolUse hooks or manually after completing work
#
# Usage: bash auto-post.sh <client-slug> <type> "<title>" "<body>" [asset_url]
#
# Types: deliverable | deploy | content | action-item | status-update
#
# Example:
#   bash auto-post.sh shipping-savior deliverable "Homepage Redesigned" "New hero section with video background" "https://shippingsavior.com"

set -euo pipefail

SLUG="${1:?Usage: bash auto-post.sh <slug> <type> <title> <body> [url]}"
TYPE="${2:?Provide type: deliverable|deploy|content|action-item|status-update}"
TITLE="${3:?Provide title}"
BODY="${4:?Provide body}"
ASSET_URL="${5:-}"

# --- Load client config from Supabase or local data ---
CLIENT_DATA="/opt/agency-workspace/${SLUG}/dashboard/data/client-data.ts"
TELEGRAM_CONFIG="/opt/agency-workspace/fleet-shared/telegram-channels.json"

# Extract client phone from data file
CLIENT_PHONE=$(grep -oP "phone:\s*[\"']([^\"']+)" "$CLIENT_DATA" 2>/dev/null | head -1 | grep -oP "[+][0-9]+")
# Extract Telegram chat ID
TELEGRAM_CHAT_ID=$(python3 -c "
import json
with open('$TELEGRAM_CONFIG') as f:
    data = json.load(f)
for ch in data.get('client_channels', []):
    if ch.get('slug') == '$SLUG':
        print(ch.get('chat_id', ''))
        break
" 2>/dev/null || echo "")

TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

# --- Format message based on type ---
case "$TYPE" in
  deliverable)
    EMOJI="📦"
    LABEL="New Deliverable"
    ;;
  deploy)
    EMOJI="🚀"
    LABEL="Deployed"
    ;;
  content)
    EMOJI="📝"
    LABEL="Content Published"
    ;;
  action-item)
    EMOJI="⚡"
    LABEL="Action Needed"
    ;;
  status-update)
    EMOJI="📊"
    LABEL="Status Update"
    ;;
  *)
    EMOJI="📌"
    LABEL="Update"
    ;;
esac

MESSAGE="${EMOJI} ${LABEL}: ${TITLE}

${BODY}"

if [ -n "$ASSET_URL" ]; then
  MESSAGE="${MESSAGE}

🔗 ${ASSET_URL}"
fi

MESSAGE="${MESSAGE}

— AI Acrobatics | ${TIMESTAMP}"

# --- 1. Post to Telegram (if chat ID exists) ---
if [ -n "$TELEGRAM_CHAT_ID" ]; then
  BOT_TOKEN=$(cat /opt/agency-workspace/.fleet-config/env/.env 2>/dev/null | grep TELEGRAM_BOT_TOKEN | cut -d= -f2 || echo "")
  if [ -n "$BOT_TOKEN" ]; then
    curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
      -d "chat_id=${TELEGRAM_CHAT_ID}" \
      -d "text=${MESSAGE}" \
      -d "parse_mode=Markdown" \
      > /dev/null 2>&1 && echo "✓ Telegram: posted to ${SLUG}" || echo "✗ Telegram: failed"
  else
    echo "⚠ Telegram: no bot token configured"
  fi
else
  echo "⚠ Telegram: no chat_id for ${SLUG} — falling back to iMessage only"
fi

# --- 2. Send iMessage (if phone exists) ---
if [ -n "$CLIENT_PHONE" ]; then
  # Rate limit: check last notification time
  LAST_FILE="/tmp/ppp-notify-${SLUG}-last"
  NOW=$(date +%s)
  LAST=$(cat "$LAST_FILE" 2>/dev/null || echo 0)
  DIFF=$((NOW - LAST))

  # 4-hour dedup window (14400 seconds) for same-type notifications
  TYPE_LAST_FILE="/tmp/ppp-notify-${SLUG}-${TYPE}-last"
  TYPE_LAST=$(cat "$TYPE_LAST_FILE" 2>/dev/null || echo 0)
  TYPE_DIFF=$((NOW - TYPE_LAST))

  if [ "$TYPE_DIFF" -gt 14400 ]; then
    # Check quiet hours (9pm-8am Pacific)
    HOUR=$(TZ=America/Los_Angeles date +%H)
    if [ "$HOUR" -ge 8 ] && [ "$HOUR" -lt 21 ]; then
      god mac send "$CLIENT_PHONE" "${EMOJI} ${LABEL}: ${TITLE}

${BODY}$([ -n "$ASSET_URL" ] && echo "

${ASSET_URL}")

View your portal for full details.
— AI Acrobatics" 2>/dev/null && echo "✓ iMessage: sent to ${CLIENT_PHONE}" || echo "✗ iMessage: failed"

      echo "$NOW" > "$TYPE_LAST_FILE"
      echo "$NOW" > "$LAST_FILE"
    else
      echo "⚠ iMessage: quiet hours (9pm-8am PT) — skipped"
    fi
  else
    echo "⚠ iMessage: dedup window (4hr) — skipped (last sent $((TYPE_DIFF/60))min ago)"
  fi
else
  echo "⚠ iMessage: no phone number for ${SLUG}"
fi

# --- 3. Update PPP data (append to recent activity) ---
# This is handled by the calling agent updating data files directly
echo "✓ Auto-post complete for ${SLUG}: ${TYPE} — ${TITLE}"
