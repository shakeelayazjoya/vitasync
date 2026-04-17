import { createAsyncThunk } from "@reduxjs/toolkit";
import { mealsService } from "@/features/meals/mealsService";
import type { MealLogItem } from "@/redux/thunks/createMeal";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Server error. Please try again.";
};

export const fetchUserMeals = createAsyncThunk<MealLogItem[], void, { rejectValue: string }>(
  "userMeals/fetchUserMeals",
  async (_, { rejectWithValue }) => {
    try {
      return await mealsService.fetchUserMeals();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
