import api from "@/api/api";
import { LocalStorageKeys } from "@/enums/local-storage-keys.enum";
import { AuthDto } from "@/types/auth.dto";
import { SignInForm } from "@/types/forms/sign-in.form";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signIn = createAsyncThunk<AuthDto, SignInForm>(
  "signIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signin", {
        ...data,
      });
      localStorage.setItem(
        LocalStorageKeys.AcessToken,
        response.data.accessToken
      );
      localStorage.setItem(
        LocalStorageKeys.RefreshToken,
        response.data.refreshToken
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({
        message: "Unknown error",
        statusCode: 500,
      });
    }
    return;
  }
);

export const signUp = createAsyncThunk<AuthDto, SignInForm>(
  "signUp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", {
        ...data,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({
        message: "Unknown error",
        statusCode: 500,
      });
    }
    return;
  }
);
