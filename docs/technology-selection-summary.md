# Technology Selection & Proof of Concept - Consolidated Summary

## 1. Build vs. Buy Analysis

### Market Analysis
- No SaaS products (e.g., Evernote, Notion, Google Keep, Simplenote, Standard Notes) meet 80%+ of requirements. They offer create/list/edit/delete + search but fail on key constraints:
  - Require cloud accounts/internet (violates "pure client-side, no backend ever").
  - Data leaves the device (violates localStorage-only + privacy).
  - Free tiers have limits/upsells/ads; paid plans start ~$5–15/mo (violates $0 budget under $100 forever).
- Customization limits: Impossible to disable sync/accounts or enforce pure localStorage without breaking the product. Export/import exists but remains vendor-locked.

### Cost Analysis
| Option | Licensing Costs | Engineering + Maintenance Costs | Total Lifetime Cost |
|--------|-----------------|----------------------------------|---------------------|
| Buy | $0–$180+/year after free-tier limits (storage caps, feature walls, ads). | N/A | $0–$180+/year |
| Build | $0 | Solo developer time (hobby project); zero maintenance (static files on free hosting; localStorage needs no upkeep). | $0 |

### Strategic Value
- Not a business differentiator (personal single-user tool).
- Build advantages: 100% data ownership, zero vendor lock-in, guaranteed offline-first, complete privacy (nothing leaves the browser).
- IP ownership: Full copyright of the tiny Vite + TypeScript codebase stays with the single owner; can modify, fork, or open-source freely with no restrictions.

**Overall Decision**: Build is the clear choice due to the $0 budget, local-first requirements, and privacy needs. No viable Buy options meet the constraints.

## 2. Technology Stack Selection

### Backend & Languages
- None. No backend, no server, no server-side language or runtime.
- Language: TypeScript only (entire codebase).

### Frontend Frameworks, Mobile Strategy
- Frontend: Vite + React + TypeScript SPA (lightweight, zero-cost, standard for two-pane UI). Custom minimal components + plain CSS (no external UI libraries).
- Mobile strategy: None. Strictly desktop-first two-pane layout only.

### Vendor Evaluation
- None required or performed.
- Zero runtime integrations, zero third-party services, zero vendor lock-in.
- All tools locked to the pre-approved free/open-source list (Vite, React, TypeScript, Figma, Vercel/Netlify).

**Overall Decision**: Stack is Vite + React + TypeScript for frontend SPA, with plain CSS and custom components. No backend, no mobile, no vendors. Aligns perfectly with the $0 budget, local-first, and desktop-only requirements.

## 3. Proof of Concept / Vertical Slice

### Key Risks to Validate
- Extremely low risk; validate in <1 afternoon:
  - localStorage limits & reliability: Create/reload 100+ small notes (far below practical quota, <50 KB total).
  - Vite + TypeScript build/deploy process: Run npm run build and push to Vercel/Netlify free tier once.
  - Two-pane layout + keyboard shortcuts: Simple CSS Grid/Flexbox + React state (desktop-first).
  - Performance of auto-save: Guaranteed instant (pure client-side).
  - Learning curve: Minimal for anyone comfortable with React + TS.

### Minimal Scope to Prove Viability
- A functional bare-bones CRUD prototype in Vite + React + TypeScript using only localStorage.
- Must deliver:
  - Empty state.
  - Create / list (sidebar) / open / edit (auto-save on every change) / delete (with confirmation).
  - Basic keyboard shortcuts (e.g., Cmd/Ctrl+N).
- Once this runs locally, persists across refresh, and deploys successfully → full MVP viability proven.

**Overall Decision**: POC scope is a minimal CRUD prototype to validate localStorage, build/deploy, and UI basics. Proves the stack and approach work before full MVP development.

## 4. Decision Log

| Decision Area | Decision | Rationale | Approver |
|---------------|----------|-----------|----------|
| Build vs. Buy | Build custom app | No SaaS meets 80%+ requirements (local-first, $0 budget, no cloud); Build offers 100% data ownership, privacy, and $0 lifetime cost. | Single owner/developer |
| Technology Stack | Vite + React + TypeScript SPA; no backend; desktop-only | Aligns with $0 budget, local-first, and requirements; lightweight for two-pane UI; no mobile or vendors needed. | Single owner/developer |
| POC Scope | Bare-bones CRUD prototype with localStorage | Validates key risks (localStorage, build/deploy, UI) in minimal time; proves MVP viability before full build. | Single owner/developer |