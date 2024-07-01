import { FC, ReactNode } from 'react';
import { SxProps } from '@mui/system';
import { Backdrop, CircularProgress } from '@mui/material';

type LoaderProps = {
  loading?: boolean;
  color?: string;
  sx?: SxProps;
  render: () => ReactNode;
};

export const Loader: FC<LoaderProps> = ({
  loading = false,
  render,
  color = '#fff',
  sx = {},
}) => {
  return loading ? (
    <Backdrop
      data-testid="loader"
      sx={{
        color,
        backgroundColor: 'transparent',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ...sx,
      }}
      open={loading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  ) : (
    <>{render()}</>
  );
};
