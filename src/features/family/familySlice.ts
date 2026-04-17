import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return "Server error. Please try again.";
};

type FetchFamilyResponse =
  | FamilyMember[]
  | { familyMembers: FamilyMember[] }
  | { data: FamilyMember[] };

const normalizeFamilyResponse = (payload: unknown): FamilyMember[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    const typedPayload = payload as { familyMembers?: FamilyMember[]; data?: FamilyMember[] };
    if (Array.isArray(typedPayload.familyMembers)) {
      return typedPayload.familyMembers;
    }
    if (Array.isArray(typedPayload.data)) {
      return typedPayload.data;
    }
  }

  return [];
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

type AddFamilyResponse =
  | FamilyMember
  | { familyMember: FamilyMember }
  | { data: FamilyMember }
  | { member: FamilyMember };

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
    data?: FamilyMember;
    member?: FamilyMember;
  };

  if (typedPayload.familyMember) return typedPayload.familyMember;
  if (typedPayload.data) return typedPayload.data;
  if (typedPayload.member) return typedPayload.member;

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

interface FamilyState {
  members: FamilyMember[];
  activeMemberId: string;
  isLoading: boolean;
  error?: string;
}

const initialState: FamilyState = {
  members: [],
  activeMemberId: "",
  isLoading: false,
};

const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    setActiveMember: (state, action: PayloadAction<string>) => {
      state.activeMemberId = action.payload;
      state.members = state.members.map((m) => ({
        ...m,
        isActive: m.id === action.payload,
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilyMembers.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchFamilyMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        const firstId = action.payload[0]?.id ?? state.activeMemberId;
        state.activeMemberId = firstId;
        state.members = action.payload.map((member) => ({
          ...member,
          isActive: member.id === firstId,
        }));
      })
      .addCase(fetchFamilyMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to fetch family members.";
      })
      .addCase(addFamilyMember.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addFamilyMember.fulfilled, (state, action) => {
        state.isLoading = false;
        const requestData = action.meta.arg;
        const addedMember: FamilyMember = {
          ...action.payload,
          name: action.payload.name ?? requestData.name,
          age: action.payload.age ?? requestData.age,
          relationship: action.payload.relationship ?? requestData.relationship,
          calorieGoal: action.payload.calorieGoal ?? requestData.calorieGoal,
          healthInfo: action.payload.healthInfo ?? requestData.healthInfo,
          medicalConditions: action.payload.medicalConditions ?? requestData.medicalConditions,
          isActive: false,
          goal:
            action.payload.goal ??
            (action.payload.calorieGoal ?? requestData.calorieGoal
              ? `${action.payload.calorieGoal ?? requestData.calorieGoal} kcal`
              : undefined),
          avatar: action.payload.avatar ?? "",
        };

        state.members.push(addedMember);
      })
      .addCase(addFamilyMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to add member.";
      });
  },
});

export const { setActiveMember } = familySlice.actions;
export default familySlice.reducer;
