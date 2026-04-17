import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../auth/service";
import type { AuthResponse, RegisterPayload, UserCredentials, User } from "../auth/types";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return "Server error. Please try again.";
};

export const loginUser = createAsyncThunk<AuthResponse, UserCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.register(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<{ user: User }, void, { rejectValue: string }>(
  "auth/fetchCurrent",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.fetchCurrentUser();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
