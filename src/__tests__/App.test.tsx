import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

beforeEach(() => {
  localStorage.clear();
});

describe('App integration', () => {
  it('shows empty state on first load', () => {
    render(<App />);
    expect(screen.getByText(/no note selected/i)).toBeInTheDocument();
  });

  it('creates a note when New note button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    // Use the EmptyState "New note" button (exact text, not the sidebar "+" button)
    await user.click(screen.getByRole('button', { name: 'New note' }));
    expect(screen.getByLabelText(/note title/i)).toBeInTheDocument();
    expect(screen.queryByText(/no note selected/i)).not.toBeInTheDocument();
  });

  it('creates a note with Cmd+N shortcut', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.keyboard('{Meta>}n{/Meta}');
    expect(screen.getByLabelText(/note title/i)).toBeInTheDocument();
  });

  it('auto-saves title as user types', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'New note' }));
    const titleInput = screen.getByLabelText(/note title/i);
    await user.type(titleInput, 'My First Note');
    expect(titleInput).toHaveValue('My First Note');
    // Check the sidebar reflects the title
    expect(screen.getByText('My First Note')).toBeInTheDocument();
  });

  it('auto-saves content as user types', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'New note' }));
    const contentArea = screen.getByLabelText(/note content/i);
    await user.type(contentArea, 'Hello world');
    expect(contentArea).toHaveValue('Hello world');
  });

  it('shows delete confirmation dialog when delete is triggered', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'New note' }));
    await user.click(screen.getByRole('button', { name: 'Delete note' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/delete note\?/i)).toBeInTheDocument();
  });

  it('cancels delete when Cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'New note' }));
    await user.click(screen.getByRole('button', { name: 'Delete note' }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByLabelText(/note title/i)).toBeInTheDocument();
  });

  it('deletes note after confirmation and shows empty state', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'New note' }));
    await user.click(screen.getByRole('button', { name: 'Delete note' }));
    await user.click(screen.getByRole('button', { name: /^delete$/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(/no note selected/i)).toBeInTheDocument();
  });

  it('persists notes across re-mounts (simulates page refresh)', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.click(screen.getByRole('button', { name: 'New note' }));
    const titleInput = screen.getByLabelText(/note title/i);
    await user.type(titleInput, 'Persistent note');
    unmount();

    render(<App />);
    expect(screen.getByText('Persistent note')).toBeInTheDocument();
  });

  it('closes dialog with Escape key', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'New note' }));
    await user.click(screen.getByRole('button', { name: 'Delete note' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
