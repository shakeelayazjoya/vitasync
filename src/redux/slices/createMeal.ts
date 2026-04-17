import { createSlice } from "@reduxjs/toolkit";
import { createMeal, MealLogItem } from "@/redux/thunks/createMeal";

interface CreateMealState {
  lastCreatedMeal?: MealLogItem;
  isLoading: boolean;
  error: string | null;
}

const initialState: CreateMealState = {
  lastCreatedMeal: undefined,
  isLoading: false,
  error: null,
};

const createMealSlice = createSlice({
  name: "createMeal",
  initialState,
  reducers: {
    resetCreateMeal: (state) => {
      state.lastCreatedMeal = undefined;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMeal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMeal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastCreatedMeal = action.payload;
      })
      .addCase(createMeal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unable to create meal.";
      });
  },
});

export const { resetCreateMeal } = createMealSlice.actions;
export default createMealSlice.reducer;
