import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axiosInstance";
import { NavigateFunction } from "react-router-dom";

interface SignUpData {
  email: string;
  password: string;
  userName: string;
  photo: string;
}

interface AuthPayload {
  data: SignUpData;
  navigate: NavigateFunction;
}

export const signUp = createAsyncThunk(
  "sign/signup",
  async ({ data, navigate }: AuthPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/sign-up", data);
      navigate("/");
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

interface SignInData {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  "sign/signin",
  async (
    { data, navigate }: { data: SignInData; navigate: NavigateFunction },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/sign-in", data);
      navigate("/user");
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

interface LogoutPayload {
  navigate: NavigateFunction;
}

interface LogoutResponse {
  message: string;
}

export const logout = createAsyncThunk(
  "sign/logout",
  async ({ navigate }: LogoutPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<LogoutResponse>("/auth/logout");
      navigate("/");
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/auth/reset-password", data);
      return response.data; // Assuming the response contains a message or other relevant data
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

interface ForgotPasswordPayload {
  email: string;
  frontEndUrl: string;
}

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: ForgotPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/forgot", data);
      return response.data; // Assuming the response contains a message or other relevant data
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
