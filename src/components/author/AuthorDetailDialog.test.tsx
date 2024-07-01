import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { useAppDispatch } from '../../store/utils';
import { render } from '../../utils/test-utils';
import { AuthorDetailDialog } from './AuthorDetailDialog';

vi.mock('../../store/utils', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(() => ({ authorBooks: [], isBookLoading: false })),
}));

describe('AuthorDetailDialog', () => {
  const handleClose = vi.fn();
  const mockDispatch = vi.fn();

  const author = {
    id: '1',
    name: 'John Doe',
    description: 'Sample author description',
    image: 'path/to/image.jpg',
    books: [{ id: 'book1', name: 'Book One', publishedDate: '' }]
  };

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    // store.dispatch = mockDispatch as unknown as ThunkDispatch<RootState, undefined, Action>;
    vi.clearAllMocks();
  });

  const setup = (open: boolean) => render(
    <AuthorDetailDialog open={open} selectedAuthor={author} onClose={handleClose} />
  );

  it('should render dialog when open is true', () => {
    setup(true);
    expect(screen.getByTestId('author-detail-dialog')).toBeVisible();
  });

  it('should not render dialog when open is false', () => {
    setup(false);
    expect(screen.queryByTestId('author-detail-dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    setup(true);

    const closeButton = screen.getByLabelText('close-author-detail-dialog');
    fireEvent.click(closeButton);

    await waitFor(() => expect(handleClose).toHaveBeenCalled());
  });

  it('should dispatch fetchAuthorBooks when the dialog is opened with an author', async () => {
    setup(true);

    expect(mockDispatch).toBeCalled();
  });
});
