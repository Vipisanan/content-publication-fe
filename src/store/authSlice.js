import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userId: null,
  email: null,
  publisher: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.publisher = !!action.payload.publisher;
    },
    setPublisher: (state, action) => {
      state.publisher = action.payload.publisher;
    },
    clearAuth: (state) => {
      state.token = null;
      state.userId = null;
      state.email = null;
      state.publisher = false;
    },
  },
});

export const { setAuth, clearAuth, setPublisher } = authSlice.actions;
export default authSlice.reducer;
