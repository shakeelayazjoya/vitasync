import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  goal?: string;
  avatar?: string;
  isActive?: boolean;
  relationship?: string;
  calorieGoal?: number;
  healthInfo?: string;
  medicalConditions?: string[];
}

export interface AddFamilyMemberPayload {
  name: string;
  relationship: string;
  calorieGoal: number;
  age: number;
  healthInfo: string;
  medicalConditions: string[];
}

type FetchFamilyResponse =
  | FamilyMember[]
  | { familyMembers: FamilyMember[] }
  | { data: FamilyMember[] }
  | { data: { familyMembers: FamilyMember[] } };

type AddFamilyResponse =
  | FamilyMember
  | { familyMember: FamilyMember }
  | { data: FamilyMember }
  | { data: { familyMember: FamilyMember } }
  | { member: FamilyMember };

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Server error. Please try again.";
};

const normalizeFamilyResponse = (payload: unknown): FamilyMember[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    const typedPayload = payload as { familyMembers?: FamilyMember[]; data?: unknown };
    if (Array.isArray(typedPayload.familyMembers)) {
      return typedPayload.familyMembers;
    }
    if (Array.isArray(typedPayload.data)) {
      return typedPayload.data;
    }
    if (typedPayload.data && typeof typedPayload.data === "object") {
      const nested = typedPayload.data as { familyMembers?: FamilyMember[] };
      if (Array.isArray(nested.familyMembers)) {
        return nested.familyMembers;
      }
    }
  }

  return [];
};

const normalizeAddedFamilyMember = (payload: unknown): FamilyMember => {
  if (!payload || typeof payload !== "object") {
    return {} as FamilyMember;
  }

  const typedPayload = payload as {
    id?: string;
    name?: string;
    age?: number;
    goal?: string;
    avatar?: string;
    relationship?: string;
    calorieGoal?: number;
    healthInfo?: string;
    medicalConditions?: string[];
    familyMember?: FamilyMember;
    data?: unknown;
    member?: FamilyMember;
  };

  if (typedPayload.familyMember) return typedPayload.familyMember;
  if (typedPayload.member) return typedPayload.member;

  if (typedPayload.data) {
    if (Array.isArray(typedPayload.data)) {
      return typedPayload.data[0] ?? ({} as FamilyMember);
    }
    if (typeof typedPayload.data === "object") {
      const dataPayload = typedPayload.data as {
        familyMember?: FamilyMember;
        id?: string;
        name?: string;
        age?: number;
        goal?: string;
        avatar?: string;
        relationship?: string;
        calorieGoal?: number;
        healthInfo?: string;
        medicalConditions?: string[];
      };
      if (dataPayload.familyMember) return dataPayload.familyMember;
      return {
        id: dataPayload.id ?? "",
        name: dataPayload.name ?? "",
        age: dataPayload.age ?? 0,
        goal: dataPayload.goal,
        avatar: dataPayload.avatar,
        relationship: dataPayload.relationship,
        calorieGoal: dataPayload.calorieGoal,
        healthInfo: dataPayload.healthInfo,
        medicalConditions: dataPayload.medicalConditions,
      };
    }
  }

  return {
    id: typedPayload.id ?? "",
    name: typedPayload.name ?? "",
    age: typedPayload.age ?? 0,
    goal: typedPayload.goal,
    avatar: typedPayload.avatar,
    relationship: typedPayload.relationship,
    calorieGoal: typedPayload.calorieGoal,
    healthInfo: typedPayload.healthInfo,
    medicalConditions: typedPayload.medicalConditions,
  };
};

export const fetchFamilyMembers = createAsyncThunk<FamilyMember[], void, { rejectValue: string }>(
  "family/fetchMembers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<FetchFamilyResponse>("/family");
      return normalizeFamilyResponse(response.data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const addFamilyMember = createAsyncThunk<FamilyMember, AddFamilyMemberPayload, { rejectValue: string }>(
  "family/addMember",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post<AddFamilyResponse>("/family", payload);
      return normalizeAddedFamilyMember(response.data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
