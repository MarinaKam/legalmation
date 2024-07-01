import '@testing-library/jest-dom';
import { Server } from 'miragejs/server';
import { Author, Book } from '../types/index.ts';
import { makeServer } from './server';

let server: Server;

beforeEach(() => {
  server = makeServer();
  server.db.emptyData();
});

afterEach(() => {
  server.shutdown();
});

test('creating and getting authors', async () => {
  server.create('author', { name: 'Test Author' } as Author);
  const response = await fetch('/api/authors');
  const data = await response.json();
  expect(data.authors[0].name).toBe('Test Author');
});

test('creating and getting books', async () => {
  const author = server.create('author', { name: 'Test Author' } as Author);
  server.create('book', { name: 'Test Book 1', authorId: author.id } as Book);
  server.create('book', { name: 'Test Book 2', authorId: author.id } as Book);

  const response = await fetch(`/api/authors/${author.id}/books`);
  const data = await response.json();
  expect(data.length).toBe(2);
  expect(data[0].name).toBe('Test Book 1');
  expect(data[1].name).toBe('Test Book 2');
});

test('creating and deleting an author', async () => {
  const author = server.create('author', { name: 'Test Author' } as Author );

  let response = await fetch('/api/authors');
  let data = await response.json();
  expect(data.authors.length).toBe(1);

  await fetch(`/api/authors/${author.id}`, { method: 'DELETE' });

  response = await fetch('/api/authors');
  data = await response.json();
  expect(data.authors.length).toBe(0);
});

test('creating and deleting an book', async () => {
  const author = server.create('author', { name: 'Test Author' } as Author);
  const book = server.create('book', { name: 'Test Book', authorId: author.id } as Book);

  let response = await fetch(`/api/authors/${author.id}/books`);
  let data = await response.json();
  expect(data.length).toBe(1);

  await fetch(`/api/authors/${author.id}/books/${book.id}`, { method: 'DELETE' });

  response = await fetch(`/api/authors/${author.id}/books`);
  data = await response.json();
  expect(data.length).toBe(0);
});
