import { createSlice } from "@reduxjs/toolkit";

const initState = {
  name: "",
};

const namesSlice = createSlice({
  name: "names",
  initState,
  reducers: {
    add1(state) {
      state.name = state.name = "";
    },
  },
});

export const nameActions = namesSlice.actions;

export default namesSlice.reducer;
