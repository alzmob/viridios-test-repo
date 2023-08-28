import {createSlice} from '@reduxjs/toolkit';

export type MainTheme = 'LIGHT' | 'DARK';

interface ThemeState {
  appTheme: MainTheme;
}

const initialState: ThemeState = {appTheme: 'LIGHT'};

const themeSlice = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    changeTheme: (state, {payload}) => {
      state.appTheme = payload;
    },
  },
});

export const {changeTheme} = themeSlice.actions;

export default themeSlice.reducer;
