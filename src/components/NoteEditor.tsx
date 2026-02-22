import { useEffect, useRef } from 'react';
import type { Note } from '../types';
import '../styles/NoteEditor.css';

interface Props {
  note: Note;
  onUpdate: (id: string, fields: Partial<Pick<Note, 'title' | 'content'>>) => void;
  onDelete: (id: string) => void;
}

export function NoteEditor({ note, onUpdate, onDelete }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleRef.current && note.title === '') {
      titleRef.current.focus();
    }
  }, [note.id, note.title]);

  return (
    <main className="note-editor">
      <div className="note-editor__toolbar">
        <button
          className="note-editor__delete-btn"
          aria-label="Delete note"
          onClick={() => onDelete(note.id)}
        >
          Delete note
        </button>
      </div>
      <input
        ref={titleRef}
        className="note-editor__title"
        type="text"
        placeholder="Note title"
        aria-label="Note title"
        value={note.title}
        onChange={(e) => onUpdate(note.id, { title: e.target.value })}
      />
      <textarea
        className="note-editor__content"
        placeholder="Start writing…"
        aria-label="Note content"
        value={note.content}
        onChange={(e) => onUpdate(note.id, { content: e.target.value })}
      />
    </main>
  );
}
