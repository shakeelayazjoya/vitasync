import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export interface DashboardDayEntry {
  date: string;
  calorieGoal: number;
  consumedCalories: number;
  remainingCalories: number;
  differenceCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  mealCount: number;
}

export interface DashboardApiResponse {
  year: number;
  month: number;
  familyMember: string;
  calorieGoal: number;
  totalConsumedCalories: number;
  monthlyGoalCalories: number;
  totalKcalDifference: number;
  totalMonthDays: number;
  daysLogged: number;
  goalDaysReached: number;
  goalAchievementRate: number;
  averageDailyCalories: number;
  averageDailyDifference: number;
  days: DashboardDayEntry[];
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Server error. Please try again.";
};

export const fetchDashboardStats = createAsyncThunk<
  DashboardApiResponse,
  void,
  { rejectValue: string }
>(
  "dashboardStats/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<DashboardApiResponse>("/logs/month");
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
