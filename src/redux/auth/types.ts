export interface FamilyMember {
  _id?: string;
  name: string;
  relationship: string;
  calorieGoal: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  plan?: "Free" | "Pro" | "Family";
  goalMode?: string;
  calorieGoal?: number;
  waterGoal?: number;
  language?: string;
  familyMembers?: FamilyMember[];
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  goalMode: string;
  calorieGoal: number;
  waterGoal: number;
  language: string;
  familyMembers: FamilyMember[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  role: "user" | "admin";
}
