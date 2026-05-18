# PPP Chatbot Configuration

## Multi-Model Architecture

The PPP ChatWidget uses a dual-model approach:

### Text Conversations — Anthropic Claude
- Model: `claude-sonnet-4-6` (or latest)
- Used for: Text questions, request creation, status inquiries
- Auto-creates Linear issues with labels: `client-request`, `chat-request`, `{client-slug}`
- Required env: `ANTHROPIC_API_KEY`

### Multimodal Requests — Google Gemini Flash
- Model: `gemini-2.0-flash`
- Used for: Photo/image/video/document analysis
- Client sends photo → Gemini analyzes → creates descriptive Linear issue
- Use cases:
  - "Here's a screenshot of what I want changed" → visual diff → Linear issue
  - "Here's my logo" → brand asset extraction → stored in profile
  - "Here's a competitor's site" → screenshot analysis → competitive note
  - "Here's our menu/flyer/brochure" → OCR + content extraction
- Required env: `GOOGLE_AI_API_KEY`

### Routing Logic

```
if (message has attachments with images/video/docs) {
  → Route to Gemini Flash for multimodal analysis
  → Extract structured description
  → Create Linear issue with attachment URLs
} else {
  → Route to Claude for text conversation
  → Auto-create Linear issue if request detected
}
```

## Cross-Channel Sync

When a message is received in the chatbot:
1. Create Linear issue (if request)
2. Post to client's Telegram group (if exists)
3. If urgent, send iMessage to Julian

When a message is received in Telegram:
1. MoTheCEO_bot routes to relevant handler
2. If client request → Linear issue + PPP update
3. If media attachment → Gemini Flash analysis → Linear issue

### Voice Messages — Whisper + Codebase-Aware Linear Issues
- Transcription: OpenAI Whisper API (`whisper-1`) or Gemini Flash (supports audio natively)
- Used for: Voice notes from clients describing changes, reflections, or requests
- Pipeline:
  1. Client records voice message in PPP chat or Telegram
  2. Audio file sent to Whisper/Gemini for transcription
  3. Transcribed text analyzed by Claude with codebase context:
     - Agent reads the client's project repo structure
     - Maps client language ("change the hero section", "update the pricing") to actual files
     - Identifies which component/page/file the client is referencing
  4. Creates Linear issue with:
     - Title: concise description of what client wants
     - Description: full transcription + agent's interpretation
     - Labels: `client-request`, `voice-request`, `{client-slug}`
     - File references: exact file paths that need modification
     - Acceptance criteria: what "done" looks like based on client's words
- Required env: `OPENAI_API_KEY` (for Whisper) or `GOOGLE_AI_API_KEY` (Gemini handles audio too)

#### Codebase Reference Resolution

When the client says something like "change the blue button on the homepage", the agent:

```
1. Reads project structure: find app/page.tsx, components/*, etc.
2. Searches for "button" + "blue" + "home" in the codebase
3. Finds: components/HeroSection.tsx:42 — <button className="bg-blue-500">
4. Creates Linear issue referencing that exact file and line
5. Adds context: "Client wants to change the CTA button color on the homepage hero section"
```

This makes the issue immediately actionable by any agent — no guessing what the client meant.

## Required Environment Variables

```env
ANTHROPIC_API_KEY=       # Claude API for text chat
GOOGLE_AI_API_KEY=       # Gemini Flash for multimodal (images, video, audio)
OPENAI_API_KEY=          # Whisper for voice transcription (fallback — Gemini also handles audio)
LINEAR_API_KEY=          # Auto-create issues
CLIENT_SLUG=             # This client's slug
CLIENT_PHONE=            # Client's phone for iMessage fallback
TELEGRAM_CHAT_ID=        # Client's Telegram group ID
TELEGRAM_BOT_TOKEN=      # MoTheCEO_bot token
PROJECT_REPO=            # Absolute path to client's project repo (for codebase-aware issues)
```

## Client-Specific Knowledge Scope

Each PPP chatbot MUST be scoped to that specific client's project only. No cross-client data leakage.

### Knowledge Sources (loaded into system prompt)
1. **Client profile:** `/opt/agency-workspace/client-profiles/clients/{slug}/PROFILE.md`
2. **Project state:** `/opt/agency-workspace/{slug}/.planning/STATE.md`
3. **Deliverables:** PPP `data/deliverables.ts` (what's been shipped)
4. **Services:** PPP `data/services.ts` (what they're paying for)
5. **Action items:** PPP `data/action-items.ts` (what we need from them)
6. **Content calendar:** PPP `data/content-calendar.ts` (upcoming content)
7. **Changelog:** PPP `data/changelog.ts` (recent updates)
8. **Supabase:** `portal_feed`, `portal_chat_messages` for this client_id only

### What the Chatbot Knows
- Everything about THIS client's project: progress, deliverables, timeline, services
- AI Acrobatics general info: who we are, what we do, how we work
- How to submit requests (text, photo, voice → creates Linear issue)
- How to book a support call (Calendly link)
- Content calendar status (what's pending approval, what's scheduled)

### What the Chatbot Does NOT Know
- Other clients' data (strict tenant isolation)
- Internal agency operations
- Pricing details (always routes to Julian)
- Legal/contract terms (always routes to Julian)

### Support Call Booking

Every PPP chatbot includes a "Book a Support Call" action:

```
If client asks about: call, meeting, discuss, talk to someone, schedule, support

Response:
"You can book a call with Julian directly:
📞 https://calendly.com/julian-aiacrobatics

Available slots are shown in real-time. Pick whatever works for you and we'll be ready to discuss your project."
```

The Calendly link is also:
- Shown in the PPP More page under "Contact"
- Included in hub links on the homepage
- Available as a quick-action button in the ChatWidget

## Data Flow

```
Client Action → Channel → Processing → Output
─────────────────────────────────────────────
Text request  → PPP Chat → Claude    → Linear issue + Telegram post
Photo upload  → PPP Chat → Gemini    → Linear issue + asset extraction
Text message  → Telegram → Bot       → Linear issue + PPP update
Photo/video   → Telegram → Bot+Gemini→ Linear issue + asset extraction
iMessage      → Mac Mini → Manual    → Agent picks up + responds
```
