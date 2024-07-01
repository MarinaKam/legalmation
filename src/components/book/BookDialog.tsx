import { FC, useState, ChangeEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { getRandomDate } from '../../utils/getRandomDate';
import type { Book } from '../../types';

type BookDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddBook?: (val: Book) => void;
};

export const BookDialog: FC<BookDialogProps> = ({
  open,
  onClose,
  onAddBook,
}) => {
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setError(null);
    setBook(null);
    onClose();
  };

  const handleSave = () => {
    if (!book?.name) {
      setError('Name field is required!');
      return;
    }

    if (book) {
      onAddBook?.({
        ...book,
        publishedDate:
          book.publishedDate ||
          getRandomDate(new Date(1800, 0, 1), new Date())
            .toISOString()
            .split('T')[0],
      });
    }

    handleClose();
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setBook({
      ...(book || ({} as Book)),
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Dialog data-testid="book-dialog" open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Add a New Book</DialogTitle>

      <IconButton
        aria-label="close-book-dialog"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <TextField
          required
          margin="dense"
          name="name"
          label="Book Title"
          type="text"
          variant="standard"
          fullWidth
          value={book?.name || ''}
          onChange={handleFieldChange}
        />

        <TextField
          margin="dense"
          name="description"
          label="Book Description"
          type="text"
          variant="standard"
          fullWidth
          multiline
          rows={4}
          value={book?.description || ''}
          onChange={handleFieldChange}
        />
      </DialogContent>

      <DialogActions>
        {!!error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
