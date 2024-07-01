import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authorReducer from './slices/authorSlice';
import { AuthorState } from './slices/authorSlice';
import dialogReducer from './slices/dialogSlice';
import { DialogState } from './slices/dialogSlice';

export type RootState = {
  authors: AuthorState;
  dialog: DialogState;
};

const rootReducer = combineReducers({
  authors: authorReducer,
  dialog: dialogReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export const store = setupStore();
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
