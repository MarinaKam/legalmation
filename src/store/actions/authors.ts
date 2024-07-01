import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addAuthorApi,
  addBookToAuthorApi,
  deleteAuthorApi,
  deleteBookFromAuthorApi,
  fetchAuthorBooksApi,
  fetchAuthorsApi,
  updateAuthorApi,
} from '../../api/authorApi';
import { Author, Book } from '../../types';
import { ThunkAPI } from '../utils';

export const fetchAuthors: AsyncThunk<Author[], string, ThunkAPI> =
  createAsyncThunk<Author[], string>(
    'authors/fetchAuthors',
    async (searchTerm = '') => {
      return await fetchAuthorsApi(searchTerm);
    },
  );

export const addAuthor: AsyncThunk<
  Author,
  Omit<Author, 'id' | 'books'>,
  ThunkAPI
> = createAsyncThunk<Author, Omit<Author, 'id' | 'books'>>(
  'authors/addAuthor',
  async (author) => {
    return await addAuthorApi(author);
  },
);

export const updateAuthor: AsyncThunk<
  Author,
  { id: string; author: Partial<Author> },
  ThunkAPI
> = createAsyncThunk<Author, { id: string; author: Partial<Author> }>(
  'authors/updateAuthor',
  async ({ id, author }) => {
    return await updateAuthorApi(id, author);
  },
);

export const deleteAuthor: AsyncThunk<string, string, ThunkAPI> =
  createAsyncThunk<string, string>('authors/deleteAuthor', async (id) => {
    return await deleteAuthorApi(id);
  });

export const addBookToAuthor: AsyncThunk<
  { authorId: string; book: Book },
  { authorId: string; book: Omit<Book, 'id'> },
  ThunkAPI
> = createAsyncThunk<
  { authorId: string; book: Book },
  { authorId: string; book: Omit<Book, 'id'> }
>('authors/addBookToAuthor', async ({ authorId, book }) => {
  return await addBookToAuthorApi(authorId, book);
});

export const fetchAuthorBooks: AsyncThunk<Book[], string, ThunkAPI> =
  createAsyncThunk<Book[], string>(
    'authors/fetchAuthorBooks',
    async (authorId) => {
      return await fetchAuthorBooksApi(authorId);
    },
  );

export const deleteBookFromAuthor: AsyncThunk<
  { authorId: string; bookId: string },
  { authorId: string; bookId: string },
  ThunkAPI
> = createAsyncThunk<
  { authorId: string; bookId: string },
  { authorId: string; bookId: string }
>('authors/deleteBookFromAuthor', async ({ authorId, bookId }) => {
  await deleteBookFromAuthorApi(authorId, bookId);
  return { authorId, bookId };
});
