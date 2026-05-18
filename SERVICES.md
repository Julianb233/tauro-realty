# PPP Service Modules

Optional add-on modules that extend the base PPP with specialized features. Add modules based on what services the client is paying for.

## Available Modules

### SEO Module (`services/seo/`)
**For:** SEO clients (keyword tracking, traffic analytics, authority score)
- `seo-data.ts` — keyword rankings, traffic trends, competitor comparison
- Adds a Stats page with charts (Recharts)
- Data source: SEMrush API via `/seo-audit` skill
- Auto-updates via daily cron snapshot

### CRM Module (`services/crm/`)
**For:** CRM clients (lead pipeline, conversion tracking)
- `crm-data.ts` — pipeline stages, lead counts, conversion rates
- Adds a Pipeline page showing funnel visualization
- Data source: GoHighLevel API or manual entry

### Content Module (`services/content/`)
**For:** Content marketing clients (article pipeline, publishing calendar)
- `content-data.ts` — articles in draft/review/published, content calendar events
- Adds a Content page with status badges and publishing timeline
- Data source: Linear issues tagged "content" + Fireflies meeting notes

### Chatbot Module (`services/chatbot/`)
**For:** Any client who needs interactive support
- `ChatWidget.tsx` — floating AI chatbot with media upload + voice
- **Text chat** → Claude API → auto-creates Linear issues
- **Photo/video/document** → Gemini Flash → multimodal analysis → Linear issue with visual context
- **Voice messages** → Whisper/Gemini transcription → codebase-aware Linear issue with file references
- Cross-posts to client Telegram group when connected
- Falls back to iMessage notification if Telegram not set up
- Requires: ANTHROPIC_API_KEY, GOOGLE_AI_API_KEY, LINEAR_API_KEY in .env.local
- See full chatbot spec in `services/chatbot/CHATBOT-CONFIG.md`

## How to Add a Module

1. Copy the module's data file to your `data/` directory
2. Populate with real client data
3. Import in the relevant page (or create a new page)
4. Add to the More menu navigation
5. Run `npm run build` to verify

## Module Roadmap

Future modules planned:
- **Invoicing** — Fanbasis payment integration, invoice history
- **Analytics** — Google Analytics dashboard embed
- **Social** — Social media posting calendar and performance
- **Email** — Email campaign analytics (Mailchimp/SendGrid)
