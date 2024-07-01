import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';

import * as authorApi from '../../api/authorApi';
import { Author } from '../../types';
import { RootState, store } from '../';
import { fetchAuthors, addAuthor, updateAuthor, deleteAuthor } from './authors';

vi.mock('../api/authorApi');

describe('fetchAuthors thunk', () => {
  beforeEach(() => {
    store.dispatch = vi.fn() as unknown as ThunkDispatch<RootState, undefined, Action>;
    vi.restoreAllMocks();
  });

  it('dispatches fetchAuthors.pending and fetchAuthors.fulfilled on successful fetch', async () => {
    const authors: Author[] = [{ id: '1', name: 'John Doe', description: 'Test', image: '', books: [] }];
    vi.spyOn(authorApi, 'fetchAuthorsApi').mockResolvedValue(authors);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await fetchAuthors('')(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchAuthors.pending.type
    }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchAuthors.fulfilled.type,
      payload: authors
    }));
  });

  it('dispatches fetchAuthors.pending and fetchAuthors.rejected on API failure', async () => {
    const error = new Error('Network Error');
    vi.spyOn(authorApi, 'fetchAuthorsApi').mockRejectedValue(error);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await fetchAuthors('')(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchAuthors.pending.type
    }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchAuthors.rejected.type,
      error: expect.anything()
    }));
  });
});

describe('addAuthor thunk', () => {
  beforeEach(() => {
    store.dispatch = vi.fn() as unknown as ThunkDispatch<RootState, undefined, Action>;
    vi.restoreAllMocks();
  });

  it('dispatches addAuthor.pending and addAuthor.fulfilled on successful API call', async () => {
    const newAuthor = { name: 'Jane Doe', description: 'Test', image: '' };
    const returnedAuthor = { ...newAuthor, id: '2', books: [] };
    vi.spyOn(authorApi, 'addAuthorApi').mockResolvedValue(returnedAuthor);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await addAuthor(newAuthor)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: addAuthor.pending.type
    }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: addAuthor.fulfilled.type,
      payload: returnedAuthor
    }));
  });

  it('dispatches addAuthor.pending and addAuthor.rejected on API failure', async () => {
    const newAuthor = { name: 'Jane Doe', description: 'Test', image: '' };
    const error = new Error('API Error');
    vi.spyOn(authorApi, 'addAuthorApi').mockRejectedValue(error);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await addAuthor(newAuthor)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: addAuthor.pending.type
    }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: addAuthor.rejected.type,
      error: expect.anything()
    }));
  });
});

describe('updateAuthor thunk', () => {
  beforeEach(() => {
    store.dispatch = vi.fn() as unknown as ThunkDispatch<RootState, undefined, Action>;
    vi.restoreAllMocks();
  });

  it('dispatches updateAuthor.pending and updateAuthor.fulfilled on successful API call', async () => {
    const authorUpdate = { name: 'Updated John Doe' };
    const updatedAuthor = { id: '1', name: 'Updated John Doe', description: 'Updated Test', books: [] };
    vi.spyOn(authorApi, 'updateAuthorApi').mockResolvedValue(updatedAuthor);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await updateAuthor({ id: '1', author: authorUpdate })(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: updateAuthor.pending.type
    }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: updateAuthor.fulfilled.type,
      payload: updatedAuthor
    }));
  });

  it('dispatches updateAuthor.pending and updateAuthor.rejected on API failure', async () => {
    const authorUpdate = { name: 'Updated John Doe' };
    const error = new Error('API Error');
    vi.spyOn(authorApi, 'updateAuthorApi').mockRejectedValue(error);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await updateAuthor({ id: '1', author: authorUpdate })(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: updateAuthor.pending.type
    }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: updateAuthor.rejected.type,
      error: expect.anything()
    }));
  });
});

describe('deleteAuthor thunk', () => {
  beforeEach(() => {
    store.dispatch = vi.fn() as unknown as ThunkDispatch<RootState, undefined, Action>;
    vi.restoreAllMocks();
  });

  it('dispatches deleteAuthor.pending and deleteAuthor.fulfilled on successful API call', async () => {
    const authorId = '1';
    vi.spyOn(authorApi, 'deleteAuthorApi').mockResolvedValue(authorId);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await deleteAuthor(authorId)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: deleteAuthor.pending.type
    }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: deleteAuthor.fulfilled.type,
      payload: authorId
    }));
  });

  it('dispatches deleteAuthor.pending and deleteAuthor.rejected on API failure', async () => {
    const authorId = '1';
    const error = new Error('API Error');
    vi.spyOn(authorApi, 'deleteAuthorApi').mockRejectedValue(error);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await deleteAuthor(authorId)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: deleteAuthor.pending.type
    }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: deleteAuthor.rejected.type,
      error: expect.anything()
    }));
  });
});
