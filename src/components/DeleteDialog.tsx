import { useEffect, useRef } from 'react';
import '../styles/DeleteDialog.css';

interface Props {
  noteTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({ noteTitle, onConfirm, onCancel }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCancel]);

  return (
    <div
      className="delete-dialog__overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="delete-dialog__box">
        <h2 id="delete-dialog-title" className="delete-dialog__title">
          Delete note?
        </h2>
        <p className="delete-dialog__body">
          &ldquo;{noteTitle || 'Untitled'}&rdquo; will be permanently deleted.
        </p>
        <div className="delete-dialog__actions">
          <button ref={cancelRef} className="delete-dialog__cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-dialog__confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
