import { createAsyncThunk } from "@reduxjs/toolkit";
import { mealsService } from "@/features/meals/mealsService";

export interface CreateMealFamilyMember {
  name: string;
  relationship: string;
  calorieGoal: number;
}

export interface CreateMealBodyResponse {
  energy: number;
  mood: string;
  digestion: string;
  focus: number;
}

export interface CreateMealFood {
  name: string;
  portion: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isDesi: boolean;
  _id?: string;
}

export interface CreateMealRequest {
  mealType: string;
  familyMember?: string;
  familyMemberRelationship?: string;
  foods: CreateMealFood[];
  bodyResponse: CreateMealBodyResponse;
  loggedAt: string;
}

export interface MealLogItem extends CreateMealRequest {
  userId: string;
  familyMember: string;
  totalCalories: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  foods: Array<CreateMealFood & { _id: string }>;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Server error. Please try again.";
};

export const createMeal = createAsyncThunk<MealLogItem, CreateMealRequest, { rejectValue: string }>(
  "createMeal/createMeal",
  async (mealData, { rejectWithValue }) => {
    try {
      return await mealsService.createMeal(mealData);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
