import { Box, Typography } from '@mui/material';

export const NoMatch = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={10}>
      <Typography variant="h5">Not Found</Typography>
    </Box>
  );
};
