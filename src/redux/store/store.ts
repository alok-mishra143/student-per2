import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import studentReducer from "./studentslice";
const store = configureStore({
  reducer: {
    isAuthenticated: authReducer,
    students: studentReducer,
  },
});

export default store;
