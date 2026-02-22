import { useState, useEffect, useCallback } from 'react';
import { useNotes } from './hooks/useNotes';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';
import { EmptyState } from './components/EmptyState';
import { DeleteDialog } from './components/DeleteDialog';
import './styles/App.css';

export function App() {
  const { notes, selectedId, selectedNote, createNote, updateNote, deleteNote, selectNote } =
    useNotes();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleDeleteRequest = useCallback((id: string) => {
    setPendingDeleteId(id);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (pendingDeleteId) {
      deleteNote(pendingDeleteId);
      setPendingDeleteId(null);
    }
  }, [pendingDeleteId, deleteNote]);

  const handleDeleteCancel = useCallback(() => {
    setPendingDeleteId(null);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        createNote();
      }
      if (e.key === 'Escape' && pendingDeleteId) {
        setPendingDeleteId(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [createNote, pendingDeleteId]);

  const pendingNote = pendingDeleteId ? notes.find((n) => n.id === pendingDeleteId) : null;

  return (
    <div className="app">
      <NoteList
        notes={notes}
        selectedId={selectedId}
        onSelect={selectNote}
        onDelete={handleDeleteRequest}
        onNewNote={createNote}
      />
      {selectedNote ? (
        <NoteEditor
          note={selectedNote}
          onUpdate={updateNote}
          onDelete={handleDeleteRequest}
        />
      ) : (
        <EmptyState onNewNote={createNote} />
      )}
      {pendingDeleteId && pendingNote && (
        <DeleteDialog
          noteTitle={pendingNote.title}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}
