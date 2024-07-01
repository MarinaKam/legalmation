import { Outlet } from 'react-router-dom';
import { Paper } from '@mui/material';

export const Layout = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'grey.50',
      }}
    >
      <Outlet />
    </Paper>
  );
};
