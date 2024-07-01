import { FC, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Avatar,
  Box,
  Stack,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { dialogSlice } from '../../store/slices/dialogSlice';
import { deleteBookFromAuthor, fetchAuthorBooks } from '../../store/actions';
import { useAppDispatch } from '../../store/utils';
import type { Author } from '../../types';
import { BookList } from '../book';

type AuthorDetailDialogProps = {
  selectedAuthor?: Author;
  open: boolean;
  onClose: () => void;
};

export const AuthorDetailDialog: FC<AuthorDetailDialogProps> = ({
  open,
  selectedAuthor,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const handleOpenDialog = () => {
    dispatch(
      dialogSlice.actions.update({ isOpenBook: true, author: selectedAuthor }),
    );
  };

  const handleDeleteBook = (bookId: string) => {
    dispatch(
      deleteBookFromAuthor({ bookId, authorId: selectedAuthor?.id as string }),
    ).then(() => dispatch(fetchAuthorBooks(selectedAuthor?.id as string)));
  };

  useEffect(() => {
    if (selectedAuthor) {
      dispatch(fetchAuthorBooks(selectedAuthor?.id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAuthor]);

  return (
    <Dialog
      data-testid="author-detail-dialog"
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} />

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={3}
      >
        <Avatar
          alt={selectedAuthor?.name}
          src={selectedAuthor?.image}
          sx={{ width: 100, height: 100 }}
        />

        <Typography variant="h5">{selectedAuthor?.name}</Typography>
      </Stack>
      <IconButton
        aria-label="close-author-detail-dialog"
        onClick={onClose}
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
        {selectedAuthor?.description}

        <Divider sx={{ my: 3 }} />

        <Stack gap={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography variant="h5">Books List</Typography>

            <Button
              aria-label="add-book-btn"
              title="Add Book"
              variant="contained"
              onClick={handleOpenDialog}
              startIcon={<AddIcon />}
            >
              Add Book
            </Button>
          </Box>

          <Box position="relative" minHeight={150}>
            <BookList onDelete={handleDeleteBook} />
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
