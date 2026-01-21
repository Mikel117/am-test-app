import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import charactersReducer from './characters/characters.slice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: <TSelected>(selector: (state: RootState) => TSelected) => TSelected = useSelector