import { Book } from './book';

export interface Author {
  id: string;
  name: string;
  image: string;
  description?: string;
  books: (Book | string)[];
  bookIds?: string[];
}
