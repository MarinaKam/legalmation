import { describe, it, expect } from 'vitest';

import { Author } from '../../types';
import dialogSlice, { initialState, update, reset } from './dialogSlice';

describe('Dialog Slice', () => {
  it('should return the initial state when passed an empty action', () => {
    const action = { type: '' };
    const state = dialogSlice(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should update the state correctly when update action is dispatched', () => {
    const payload = {
      isOpen: true,
      isOpenPreview: true,
      book: { id: '1', name: 'New Book', description: '', publishedDate: '' }
    };
    const action = update(payload);
    const state = dialogSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isOpen: true,
      isOpenPreview: true,
      book: { id: '1', name: 'New Book', description: '', publishedDate: '' }
    });
  });

  it('should reset the state to initial state when reset action is dispatched', () => {
    const modifiedState = {
      isOpen: true,
      isOpenPreview: true,
      isOpenBook: true,
      book: { id: '1', name: 'Interesting Book', description: '', publishedDate: '' },
      author: { id: '1', name: 'John Doe' } as Author
    };
    const action = reset();
    const state = dialogSlice(modifiedState, action);
    expect(state).toEqual(initialState);
  });
});
