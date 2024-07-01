import { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';

import { fetchAuthors } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store/utils';
import { Loader } from '../loader';
import { AuthorCard } from './AuthorCard';

export const AuthorList = () => {
  const authors = useAppSelector((state) => state.authors.authors);
  const isLoading = useAppSelector((state) => state.authors.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthors(''));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack data-testid="author-list" direction="row" gap={3} flexWrap="wrap">
      <Loader
        loading={isLoading}
        render={() =>
          !authors?.length ? (
            <Typography align="center" variant="h6">
              Not Found
            </Typography>
          ) : (
            authors?.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))
          )
        }
      />
    </Stack>
  );
};
