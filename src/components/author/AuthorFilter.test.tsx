import { fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as actions from '../../store/actions';
import { render } from '../../utils/test-utils';
import { AuthorFilter } from './AuthorFilter';

vi.spyOn(actions, 'fetchAuthors');

describe('AuthorFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = (options = {}) => render(<AuthorFilter />, { ...options });

  it('renders correctly', () => {
    setup();
    expect(screen.getByLabelText(/search by author name/i)).toBeInTheDocument();
  });

  it('dispatches fetchAuthors action with correct parameter on input change', () => {
    setup();
    const input = screen.getByLabelText(/search by author name/i);

    fireEvent.change(input, { target: { value: 'John' } });
    expect(actions.fetchAuthors).toHaveBeenCalledWith('John');
  });

  it('updates searchTerm state on input change', () => {
    setup();
    const input = screen.getByLabelText(/search by author name/i);

    fireEvent.change(input, { target: { value: 'Jane' } });
    expect(input).toHaveValue('Jane');
  });
});
