import { ChangeEvent, FC, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { fetchAuthors } from '../../store/actions';
import { useAppDispatch } from '../../store/utils';

export const AuthorFilter: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
    dispatch(fetchAuthors(event.target.value));
  };

  return (
    <Box px={[2, 5]} maxWidth={350}>
      <TextField
        fullWidth
        label="Search by author name"
        variant="standard"
        value={searchTerm}
        onChange={handleChange}
      />
    </Box>
  );
};
