import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Author, Book } from '../../types';
import {
  addAuthor,
  addBookToAuthor,
  deleteAuthor,
  deleteBookFromAuthor,
  fetchAuthorBooks,
  fetchAuthors,
  updateAuthor,
} from '../actions';

interface AuthorState {
  authors: Author[];
  authorBooks: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isLoading: boolean;
  isBookLoading: boolean;
}

export const initialState: AuthorState = {
  authors: [],
  authorBooks: [],
  status: 'idle',
  isLoading: false,
  isBookLoading: false,
};

const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    testAddReducer: (state, action) => {
      state.authors.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(
        fetchAuthors.fulfilled,
        (state, action: PayloadAction<Author[]>) => {
          state.status = 'succeeded';
          state.authors = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchAuthors.rejected, (state) => {
        state.status = 'failed';
        state.isLoading = false;
      })
      .addCase(addAuthor.fulfilled, (state, action: PayloadAction<Author>) => {
        state.authors.push(action.payload);
      })
      .addCase(addAuthor.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        updateAuthor.fulfilled,
        (state, action: PayloadAction<Author>) => {
          const index = state.authors.findIndex(
            (item) => item.id === action.payload.id,
          );

          if (index !== -1) {
            state.authors[index] = action.payload;

            if (action.payload.bookIds) {
              state.authors[index].books = action.payload.bookIds;
            } else {
              state.authors[index].books = [];
            }
          }
        },
      )
      .addCase(updateAuthor.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        deleteAuthor.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.authors = state.authors.filter(
            (item) => item.id !== action.payload,
          );
        },
      )
      .addCase(deleteAuthor.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        addBookToAuthor.fulfilled,
        (state, action: PayloadAction<{ authorId: string; book: Book }>) => {
          const authorIndex = state.authors.findIndex(
            (author) => author.id === action.payload.authorId,
          );
          if (authorIndex !== -1) {
            state.authors[authorIndex] = {
              ...state.authors[authorIndex],
              books: [
                ...(state.authors[authorIndex].books || []),
                action.payload.book,
              ],
              bookIds: [
                ...(state.authors[authorIndex].bookIds || []),
                action.payload.book.id,
              ],
            };
          }
        },
      )
      .addCase(fetchAuthorBooks.pending, (state) => {
        state.status = 'loading';
        state.isBookLoading = true;
      })
      .addCase(
        fetchAuthorBooks.fulfilled,
        (state, action: PayloadAction<Book[]>) => {
          state.status = 'succeeded';
          state.authorBooks = action.payload;
          state.isBookLoading = false;
        },
      )
      .addCase(fetchAuthorBooks.rejected, (state) => {
        state.status = 'failed';
        state.isBookLoading = false;
      })
      .addCase(
        deleteBookFromAuthor.fulfilled,
        (
          state,
          action: PayloadAction<{ authorId: string; bookId: string }>,
        ) => {
          const authorId = action.payload.authorId;
          const bookId = action.payload.bookId;
          const authorIndex = state.authors.findIndex(
            (author) => author.id === authorId,
          );
          if (authorIndex !== -1) {
            state.authors[authorIndex].books = state.authors[
              authorIndex
            ].books.filter((book) => ((book as Book)?.id || book) !== bookId);
          }
        },
      );
  },
});

export const { testAddReducer } = authorSlice.actions;
export default authorSlice.reducer;
export type { AuthorState };
