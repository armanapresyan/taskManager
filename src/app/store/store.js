import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../feature/todoSlice";
import authSlice from "../feature/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    todo: todoSlice,
  },
});

export default store;
