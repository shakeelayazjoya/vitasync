import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addFamilyMember, fetchFamilyMembers, FamilyMember } from "@/redux/thunks/family";

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
        const activeId =
          state.activeMemberId && action.payload.some((member) => member.id === state.activeMemberId)
            ? state.activeMemberId
            : action.payload[0]?.id ?? "";
        state.activeMemberId = activeId;
        state.members = action.payload.map((member) => ({
          ...member,
          isActive: member.id === activeId,
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
        if (!state.activeMemberId) {
          state.activeMemberId = addedMember.id;
          state.members = state.members.map((member) => ({
            ...member,
            isActive: member.id === addedMember.id,
          }));
        }
      })
      .addCase(addFamilyMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to add member.";
      });
  },
});

export const { setActiveMember } = familySlice.actions;
export default familySlice.reducer;
