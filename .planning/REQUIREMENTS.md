# Requirements: PPP Template V3

## Version: v1.0

### Design System

- **DS-01**: Light gradient background using client brand colors from PROFILE.md
- **DS-02**: Glass cards with `bg-white/80 backdrop-blur shadow-lg border-0 rounded-2xl`
- **DS-03**: Full shadcn/ui component library (Card, Button, Badge, Tabs, Accordion, Dialog, Sheet, Avatar)
- **DS-04**: Client brand colors injected via CSS variables from `brand/colors.json`
- **DS-05**: Brand gradient on headings and CTAs (client primary → secondary)
- **DS-06**: Geist font family
- **DS-07**: Lucide icons throughout
- **DS-08**: Hover effects: `hover:shadow-lg hover:scale-[1.02] transition-all`
- **DS-09**: Responsive TopNav (desktop) + BottomNav (mobile) with pill-style active states
- **DS-10**: "Powered by AI Acrobatics" footer on every page

### Subpage Routes

- **SUB-01**: `/deliverables/[id]` — full detail with assets, approval history, comments, screenshots, URLs
- **SUB-02**: `/meetings/[id]` — full transcript, decisions with status, action items with owners, recording link
- **SUB-03**: `/progress/phase/[id]` — phase detail with deliverables, timeline, blockers, completion proof
- **SUB-04**: `/changelog/[id]` — full entry with items shipped, linked PRs, deploy URLs
- **SUB-05**: `/services/[slug]` — full service page with scope, features, included/excluded, upgrade CTA
- **SUB-06**: `/action-items/[id]` — full detail with upload form, step-by-step guide, status history, due date
- **SUB-07**: `/calendar/[id]` — content detail with preview, approve/reject, edit request form

### Chatbot & Interaction

- **CHAT-01**: Working Claude API integration for text chat (`/api/chat/`)
- **CHAT-02**: Media upload with Vercel Blob storage (`/api/chat/media/`)
- **CHAT-03**: Voice message transcription via Whisper/Deepgram (`/api/chat/voice/`)
- **CHAT-04**: Auto-create Linear issues from client requests (labels: `client-request`, `chat-request`)
- **CHAT-05**: Content approval workflow: approve/reject → status update + notification to Julian
- **CHAT-06**: Client asset submission upload form on action-item detail page
- **CHAT-07**: Request confirmation shown to client after submission

### Data Pipeline

- **DATA-01**: `setup.sh` reads PROFILE.md and populates ALL 8 data files with real client data
- **DATA-02**: Changelog auto-generated from git log + Linear closed issues + Fireflies decisions
- **DATA-03**: Deliverables pulled from PROFILE.md Deliverables Tracker + Linear completed issues
- **DATA-04**: Action items from Linear `client-action` label + PROFILE.md Promises Made
- **DATA-05**: Milestones from `.planning/ROADMAP.md` or PROFILE.md Milestones table
- **DATA-06**: Meetings from Fireflies API (transcripts, decisions, action items)
- **DATA-07**: Services from PROFILE.md Engagement Summary (active vs available)
- **DATA-08**: Brand colors from `brand/colors.json` → CSS variables in globals.css
- **DATA-09**: Content calendar from Linear content-labeled issues

### Deployment & Skills

- **DEPLOY-01**: Each client PPP is its own Vercel project at `{client-slug}-portal.vercel.app`
- **DEPLOY-02**: No dependency on portal.aiacrobatics.com multi-tenant system
- **SKILL-01**: `/client-portal` skill updated to use V3 template, inject brand colors, pull real data
- **SKILL-02**: `/ppp-notify` skill updated for standalone Vercel URLs
- **SKILL-03**: `verify-ppp.sh` checks for client brand colors (not hardcoded dark navy)
- **SKILL-04**: `client-portal-standard.md` rule updated for standalone deploys

### Existing Pages (Rebuild with new design)

- **PAGE-01**: Home/Snapshot — health badge, stats, recent activity, hub links, action items
- **PAGE-02**: Progress/Roadmap — phase cards, milestone timeline, progress bars
- **PAGE-03**: Deliverables — grouped by status/month, type badges, approval status
- **PAGE-04**: Changelog — filterable by category, newest first
- **PAGE-05**: Action Items — sorted by priority/status, step-by-step instructions
- **PAGE-06**: Activity — paginated feed with type filters
- **PAGE-07**: Services — active/available/coming-soon with features
- **PAGE-08**: Calendar — timeline + approval queue views
- **PAGE-09**: Meetings — meeting list with decisions and takeaways
- **PAGE-10**: More — resources hub, contact, how we work

## Out of Scope (v2+)

- Authentication/login — token-URL based, no passwords
- Multi-tenant portal.aiacrobatics.com — separate project
- Native mobile app — web-only
- Real-time websocket updates — polling for now
- CRM/GoHighLevel integration — separate project
- Payment processing — external links only

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DS-01 | Phase 1 | Pending |
| DS-02 | Phase 1 | Pending |
| DS-03 | Phase 1 | Pending |
| DS-04 | Phase 1 | Pending |
| DS-05 | Phase 1 | Pending |
| DS-06 | Phase 1 | Pending |
| DS-07 | Phase 1 | Pending |
| DS-08 | Phase 1 | Pending |
| DS-09 | Phase 2 | Pending |
| DS-10 | Phase 2 | Pending |
| PAGE-01 | Phase 3 | Pending |
| PAGE-02 | Phase 3 | Pending |
| PAGE-03 | Phase 3 | Pending |
| PAGE-04 | Phase 3 | Pending |
| PAGE-05 | Phase 3 | Pending |
| PAGE-06 | Phase 4 | Pending |
| PAGE-07 | Phase 4 | Pending |
| PAGE-08 | Phase 4 | Pending |
| PAGE-09 | Phase 4 | Pending |
| PAGE-10 | Phase 4 | Pending |
| SUB-01 | Phase 5 | Pending |
| SUB-02 | Phase 5 | Pending |
| SUB-03 | Phase 5 | Pending |
| SUB-04 | Phase 6 | Pending |
| SUB-05 | Phase 6 | Pending |
| SUB-06 | Phase 6 | Pending |
| SUB-07 | Phase 6 | Pending |
| CHAT-01 | Phase 7 | Pending |
| CHAT-02 | Phase 7 | Pending |
| CHAT-03 | Phase 7 | Pending |
| CHAT-04 | Phase 7 | Pending |
| CHAT-05 | Phase 8 | Pending |
| CHAT-06 | Phase 8 | Pending |
| CHAT-07 | Phase 8 | Pending |
| DATA-01 | Phase 9 | Pending |
| DATA-02 | Phase 9 | Pending |
| DATA-03 | Phase 9 | Pending |
| DATA-04 | Phase 9 | Pending |
| DATA-05 | Phase 9 | Pending |
| DATA-06 | Phase 9 | Pending |
| DATA-07 | Phase 9 | Pending |
| DATA-08 | Phase 9 | Pending |
| DATA-09 | Phase 9 | Pending |
| DEPLOY-01 | Phase 10 | Pending |
| DEPLOY-02 | Phase 10 | Pending |
| SKILL-01 | Phase 10 | Pending |
| SKILL-02 | Phase 10 | Pending |
| SKILL-03 | Phase 10 | Pending |
| SKILL-04 | Phase 10 | Pending |

**Coverage:**
- v1 requirements: 47 total
- Mapped to phases: 47
- Unmapped: 0
