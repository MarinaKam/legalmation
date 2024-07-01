import { Button, Stack, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AuthorFilter } from '../components';

import {
  addAuthor,
  addBookToAuthor,
  fetchAuthorBooks,
  updateAuthor,
} from '../store/actions';
import { useAppDispatch, useAppSelector } from '../store/utils';
import { dialogSlice } from '../store/slices/dialogSlice';
import {
  AuthorList,
  AuthorDialog,
  AuthorDetailDialog,
  BookDialog,
} from '../components';
import { Author, Book } from '../types';

export const Dashboard = () => {
  const authors = useAppSelector((state) => state.authors.authors);
  const isOpen = useAppSelector((state) => state.dialog.isOpen);
  const isOpenBook = useAppSelector((state) => state.dialog.isOpenBook);
  const isOpenPreview = useAppSelector((state) => state.dialog.isOpenPreview);
  const selectedAuthor = useAppSelector((state) => state.dialog.author);
  const dispatch = useAppDispatch();

  const handleOpenDialog = () => {
    dispatch(dialogSlice.actions.update({ isOpen: true }));
  };

  const handleCloseDialog = () => {
    dispatch(dialogSlice.actions.reset());
  };

  const handleAddBookToAuthor = (book: Book) => {
    if (!selectedAuthor?.id) return;

    dispatch(
      addBookToAuthor({ book, authorId: selectedAuthor?.id as string }),
    ).then(() => dispatch(fetchAuthorBooks(selectedAuthor?.id as string)));
  };

  const handleAddAuthor = (author: Author) => {
    dispatch(
      addAuthor({
        ...author,
        image: `https://randomuser.me/api/portraits/men/${authors?.length}.jpg`,
      }),
    );
  };

  const handleUpdateAuthor = (author: Author) => {
    dispatch(updateAuthor({ id: author.id, author }));
    dispatch(dialogSlice.actions.reset());
  };

  return (
    <Stack
      height="100%"
      direction="column"
      gap={3}
      py={[2, 5]}
      overflow="hidden"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        px={[2, 5]}
      >
        <Typography variant="h4">Authors List</Typography>

        <Button
          variant="contained"
          onClick={handleOpenDialog}
          startIcon={<AddIcon />}
        >
          Add Author
        </Button>
      </Box>

      <AuthorDialog
        open={isOpen}
        onClose={handleCloseDialog}
        selectedAuthor={selectedAuthor}
        onAddAuthor={selectedAuthor ? handleUpdateAuthor : handleAddAuthor}
      />

      <BookDialog
        open={isOpenBook}
        onClose={() => {
          dispatch(
            dialogSlice.actions.update({
              isOpenBook: false,
            }),
          );
        }}
        onAddBook={handleAddBookToAuthor}
      />

      <AuthorDetailDialog
        open={isOpenPreview}
        selectedAuthor={selectedAuthor}
        onClose={handleCloseDialog}
      />

      <AuthorFilter />

      <Box flexGrow={1} overflow="auto" px={[2, 5]}>
        <AuthorList />
      </Box>
    </Stack>
  );
};
