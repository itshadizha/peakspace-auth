import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp, logout, resetPassword, forgotPassword } from "./authThunk";

interface UserInfo {
  name: string;
  number: string;
  email: string;
  password: string;
  isAuth: boolean;
  token?: string; 
}

interface AuthState {
  userInfo: UserInfo;
  isAuth: boolean;
  message: string;
}

const initialState: AuthState = {
  userInfo: {
    name: "",
    number: "",
    email: "",
    password: "",
    isAuth: false,
  },
  isAuth: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
        state.isAuth = true;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
        state.isAuth = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.userInfo = {
          name: "",
          number: "",
          email: "",
          password: "",
          isAuth: false,
        };
        state.isAuth = false;
        state.message = payload.message as string;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.message = payload.message as string;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.message = payload as string;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.message = payload.message as string;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.message = payload as string;
      });
  },
});

export default authSlice.reducer;
