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
                  secondary={book.description}
                />
              </ListItem>
            ))}
          </List>
        )
      }
    />
  );
};
