import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Author, Book } from '../../types';

interface DialogState {
  isOpen: boolean;
  isOpenPreview: boolean;
  isOpenBook: boolean;
  book?: Book;
  author?: Author;
}

export const initialState: DialogState = {
  isOpen: false,
  isOpenPreview: false,
  isOpenBook: false,
  book: undefined,
  author: undefined,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<DialogState>>) => ({
      ...state,
      ...action.payload,
    }),
    reset: () => initialState,
  },
});

export const { update, reset } = dialogSlice.actions;
export type { DialogState };
export default dialogSlice.reducer;
