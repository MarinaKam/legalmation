import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { render } from '../../utils/test-utils';
import { AuthorDetailDialog } from './AuthorDetailDialog';
import * as actions from '../../store/actions';

vi.spyOn(actions, 'fetchAuthorBooks');

describe('AuthorDetailDialog', () => {
  const handleClose = vi.fn();

  const author = {
    id: '1',
    name: 'John Doe',
    description: 'Sample author description',
    image: 'path/to/image.jpg',
    books: [{ id: 'book1', name: 'Book One', publishedDate: '' }]
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = (open: boolean, options = {}) => render(
    <AuthorDetailDialog open={open} selectedAuthor={author} onClose={handleClose} />,
    options
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

  it('should call fetchAuthorBooks when the dialog is opened with an author', async () => {
    setup(true);

    expect(actions.fetchAuthorBooks).toHaveBeenCalledWith(author.id);
  });
});
