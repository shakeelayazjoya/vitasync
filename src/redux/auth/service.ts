import api from "@/services/api";
import type { AuthResponse, RegisterPayload, UserCredentials } from "./types";

export const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", payload);
    return response.data;
  },

  login: async (credentials: UserCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  fetchCurrentUser: async (): Promise<{ user: AuthResponse["user"] }> => {
    const response = await api.get<{ user: AuthResponse["user"] }>("/auth/me");
    return response.data;
  },
};
