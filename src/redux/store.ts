import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import dashboardStatsReducer from "./slices/dashboard";
import dashboardReducer from "@/features/dashboard/dashboardSlice";
import mealsReducer from "./slices/meals";
import createMealReducer from "./slices/createMeal";
import userMealsReducer from "./slices/userMeals";
import todayMealsReducer from "./slices/todayMeals";
import reportsReducer from "./slices/reports";
import coachReducer from "@/features/coach/coachSlice";
import familyReducer from "./slices/family";
import adminReducer from "@/features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    dashboardStats: dashboardStatsReducer,
    meals: mealsReducer,
    createMeal: createMealReducer,
    userMeals: userMealsReducer,
    todayMeals: todayMealsReducer,
    reports: reportsReducer,
    coach: coachReducer,
    family: familyReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
