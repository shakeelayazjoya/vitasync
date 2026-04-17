import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDashboardStats, DashboardApiResponse } from "@/redux/thunks/dashboard";

interface DashboardStatsState {
  stats: DashboardApiResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardStatsState = {
  stats: null,
  isLoading: false,
  error: null,
};

const dashboardStatsSlice = createSlice({
  name: "dashboardStats",
  initialState,
  reducers: {
    clearDashboardStats: (state) => {
      state.stats = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action: PayloadAction<DashboardApiResponse>) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to load dashboard stats.";
      });
  },
});

export const { clearDashboardStats } = dashboardStatsSlice.actions;
export default dashboardStatsSlice.reducer;
