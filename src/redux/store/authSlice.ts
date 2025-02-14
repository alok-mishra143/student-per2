import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface isAuthState {
  isAuthenticated: boolean;
}
const initialState: isAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setauth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setauth } = authSlice.actions;
export default authSlice.reducer;
