import type { Note } from '../types';
import { NoteListItem } from './NoteListItem';
import '../styles/NoteList.css';

interface Props {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNewNote: () => void;
}

export function NoteList({ notes, selectedId, onSelect, onDelete, onNewNote }: Props) {
  return (
    <aside className="note-list">
      <div className="note-list__header">
        <h1 className="note-list__app-name">localnotes</h1>
        <button
          className="note-list__new-btn"
          onClick={onNewNote}
          aria-label="New note (Cmd+N)"
          title="New note (Cmd+N)"
        >
          +
        </button>
      </div>
      {notes.length === 0 ? (
        <p className="note-list__empty">No notes yet.</p>
      ) : (
        <ul className="note-list__list" role="listbox" aria-label="Notes">
          {notes.map((note) => (
            <NoteListItem
              key={note.id}
              note={note}
              isSelected={note.id === selectedId}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </aside>
  );
}
