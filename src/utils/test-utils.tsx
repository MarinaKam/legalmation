import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { CssBaseline } from '@mui/material';
import theme from '../theme';
import { AppStore, RootState, setupStore } from '../store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<NonNullable<unknown>>): JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const store = setupStore();
export { renderWithProviders as render };
