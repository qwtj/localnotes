import { useEffect, useRef, useState } from 'react';
import type { Note } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import '../styles/NoteEditor.css';

interface Props {
  note: Note;
  onUpdate: (id: string, fields: Partial<Pick<Note, 'title' | 'content'>>) => void;
  onDelete: (id: string) => void;
}

export function NoteEditor({ note, onUpdate, onDelete }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const prevModeRef = useRef<'edit' | 'preview' | null>(null);

  useEffect(() => {
    if (titleRef.current && note.title === '') {
      titleRef.current.focus();
    }
    setMode('edit');
    prevModeRef.current = null;
  }, [note.id, note.title]);

  useEffect(() => {
    if (prevModeRef.current === 'preview' && mode === 'edit') {
      contentRef.current?.focus();
    }
    prevModeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      if (e.key === 'p') {
        e.preventDefault();
        setMode('preview');
      } else if (e.key === 'e') {
        e.preventDefault();
        setMode('edit');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="note-editor">
      <div className="note-editor__toolbar">
        <div className="note-editor__mode-toggle">
          <button
            className={`note-editor__mode-btn${mode === 'edit' ? ' note-editor__mode-btn--active' : ''}`}
            aria-pressed={mode === 'edit'}
            onClick={() => setMode('edit')}
          >
            Edit
          </button>
          <button
            className={`note-editor__mode-btn${mode === 'preview' ? ' note-editor__mode-btn--active' : ''}`}
            aria-pressed={mode === 'preview'}
            onClick={() => setMode('preview')}
          >
            Preview
          </button>
        </div>
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            contentRef.current?.focus();
          }
        }}
      />
      {mode === 'edit' ? (
        <textarea
          ref={contentRef}
          className="note-editor__content"
          placeholder="Start writing…"
          aria-label="Note content"
          value={note.content}
          onChange={(e) => onUpdate(note.id, { content: e.target.value })}
        />
      ) : (
        <div className="note-editor__preview">
          <MarkdownRenderer content={note.content} />
        </div>
      )}
    </main>
  );
}
