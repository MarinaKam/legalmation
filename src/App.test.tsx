import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { render } from './utils/test-utils.tsx';
import App from './App';

test('renders dashboard page by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const dashboardElement = screen.getByText(/Authors List/i);

  expect(dashboardElement).toBeInTheDocument();
});

test('renders no match page for wrong route', () => {
  render(
    <MemoryRouter initialEntries={['/wrong-route']}>
      <App />
    </MemoryRouter>,
  );

  screen.debug();
  const noMatchElement = screen.getByText(/Not Found/i);

  expect(noMatchElement).toBeInTheDocument();
});
