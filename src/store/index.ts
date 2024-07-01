import { configureStore } from '@reduxjs/toolkit';
import authorReducer from './slices/authorSlice';
import { AuthorState } from './slices/authorSlice';
import dialogReducer from './slices/dialogSlice';
import { DialogState } from './slices/dialogSlice';

export const store = configureStore({
  reducer: {
    authors: authorReducer,
    dialog: dialogReducer,
  },
});

export type RootState = {
  authors: AuthorState;
  dialog: DialogState;
};

export type AppDispatch = typeof store.dispatch;
