import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';

import * as authorApi from '../../api/authorApi';
import { addAuthor, addBookToAuthor, deleteAuthor, deleteBookFromAuthor, fetchAuthors, updateAuthor } from '../actions';
import { RootState, store } from '..';
import authorSlice, { AuthorState, initialState, testAddReducer } from './authorSlice';

describe('Author Slice Extra Reducers', () => {
  beforeEach(() => {
    store.dispatch = vi.fn() as unknown as ThunkDispatch<RootState, undefined, Action>;
    vi.mock('../api/authorApi', () => ({
      fetchAuthorsApi: vi.fn(() => Promise.resolve([{ id: '1', name: 'John Doe', description: 'Test', image: '', books: [], bookIds: [] }])),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("initialize slice with initialValue", () => {
    const listSliceInit = authorSlice(initialState, { type: "unknown" });
    expect(listSliceInit).toBe(initialState);
  });

  test("testAddReducer", () => {
    const testData = {
      id: `${new Date().getSeconds()}`,
      description: "This is for the test section",
      name: 'Some Name',
    };

    const afterReducerOperation = authorSlice(
      initialState,
      testAddReducer(testData)
    );

    expect(afterReducerOperation).toStrictEqual({
      ...initialState,
      authors: [testData],
    });
  });

  it('should dispatch actions correctly', async () => {
    const action = { type: 'TEST_ACTION' };
    store.dispatch(action);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should handle fetchAuthors.pending', () => {
    const action = { type: fetchAuthors.pending.type };
    const state = authorSlice(initialState, action);
    expect(state.isLoading).toBeTruthy();
    expect(state.status).toBe('loading');
  });

  it('should handle fetchAuthors.fulfilled', () => {
    const action = {
      type: fetchAuthors.fulfilled.type,
      payload: [{ id: '1', name: 'John Doe', description: 'Test' }]
    };
    const state = authorSlice(initialState, action);

    expect(state.isLoading).toBeFalsy();
    expect(state.authors).toHaveLength(1);
    expect(state.status).toBe('succeeded');
  });

  it('should handle fetchAuthors.rejected', () => {
    const action = { type: fetchAuthors.rejected.type };
    const state = authorSlice(initialState, action);
    expect(state.isLoading).toBeFalsy();
    expect(state.status).toBe('failed');
  });

  it('fetchAuthors dispatches fulfilled when fetch is successful', async () => {
    const mockAuthors = [{ id: '1', name: 'John Doe', description: 'Test' }];
    vi.spyOn(authorApi, 'fetchAuthorsApi').mockResolvedValue(mockAuthors);
    const dispatch = vi.fn();
    const getState = vi.fn();

    await fetchAuthors('')(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchAuthors.pending.type
    }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchAuthors.fulfilled.type,
      payload: mockAuthors
    }));
  });

  it('should handle addAuthor.fulfilled', () => {
    const newAuthor = { id: '2', name: 'Jane Doe', description: 'Test' };
    const action = { type: addAuthor.fulfilled.type, payload: newAuthor };
    const state = authorSlice(initialState, action);
    expect(state.authors).toContainEqual(newAuthor);
    expect(state.status).toBe('idle');
  });

  it('should handle updateAuthor.fulfilled', () => {
    const updatedAuthor = { id: '1', name: 'John Updated', description: 'Updated Test' };
    const action = { type: updateAuthor.fulfilled.type, payload: updatedAuthor };
    const initialStateWithAuthors = {
      ...initialState,
      authors: [{ id: '1', name: 'John Doe', description: 'Test' }]
    } as AuthorState;
    const state = authorSlice(initialStateWithAuthors, action);
    expect(state.authors[0]).toEqual(updatedAuthor);
  });

  it('should handle deleteAuthor.fulfilled', () => {
    const action = { type: deleteAuthor.fulfilled.type, payload: '1' };
    const initialStateWithAuthors = {
      ...initialState,
      authors: [{ id: '1', name: 'John Doe', description: 'Test' }]
    } as AuthorState;
    const state = authorSlice(initialStateWithAuthors, action);
    expect(state.authors).toEqual([]);
  });

  it('should handle addBookToAuthor.fulfilled', () => {
    const newBook = { id: '101', name: 'New Book' };
    const action = { type: addBookToAuthor.fulfilled.type, payload: { authorId: '1', book: newBook } };
    const initialStateWithAuthors = {
      ...initialState,
      authors: [{ id: '1', name: 'John Doe', description: 'Test', books: [], bookIds: [], image: '' }]
    };
    const state = authorSlice(initialStateWithAuthors, action);
    expect(state.authors[0].books).toContainEqual(newBook);
  });

  it('should handle deleteBookFromAuthor.fulfilled', () => {
    const action = { type: deleteBookFromAuthor.fulfilled.type, payload: { authorId: '1', bookId: '101' } };
    const initialStateWithAuthors = {
      ...initialState,
      authors: [{ id: '1', name: 'John Doe', description: 'Test', books: [{ id: '101', name: 'New Book' }], bookIds: ['101'], image: '' }]
    } as AuthorState;
    const state = authorSlice(initialStateWithAuthors, action);
    expect(state.authors[0].books).toEqual([]);
  });
});
