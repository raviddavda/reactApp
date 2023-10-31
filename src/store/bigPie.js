import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./counterSlice";
import authSlice from "./auth";

const store = configureStore({
  reducer: {
    counterSlice,
    authSlice,
  },
});

export default store;
