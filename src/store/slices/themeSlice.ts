import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode, ThemeState } from '@/types/theme';
import { RootState } from '@/store/index';

const initialState: ThemeState = {
  currentTheme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const selectTheme = (state: RootState): ThemeMode =>
  state.theme.currentTheme;

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
