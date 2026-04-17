import { createAsyncThunk } from "@reduxjs/toolkit";
import { mealsService } from "@/features/meals/mealsService";
import type { MealLogItem } from "@/redux/thunks/createMeal";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Server error. Please try again.";
};

export const fetchTodayMeals = createAsyncThunk<MealLogItem[], void, { rejectValue: string }>(
  "todayMeals/fetchTodayMeals",
  async (_, { rejectWithValue }) => {
    try {
      return await mealsService.fetchTodayMeals();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
