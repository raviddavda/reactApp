import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    isDark(state) {
      state.isDark = true;
    },
    isLight(state) {
      state.isDark = false;
    },
  },
});

//export the set functions for the components to make use of the actions
export const themeActions = themeSlice.actions;

//in reducer we have all the necessary data to connect with the big pie
export default themeSlice.reducer;
