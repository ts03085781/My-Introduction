import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageCode, LanguageState } from '@/types/language';
import { RootState } from '@/store/index';

const initialState: LanguageState = {
  currentLanguage: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const selectLanguage = (state: RootState): LanguageCode =>
  state.language.currentLanguage;

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
