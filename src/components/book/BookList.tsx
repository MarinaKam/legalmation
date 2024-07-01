import { FC } from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppSelector } from '../../store/utils';
import { Loader } from '../loader';

type BookListProps = {
  onDelete: (bookId: string) => void;
};

const formatDate = (dateString: string): string => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const BookList: FC<BookListProps> = ({ onDelete }) => {
  const books = useAppSelector((state) => state.authors.authorBooks);
  const isBookLoading = useAppSelector((state) => state.authors.isBookLoading);

  return (
    <Loader
      loading={isBookLoading}
      sx={{ position: 'absolute' }}
      render={() =>
        !books?.length ? (
          <Typography align="center" variant="h6">
            Not Found
          </Typography>
        ) : (
          <List>
            {books?.map((book) => (
              <ListItem
                key={book.id}
                secondaryAction={
                  <Stack direction="row" gap={1}>
                    <IconButton
                      edge="end"
                      title="Delete"
                      aria-label="delete"
                      color="error"
                      onClick={() => onDelete(book.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={book.name}
                  secondary={(
                    <Typography noWrap variant="body2" color="text.secondary">
                      {book.description} <br />
                      Published date: {formatDate(book?.publishedDate) || ''}
                    </Typography>
                  )}
                />
              </ListItem>
            ))}
          </List>
        )
      }
    />
  );
};
