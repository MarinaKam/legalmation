import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from './index';

export const useAppDispatch: () => AppDispatch = useDispatch;

export type ThunkAPI = {
  dispatch: ThunkDispatch<RootState, unknown, Action>;
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
