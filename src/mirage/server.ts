import {
  belongsTo,
  createServer,
  Factory,
  hasMany,
  Model,
  RestSerializer,
} from 'miragejs';
import { AnyFactories, ModelDefinition, Registry } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';
import { Author } from '../types/author';
import { Book } from '../types/book';

const AuthorModel: ModelDefinition<Author> = Model.extend({
  books: hasMany(),
});

const BookModel: ModelDefinition<Book> = Model.extend({
  author: belongsTo(),
});

type AppRegistry = Registry<
  {
    author: typeof AuthorModel;
    book: typeof BookModel;
  },
  AnyFactories
>;

export function makeServer() {
  return createServer({
    serializers: {
      application: RestSerializer,
    },
    models: {
      author: AuthorModel,
      book: BookModel,
    },
    factories: {
      author: Factory.extend<Author>({
        id() {
          return `${Math.floor(Math.random() * 1000)}`;
        },
        name(i) {
          return `Author ${i}`;
        },
        image(i) {
          return `https://randomuser.me/api/portraits/men/${i}.jpg`;
        },
        description() {
          return 'The most incredible author';
        },
        books: [],
      }),
      book: Factory.extend<Book>({
        id() {
          return `${Math.floor(Math.random() * 1000)}`;
        },
        name(i) {
          return `Book ${i}`;
        },
        publishedDate() {
          return new Date().toISOString();
        },
      }),
    },
    seeds(server) {
      const author = server.create('author', {
        name: 'John Doe',
      }) as Author;
      server.create('book', {
        name: 'Book 1',
        publishedDate: '2023-01-01',
        description: 'Etiam porta sem malesuada magna mollis euismod.',
        authorId: author.id,
      });
      server.create('book', {
        name: 'Book 2',
        publishedDate: '2023-02-01',
        description: 'Cras mattis consectetur purus sit amet fermentum.',
        authorId: author.id,
      });
    },
    routes() {
      this.namespace = 'api';

      this.get('/authors', (schema, request) => {
        let authors = schema.all('author');

        if (request.queryParams.name) {
          const name = request.queryParams.name as string;
          authors = authors.filter((author) =>
            author.name.toLowerCase().includes(name.toLowerCase()),
          );
        }

        return authors;
      });

      this.post('/authors', (schema: Schema<AppRegistry>, request) => {
        const attrs = JSON.parse(request.requestBody) as Partial<Author>;
        return schema.create('author', attrs);
      });

      this.put('/authors/:id', (schema: Schema<AppRegistry>, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody) as Partial<Author>;

        const author = schema.find('author', id);

        if (!author) {
          return new Response(JSON.stringify({ error: 'Author not found' }), {
            status: 404,
          });
        }

        author.update({
          name: attrs.name,
          description: attrs.description,
          image: attrs.image,
        });

        return { author };
      });

      this.delete('/authors/:id', (schema: Schema<AppRegistry>, request) => {
        const id = request.params.id;
        const author = schema.find('author', id);
        if (author) {
          author.destroy();
          return schema.all('author');
        } else {
          return new Response(JSON.stringify({ error: 'Author not found' }), {
            status: 404,
          }); // return 404 with error message
        }
      });

      this.get('/authors/:id/books', (schema: Schema<AppRegistry>, request) => {
        const authorId = request.params.id;
        const author = schema.find('author', authorId);

        if (!author) {
          return new Response(JSON.stringify({ error: `Author not found.` }), {
            status: 404,
          });
        }

        const allBooks = schema.all('book').models;
        const authorBooks = allBooks.filter(
          // Mirage doesn't add an `authorId` or `author` field directly to the `Book` model.
          // Though, this is not the best practice but okay for testing purposes when you know for sure about the data structures.
          // @ts-expect-error model types from Mirage
          (book) => book.authorId === author.id,
        );

        return authorBooks.map((book) => book.attrs);
      });

      this.post(
        '/authors/:id/books',
        (schema: Schema<AppRegistry>, request) => {
          const attrs = JSON.parse(request.requestBody) as Partial<Book>;
          const id = request.params.id;
          const author = schema.find('author', id);

          if (author) {
            return schema.create('book', { ...attrs, author });
          } else {
            return new Response(JSON.stringify({ error: 'Author not found' }), {
              status: 404,
            });
          }
        },
      );

      this.delete(
        '/authors/:authorId/books/:bookId',
        (schema: Schema<AppRegistry>, request) => {
          const authorId = request.params.authorId;
          const bookId = request.params.bookId;

          const author = schema.find('author', authorId);

          if (!author) {
            return new Response(
              JSON.stringify({ error: `Author not found.` }),
              {
                status: 404,
              },
            );
          }

          const book = schema.find('book', bookId);

          if (!book) {
            return new Response(JSON.stringify({ error: `Book not found.` }), {
              status: 404,
            });
          }

          book.destroy();

          return new Response(null, { status: 204 });
        },
      );
    },
  });
}
