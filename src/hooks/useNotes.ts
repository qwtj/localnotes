import { useState, useCallback } from 'react';
import type { Note } from '../types';
import { loadNotes, saveNotes } from '../storage';

function sortByUpdated(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => sortByUpdated(loadNotes()));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const persist = useCallback((updated: Note[]) => {
    const sorted = sortByUpdated(updated);
    setNotes(sorted);
    saveNotes(sorted);
  }, []);

  const createNote = useCallback(() => {
    const now = Date.now();
    const note: Note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    const updated = [note, ...notes];
    persist(updated);
    setSelectedId(note.id);
    return note;
  }, [notes, persist]);

  const updateNote = useCallback(
    (id: string, fields: Partial<Pick<Note, 'title' | 'content'>>) => {
      const updated = notes.map((n) =>
        n.id === id ? { ...n, ...fields, updatedAt: Date.now() } : n
      );
      persist(updated);
    },
    [notes, persist]
  );

  const deleteNote = useCallback(
    (id: string) => {
      const updated = notes.filter((n) => n.id !== id);
      persist(updated);
      if (selectedId === id) {
        setSelectedId(updated.length > 0 ? updated[0].id : null);
      }
    },
    [notes, selectedId, persist]
  );

  const selectNote = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;

  return {
    notes,
    selectedId,
    selectedNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
  };
}
