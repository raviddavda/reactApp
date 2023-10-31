import { createSlice } from "@reduxjs/toolkit";

const initState = {
  counter: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initState,
  reducers: {
    add1(state) {
      state.counter = state.counter + 1;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
