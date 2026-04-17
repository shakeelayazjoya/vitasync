import { createAsyncThunk } from "@reduxjs/toolkit";
import { mealsService } from "@/features/meals/mealsService";
import type { MealItem } from "@/redux/slices/meals";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return "Server error. Please try again.";
};

export const fetchMeals = createAsyncThunk<MealItem[], void, { rejectValue: string }>(
  "meals/fetchMeals",
  async (_, { rejectWithValue }) => {
    try {
      return await mealsService.fetchDesiMeals();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
