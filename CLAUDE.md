# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**localnotes** is a single-user, local-first notes app that runs entirely in the browser. No backend, no accounts, no cloud — notes are stored exclusively in `localStorage`. Stack: **Vite + React + TypeScript** SPA, plain CSS, custom components (no UI libraries).

## Commands

Once the app is scaffolded, the standard Vite + npm workflow applies:

```bash
npm run dev       # Start local dev server (Vite)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Run linter
npm test          # Run tests
```

To run a single test file (Vitest):
```bash
npx vitest run src/path/to/file.test.ts
```

Deploy by pushing `dist/` to Vercel or Netlify free tier (zero-config from Git).

## Architecture

### Core Constraints
- **No backend ever.** All persistence is `localStorage`. No network calls for note data.
- **Desktop-first.** Two-pane layout (sidebar list + editor). Mobile is out of scope.
- **No external UI libraries.** Plain CSS + custom components only.

### Data Model
```ts
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}
```

### UI Structure
- **App shell** — top-level layout, keyboard shortcut wiring
- **Notes list panel** — sidebar with all notes; sorted by `updatedAt` descending
- **Note editor panel** — title + content fields; auto-saves on every change (no save button)
- **Empty state view** — shown when no notes exist; prompts first note creation
- **Delete confirmation dialog** — required before any note is removed

### State & Persistence
- Lightweight client-side state for notes array and selected note ID
- All reads/writes go through a single storage utility that wraps `localStorage` with a defensive JSON parse fallback (recover-to-empty on corruption)

### Keyboard Shortcuts
- `Cmd/Ctrl+N` — new note (minimum; extend as needed)
- Focus flows: add → open → editor → delete should all be keyboard-reachable

## Testing Strategy
- **Unit tests**: note CRUD and state logic (pure functions)
- **Integration test**: create → edit → delete lifecycle
- **Accessibility**: keyboard navigation, label coverage, contrast

## Deferred (Out of Scope for MVP)
Search, tags/folders, export/import, Markdown editing, auth, cloud sync, AI features, mobile layout, attachments.
