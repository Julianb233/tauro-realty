# Roadmap: PPP Template V3

## Overview

Complete rebuild of the PPP client portal template from dark navy to appsport-inspired light design with client brand colors, full subpage routes for every section, working chatbot/review/request system, and automated data pipeline. 10 phases covering design foundation through skill updates.

## Phases

- [ ] **Phase 1: Design Foundation** - shadcn/ui setup, CSS variable theming, brand color injection, base components
- [ ] **Phase 2: Layout & Navigation** - TopNav, BottomNav, responsive layout shell, page wrappers
- [ ] **Phase 3: Core Pages (Part 1)** - Home, Progress, Deliverables, Changelog rebuilt with new design
- [ ] **Phase 4: Core Pages (Part 2)** - Action Items, Activity, Services, Calendar, Meetings, More rebuilt
- [ ] **Phase 5: Subpage Routes (Part 1)** - Deliverable detail, Meeting detail, Phase detail pages
- [ ] **Phase 6: Subpage Routes (Part 2)** - Changelog detail, Service detail, Action Item detail, Calendar detail
- [ ] **Phase 7: Chatbot Backend** - Claude API chat, media upload (Vercel Blob), voice transcription, Linear issue creation
- [ ] **Phase 8: Review & Approval System** - Content approval workflow, asset submission, request confirmation
- [ ] **Phase 9: Data Pipeline** - setup.sh rewrite pulling from PROFILE.md, git, Linear, Fireflies for all 8 data files
- [ ] **Phase 10: Skills & Deployment** - Update /client-portal, /ppp-notify, verify-ppp.sh, client-portal-standard.md

## Phase Details

### Phase 1: Design Foundation
**Goal**: Replace dark navy theme with appsport-inspired light design system using shadcn/ui and client brand colors
**Depends on**: Nothing (first phase)
**Requirements**: DS-01, DS-02, DS-03, DS-04, DS-05, DS-06, DS-07, DS-08
**Research needed**: Unlikely
**Success Criteria** (what must be TRUE):
  1. `globals.css` uses CSS variables for client brand colors (primary, secondary, accent) with light gradient background
  2. shadcn/ui components installed and configured (Card, Button, Badge, Tabs, Accordion, Dialog, Sheet, Avatar)
  3. Geist font loads, Lucide icons available, glass card style (`bg-white/80 backdrop-blur`) renders correctly
  4. Brand color injection works: changing CSS variables changes all branded elements
  5. `npm run build` passes with zero errors
**Plans**: TBD

### Phase 2: Layout & Navigation
**Goal**: Responsive layout shell with TopNav (desktop) and BottomNav (mobile) using new design language
**Depends on**: Phase 1
**Requirements**: DS-09, DS-10
**Research needed**: Unlikely
**Success Criteria** (what must be TRUE):
  1. Desktop shows sticky TopNav with pill-style navigation and client logo/name
  2. Mobile shows BottomNav with 5 icon tabs, hidden on lg+ screens
  3. "Powered by AI Acrobatics" footer visible on every page
  4. Layout wraps all page content with proper responsive container and spacing
  5. Active page highlighted in both nav systems
**Plans**: TBD

### Phase 3: Core Pages (Part 1)
**Goal**: Rebuild Home, Progress, Deliverables, and Changelog pages with new design and data integration
**Depends on**: Phase 2
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04
**Research needed**: Unlikely
**Success Criteria** (what must be TRUE):
  1. Home page shows health badge, stats grid, recent activity feed, hub links, and action item alerts
  2. Progress page shows phase cards with progress bars, milestone timeline, expandable deliverable checklists
  3. Deliverables page shows items grouped by status with type badges, approval status, and asset links
  4. Changelog page shows filterable entries by category with date, title, description, and bullet items
  5. All pages use glass cards, brand colors, and shadcn/ui components
**Plans**: TBD

### Phase 4: Core Pages (Part 2)
**Goal**: Rebuild Action Items, Activity, Services, Calendar, Meetings, and More pages
**Depends on**: Phase 2
**Requirements**: PAGE-05, PAGE-06, PAGE-07, PAGE-08, PAGE-09, PAGE-10
**Research needed**: Unlikely
**Success Criteria** (what must be TRUE):
  1. Action Items page shows items sorted by priority/status with step-by-step instructions
  2. Activity page shows paginated feed with type filters (deploy, feature, content, etc.)
  3. Services page shows active/available/coming-soon with feature lists
  4. Calendar page shows timeline view and approval queue with approve/reject UI
  5. Meetings page shows meeting list with decisions, takeaways, and action items
  6. More page has resources hub, contact info, how we work, and quick links
**Plans**: TBD

### Phase 5: Subpage Routes (Part 1)
**Goal**: Add full detail pages for deliverables, meetings, and progress phases
**Depends on**: Phase 3
**Requirements**: SUB-01, SUB-02, SUB-03
**Research needed**: Unlikely
**Success Criteria** (what must be TRUE):
  1. `/deliverables/[id]` shows full detail with assets list, approval history, comments thread, screenshots
  2. `/meetings/[id]` shows full transcript, all decisions with status, action items with owners, recording link
  3. `/progress/phase/[id]` shows phase detail with every deliverable, timeline, blockers, completion proof
  4. Clicking an item on the list page navigates to its detail page
  5. Detail pages have back navigation to the list page
