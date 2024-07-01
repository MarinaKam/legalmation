import { render, screen, fireEvent } from '@testing-library/react';
import { AuthorCardMenu } from './AuthorCardMenu';

describe('AuthorCardMenu', () => {
  it('triggers the appropriate callbacks when menu items are clicked', () => {
    const handleOpenPreview = vi.fn();
    const handleUpdate = vi.fn();
    const handleDelete = vi.fn();

    render(
      <AuthorCardMenu
        onOpenPreview={handleOpenPreview}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    );

    const previewButton = screen.getByTestId('author-preview-btn');
    fireEvent.click(previewButton);
    expect(handleOpenPreview).toHaveBeenCalled();

    const updateButton = screen.getByText('Edit');
    fireEvent.click(updateButton);
    expect(handleUpdate).toHaveBeenCalled();

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
  });
});
