import type { Note } from '../types';
import '../styles/NoteList.css';

interface Props {
  note: Note;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function NoteListItem({ note, isSelected, onSelect, onDelete }: Props) {
  const title = note.title.trim() || 'Untitled';
  const preview = note.content.slice(0, 80).replace(/\n/g, ' ');

  return (
    <li
      className={`note-list-item${isSelected ? ' note-list-item--selected' : ''}`}
      onClick={() => onSelect(note.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(note.id);
        }
      }}
      tabIndex={0}
      role="option"
      aria-selected={isSelected}
    >
      <div className="note-list-item__body">
        <span className="note-list-item__title">{title}</span>
        {preview && <span className="note-list-item__preview">{preview}</span>}
        <span className="note-list-item__date">{formatDate(note.updatedAt)}</span>
      </div>
      <button
        className="note-list-item__delete"
        aria-label={`Delete note: ${title}`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
        tabIndex={isSelected ? 0 : -1}
      >
        ×
      </button>
    </li>
  );
}
