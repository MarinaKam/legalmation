import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { RootState, store } from '../../store/index.ts';
import { dialogSlice } from '../../store/slices/dialogSlice';
import type { Author } from '../../types/index.ts';
import { render } from '../../utils/test-utils.tsx';

import { AuthorCard } from './AuthorCard';

describe('AuthorCard', () => {
  const author = {
    id: '1',
    name: 'John Doe',
    description: 'Test Author',
    image: 'path/to/image.jpg',
    books: [{ id: 'book1', name: 'Book One' }]
  } as Author;

  const setup = () => render(<AuthorCard author={author} />);

  it('displays author information correctly', () => {
    setup();

    expect(screen.getByTestId('author-item')).toHaveTextContent(author.name);
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
    expect(screen.getByText(/Books: 1/)).toBeInTheDocument();
  });

  it('opens and closes the popover when clicking the action button', async () => {
    setup();

    const actionButton = screen.getByLabelText('actions');
    fireEvent.click(actionButton);

    expect(screen.getByRole('presentation')).toBeInTheDocument();

    const previewBtn = screen.getByTestId('author-preview-btn')!;
    // Simulate closing the popover
    fireEvent.click(previewBtn);

    // Wait for the animation or asynchronous processes
    await waitFor(() => {
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });
  });

  it('dispatches update action when update is triggered', () => {
    store.dispatch = vi.fn() as unknown as ThunkDispatch<RootState, undefined, Action>;

    setup();

    const actionButton = screen.getByLabelText('actions');
    fireEvent.click(actionButton);

    const updateButton = screen.getByText('Edit');
    fireEvent.click(updateButton);

    expect(store.dispatch).toHaveBeenCalledWith(dialogSlice.actions.update({
      isOpen: true,
      author
    }));
  });

  // Similar tests for delete and open preview
});
