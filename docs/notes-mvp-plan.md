# Notes Application MVP Plan (Vite + TypeScript)

Date: 2026-02-22

## 1) Product Goal
Ship a focused, single-user notes app MVP that is fast, simple, and reliable in the browser.

## 2) MVP Scope

### In Scope (Day 1)
- Create a note
- View list of notes
- Open and read a note
- Edit a note
- Delete a note (with confirmation)
- Persist notes locally in browser storage

### Out of Scope (Explicitly Deferred)
- User authentication
- Cloud sync and multi-device sync
- Collaboration/sharing
- Tags and folders
- Rich Markdown editing
- Attachments/images/files
- AI features
- Backend/API

## 3) Target User and Platform
- User: single-user (personal note-taking)
- Platform: web browser
- Persistence: local browser storage only

## 4) Core User Flows
1. Quick capture
   - User lands on app and can create a new note immediately.
2. Browse and open
   - User sees note list and opens a note with one click.
3. Edit and auto-save
   - User edits title/content and changes are saved instantly.
4. Delete safely
   - User deletes a note with a clear confirmation step.
5. Empty state onboarding
   - First-run screen explains how to create the first note.

## 5) Look and Feel
Direction: playful but minimal.

### UI Characteristics
- Clean two-pane layout: note list + editor pane
- Rounded components and light, friendly accents
- Clear typographic hierarchy for title vs body
- Generous spacing; low visual clutter

### UX Principles
- Fast first interaction
- Keyboard-friendly interactions
- Predictable behavior with minimal clicks
- No visual complexity beyond MVP needs

## 6) Differentiation (Without Over-Ambition)
Compete on execution quality, not feature count:

1. Instant capture and save
   - Prioritize perceived speed in create/edit flows.
2. Keyboard-first comfort
   - Strong shortcuts for add/open/focus/delete flows.
3. Private-by-default local-first positioning
   - Notes stay on device by default; no account required.

## 7) Technical Design (MVP)
- Stack: Vite + TypeScript
- Architecture: single-page app
- Persistence: localStorage
- State model: lightweight client-side state for notes and selected note

### Data Model (Initial)
- id: string
- title: string
- content: string
- createdAt: number
- updatedAt: number

## 8) High-Level UI Structure
- App shell
- Notes list panel
- Note editor panel
- Empty state view
- Delete confirmation dialog

## 9) Acceptance Criteria
- User can create, edit, and delete notes without page reload.
- Notes remain after browser refresh.
- Updated note appears correctly in list ordering/state.
- No data loss in normal create/edit/delete flow.
- Empty state appears when no notes exist.

## 10) Testing Strategy (MVP-appropriate)
- Unit tests: note CRUD/state logic
- Integration test: create -> edit -> delete lifecycle
- Basic accessibility checks: keyboard navigation, labels, contrast
- Build validation: lint, tests, production build

## 11) Risks and Mitigations
- Risk: localStorage limits/corruption edge cases
  - Mitigation: defensive parse fallback and recover-to-empty strategy
- Risk: accidental deletion
  - Mitigation: explicit confirmation dialog
- Risk: scope creep
  - Mitigation: strict in-scope/out-of-scope list in PR checklist

## 12) Phase 2 Backlog (Deferred)
- Search
- Tags/folders
- Export/import
- Auth + sync backend
- Rich editor enhancements

## 13) Implementation Sequence
1. Scaffold Vite + TypeScript app
2. Build notes state + local persistence
3. Build list/editor layout and CRUD flows
4. Add empty state and deletion confirmation
5. Add keyboard shortcuts and polish
6. Add tests and run quality checks
