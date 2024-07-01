import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { screen, waitFor, fireEvent } from '@testing-library/react';

import { Dashboard } from '../dashboard';
import { makeServer } from '../mirage/server';
import { render } from '../utils/test-utils';

makeServer();

test('displays the list of authors', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Dashboard />
    </MemoryRouter>,
  );

  const dashboardElement = screen.getByText(/Authors List/i);
  expect(dashboardElement).toBeInTheDocument();

  const list = screen.getByTestId('author-list');
  expect(list).toBeInTheDocument();

  expect(screen.queryByTestId('loader')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByTestId('loader')).toBeNull();
    const authorElement = screen.getByTestId('author-item');

    expect(authorElement).toBeInTheDocument();
    expect(authorElement).toHaveTextContent('John Doe');
  });
});

test('opens and closes AuthorDialog when Add Author button is clicked', async () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>,
  );

  const addButton = screen.getByText('Add Author');
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  const createDialog = screen.queryByTestId('author-form')!;
  expect(createDialog).toBeInTheDocument();

  const dialogTitle = screen.getByText('Add a New Author');
  expect(dialogTitle).toBeInTheDocument();

  const closeButton = screen.getByLabelText('close');
  fireEvent.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByText('Add a New Author')).not.toBeInTheDocument();
  });
});

test('opens and closes BookDialog when Add Book button is clicked', async () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>,
  );

  await waitFor(() => {
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  const menuButton = screen.getByLabelText('actions');

  fireEvent.click(menuButton);

  const menuList = screen.queryByTestId('author-menu-list')!;
  expect(menuList).toBeInTheDocument();

  screen.debug(menuList);

  const previewButton = screen.queryByTestId('author-preview-btn')!;
  fireEvent.click(previewButton);

  const previewDialog = screen.queryByTestId('author-detail-dialog')!;
  expect(previewDialog).toBeInTheDocument();

  const addBookButton = screen.getByLabelText('add-book-btn');
  fireEvent.click(addBookButton);

  const bookDialog = screen.queryByTestId('book-dialog')!;
  expect(bookDialog).toBeInTheDocument();

  const closeButton = screen.getByLabelText('close-book-dialog');
  fireEvent.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByTestId('book-dialog')).not.toBeInTheDocument();
  });

  const closeAuthorDialogButton = screen.getByLabelText(
    'close-author-detail-dialog',
  );
  fireEvent.click(closeAuthorDialogButton);

  await waitFor(() => {
    expect(
      screen.queryByTestId('author-detail-dialog'),
    ).not.toBeInTheDocument();
  });
});
