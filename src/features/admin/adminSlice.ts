import { createSlice } from "@reduxjs/toolkit";
import { mockAdminStats, mockAdminUsers, mockUserGrowth, mockPlanDistribution } from "@/utils/mockData";

interface AdminState {
  stats: typeof mockAdminStats;
  users: typeof mockAdminUsers;
  userGrowth: typeof mockUserGrowth;
  planDistribution: typeof mockPlanDistribution;
  isLoading: boolean;
  searchQuery: string;
  filterPlan: string;
  currentPage: number;
  usersPerPage: number;
}

const initialState: AdminState = {
  stats: mockAdminStats,
  users: mockAdminUsers,
  userGrowth: mockUserGrowth,
  planDistribution: mockPlanDistribution,
  isLoading: false,
  searchQuery: "",
  filterPlan: "all",
  currentPage: 1,
  usersPerPage: 5,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setFilterPlan: (state, action) => {
      state.filterPlan = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setSearchQuery, setFilterPlan, setCurrentPage } = adminSlice.actions;
export default adminSlice.reducer;
