import { describe, it, expect, beforeEach } from 'vitest';
import { loadNotes, saveNotes } from '../storage';
import type { Note } from '../types';

const STORAGE_KEY = 'localnotes';

const makeNote = (overrides: Partial<Note> = {}): Note => ({
  id: '1',
  title: 'Test note',
  content: 'Content',
  createdAt: 1000,
  updatedAt: 2000,
  ...overrides,
});

beforeEach(() => {
  localStorage.clear();
});

describe('loadNotes', () => {
  it('returns empty array when storage is empty', () => {
    expect(loadNotes()).toEqual([]);
  });

  it('returns empty array when storage value is null', () => {
    localStorage.removeItem(STORAGE_KEY);
    expect(loadNotes()).toEqual([]);
  });

  it('returns empty array on corrupt JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json}}}');
    expect(loadNotes()).toEqual([]);
  });

  it('returns empty array when stored value is not an array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ notes: [] }));
    expect(loadNotes()).toEqual([]);
  });

  it('returns stored notes array', () => {
    const notes = [makeNote()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    expect(loadNotes()).toEqual(notes);
  });
});

describe('saveNotes', () => {
  it('persists notes to localStorage', () => {
    const notes = [makeNote({ id: 'a' }), makeNote({ id: 'b' })];
    saveNotes(notes);
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(JSON.parse(raw!)).toEqual(notes);
  });

  it('round-trips: save then load returns same notes', () => {
    const notes = [makeNote({ title: 'Round trip', content: 'Test' })];
    saveNotes(notes);
    expect(loadNotes()).toEqual(notes);
  });

  it('overwrites previous value', () => {
    saveNotes([makeNote({ id: 'old' })]);
    const fresh = [makeNote({ id: 'new' })];
    saveNotes(fresh);
    expect(loadNotes()).toEqual(fresh);
  });
});
