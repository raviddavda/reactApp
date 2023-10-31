import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});

//export the set functions for the components to make use of the actions
export const authActions = authSlice.actions;

//in reducer we have all the necessary data to connect with the big pie
export default authSlice.reducer;
