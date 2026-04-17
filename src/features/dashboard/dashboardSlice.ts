import { createSlice } from "@reduxjs/toolkit";
import { mockDashboardStats, mockMeals, mockWeeklyData, mockAiTip } from "@/utils/mockData";

interface DashboardState {
  stats: typeof mockDashboardStats;
  meals: typeof mockMeals;
  weeklyData: typeof mockWeeklyData;
  aiTip: string;
  isLoading: boolean;
}

const initialState: DashboardState = {
  stats: mockDashboardStats,
  meals: mockMeals,
  weeklyData: mockWeeklyData,
  aiTip: mockAiTip,
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;