**Plans**: TBD

### Phase 6: Subpage Routes (Part 2)
**Goal**: Add full detail pages for changelog, services, action items, and calendar content
**Depends on**: Phase 4
**Requirements**: SUB-04, SUB-05, SUB-06, SUB-07
**Research needed**: Unlikely
**Success Criteria** (what must be TRUE):
  1. `/changelog/[id]` shows full entry with all items shipped, linked PRs, deploy URLs
  2. `/services/[slug]` shows full service page with scope, features, included/excluded, upgrade CTA
  3. `/action-items/[id]` shows full detail with upload form, step-by-step guide, status history, due date countdown
  4. `/calendar/[id]` shows content detail with preview, approve/reject buttons, edit request form
  5. All detail pages maintain glass card design with proper mobile responsiveness
**Plans**: TBD

### Phase 7: Chatbot Backend
**Goal**: Wire up the existing ChatWidget to working backend services — chat, media upload, voice, Linear integration
**Depends on**: Phase 2
**Requirements**: CHAT-01, CHAT-02, CHAT-03, CHAT-04
**Research needed**: Likely
  - Vercel Blob API for media storage
  - Whisper/Deepgram API for voice transcription
  - Linear API for issue creation from chat
**Success Criteria** (what must be TRUE):
  1. Client can type a message in chat and get an AI response from Claude
  2. Client can upload an image/file and it persists in Vercel Blob storage
  3. Client can send a voice message and it gets transcribed to text
  4. When client describes a change request, a Linear issue is auto-created with proper labels
**Plans**: TBD

### Phase 8: Review & Approval System
**Goal**: Working content approval workflow, asset submission for action items, and request confirmation
**Depends on**: Phase 6, Phase 7
**Requirements**: CHAT-05, CHAT-06, CHAT-07
**Research needed**: Unlikely
**Success Criteria** (what must be TRUE):
  1. Client can approve/reject content from calendar detail page → status updates in data
  2. Client can upload assets on action-item detail page (files stored in Vercel Blob)
  3. After submitting a request (chat or form), client sees confirmation with tracking
  4. Julian gets notified (iMessage) when client approves/rejects content or submits assets
**Plans**: TBD

### Phase 9: Data Pipeline
**Goal**: Rewrite setup.sh to auto-populate all 8 data files from PROFILE.md, git, Linear, and Fireflies
**Depends on**: Phase 4
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, DATA-07, DATA-08, DATA-09
**Research needed**: Likely
  - Fireflies API for meeting transcript extraction
  - Linear API for issue/deliverable/action-item queries
  - PROFILE.md parsing for brand colors, deliverables, milestones, services
**Success Criteria** (what must be TRUE):
  1. Running `setup.sh <slug>` reads PROFILE.md and generates all 8 data files with real data
  2. Changelog contains real entries from git log and Linear (no "Acme Corp" placeholders)
  3. Brand colors from `brand/colors.json` are injected as CSS variables in globals.css
  4. Deliverables, milestones, action items, services all reflect actual client project state
  5. Zero placeholder text in any generated data file
**Plans**: TBD

### Phase 10: Skills & Deployment
**Goal**: Update fleet skills and rules to use V3 template with standalone Vercel deploys
**Depends on**: Phase 9
**Requirements**: DEPLOY-01, DEPLOY-02, SKILL-01, SKILL-02, SKILL-03, SKILL-04
**Research needed**: Unlikely
**Success Criteria** (what must be TRUE):
  1. `/client-portal` skill generates V3 portals with client brand colors and real data
  2. `/ppp-notify` references standalone Vercel URLs, not portal.aiacrobatics.com
  3. `verify-ppp.sh` validates client brand color presence (not hardcoded dark navy)
  4. `client-portal-standard.md` rule describes standalone Vercel deploy architecture
  5. A test client PPP deploys successfully to `{slug}-portal.vercel.app`
**Plans**: TBD

## Progress

**Execution Order:**
Phase 1 → 2 → 3 + 4 (parallel) → 5 + 6 (parallel, after their deps) → 7 (parallel with 5/6) → 8 (after 6+7) → 9 (after 4) → 10 (after 9)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design Foundation | 0/TBD | Not started | - |
| 2. Layout & Navigation | 0/TBD | Not started | - |
| 3. Core Pages (Part 1) | 0/TBD | Not started | - |
| 4. Core Pages (Part 2) | 0/TBD | Not started | - |
| 5. Subpage Routes (Part 1) | 0/TBD | Not started | - |
| 6. Subpage Routes (Part 2) | 0/TBD | Not started | - |
| 7. Chatbot Backend | 0/TBD | Not started | - |
| 8. Review & Approval System | 0/TBD | Not started | - |
| 9. Data Pipeline | 0/TBD | Not started | - |
| 10. Skills & Deployment | 0/TBD | Not started | - |
