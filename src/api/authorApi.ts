import { Author, Book } from '../types';
import { api } from './';

const API_URL = '/authors';

export const fetchAuthorsApi = async (searchTerm = '') => {
  let url = API_URL;

  if (searchTerm) {
    url += `?name=${searchTerm}`;
  }

  const response = await api.get(url);
  return response.data?.authors || [];
};

export const addAuthorApi = async (author: Omit<Author, 'id' | 'books'>) => {
  const response = await api.post(API_URL, author);
  return response.data?.author;
};

export const updateAuthorApi = async (id: string, author: Partial<Author>) => {
  const response = await api.put(`${API_URL}/${id}`, author);
  return response.data?.author;
};

export const deleteAuthorApi = async (id: string) => {
  await api.delete(`${API_URL}/${id}`);
  return id;
};

export const addBookToAuthorApi = async (
  authorId: string,
  book: Omit<Book, 'id'>,
) => {
  const response = await api.post(`/authors/${authorId}/books`, book);

  return { authorId, book: response.data?.book };
};

export const fetchAuthorBooksApi = async (authorId: string) => {
  const response = await api.get(`/authors/${authorId}/books`);
  return response.data || [];
};

export const deleteBookFromAuthorApi = async (
  authorId: string,
  bookId: string,
) => {
  await api.delete(`/authors/${authorId}/books/${bookId}`);
  return { authorId, bookId };
};
