import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserMeals } from "@/redux/thunks/userMeals";
import type { MealLogItem } from "@/redux/thunks/createMeal";

interface UserMealsState {
  meals: MealLogItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserMealsState = {
  meals: [],
  isLoading: false,
  error: null,
};

const userMealsSlice = createSlice({
  name: "userMeals",
  initialState,
  reducers: {
    clearUserMeals: (state) => {
      state.meals = [];
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMeals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserMeals.fulfilled, (state, action: PayloadAction<MealLogItem[]>) => {
        state.isLoading = false;
        state.meals = action.payload;
      })
      .addCase(fetchUserMeals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unable to load meals.";
      });
  },
});

export const { clearUserMeals } = userMealsSlice.actions;
export default userMealsSlice.reducer;
