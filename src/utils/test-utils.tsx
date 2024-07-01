import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { render as rtlRender } from '@testing-library/react';
import { CssBaseline } from '@mui/material';
import theme from '../theme';
import { store } from '../store';

export const waitSec = (sec: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000));

function customRender(ui: React.ReactElement) {
  return rtlRender(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {ui}
      </ThemeProvider>
    </Provider>,
  );
}

export { customRender as render };
