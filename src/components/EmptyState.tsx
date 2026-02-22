import '../styles/EmptyState.css';

interface Props {
  onNewNote: () => void;
}

export function EmptyState({ onNewNote }: Props) {
  return (
    <main className="empty-state">
      <div className="empty-state__card">
        <p className="empty-state__icon">📝</p>
        <h2 className="empty-state__heading">No note selected</h2>
        <p className="empty-state__sub">Create a new note to get started.</p>
        <button className="empty-state__btn" onClick={onNewNote}>
          New note
        </button>
      </div>
    </main>
  );
}
