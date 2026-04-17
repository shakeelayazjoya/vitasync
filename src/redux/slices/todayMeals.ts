import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTodayMeals } from "@/redux/thunks/todayMeals";
import type { MealLogItem } from "@/redux/thunks/createMeal";

interface TodayMealsState {
  meals: MealLogItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodayMealsState = {
  meals: [],
  isLoading: false,
  error: null,
};

const todayMealsSlice = createSlice({
  name: "todayMeals",
  initialState,
  reducers: {
    clearTodayMeals: (state) => {
      state.meals = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayMeals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodayMeals.fulfilled, (state, action: PayloadAction<MealLogItem[]>) => {
        state.isLoading = false;
        state.meals = action.payload;
      })
      .addCase(fetchTodayMeals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unable to load today\'s meals.";
      });
  },
});

export const { clearTodayMeals } = todayMealsSlice.actions;
export default todayMealsSlice.reducer;
