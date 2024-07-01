import { FC, useState, useEffect, ChangeEvent } from 'react';
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

import { Author } from '../../types';

type AuthorDialogProps = {
  selectedAuthor?: Author;
  open: boolean;
  onClose: () => void;
  onAddAuthor?: (val: Author) => void;
  onUpdateAuthor?: (val: Author) => void;
};

export const AuthorDialog: FC<AuthorDialogProps> = ({
  open,
  selectedAuthor,
  onClose,
  onAddAuthor,
}) => {
  const [author, setAuthor] = useState<Author | null>(selectedAuthor || null);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setError(null);
    setAuthor(null);
    onClose();
  };

  const handleAdd = () => {
    if (!author?.name || !author?.description) {
      setError('All fields must be filled!');
      return;
    }

    author && onAddAuthor?.(author);
    handleClose();
  };

  const handleFieldChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setError(null);
    setAuthor({
      ...(author || ({} as Author)),
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setError(null);
    setAuthor(selectedAuthor || null);
  }, [selectedAuthor]);

  return (
    <Dialog data-testid="author-form" open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {selectedAuthor ? 'Edit Author' : 'Add a New Author'}
      </DialogTitle>

      <IconButton
        aria-label="close"
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
          autoFocus
          required
          margin="dense"
          name="name"
          label="Author Name"
          type="text"
          value={author?.name || ''}
          fullWidth
          variant="standard"
          onChange={handleFieldChange}
        />

        <TextField
          autoFocus
          required
          margin="dense"
          name="description"
          label="Author Description"
          type="text"
          value={author?.description || ''}
          fullWidth
          multiline
          rows={4}
          variant="standard"
          onChange={handleFieldChange}
        />
      </DialogContent>

      <DialogActions sx={{ m: 0, p: 2 }}>
        {!!error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button variant="contained" disabled={!!error} onClick={handleAdd}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
