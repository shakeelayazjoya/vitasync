import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/app/store";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import AppLayout from "./components/layout/AppLayout";
import PrivateRoute from "./components/shared/PrivateRoute";
import PublicRoute from "./components/shared/PublicRoute";

import DashboardPage from "./features/dashboard/DashboardPage";
import LogMealPage from "./features/meals/LogMealPage";
import MyMealsPage from "./features/meals/MyMealsPage";
import HistoryPage from "./features/history/HistoryPage";
import AnalyticsPage from "./features/analytics/AnalyticsPage";
import AiCoachPage from "./features/coach/AiCoachPage";
import CalculatorPage from "./features/calculator/CalculatorPage";
import FamilyPage from "./features/family/FamilyPage";
import FamilyMealsPage from "./features/meals/FamilyMealsPage";
import ReportsPage from "./features/reports/ReportsPage";
import SettingsPage from "./features/settings/SettingsPage";

import AdminLayout from "./features/admin/AdminLayout";
import AdminDashboard from "./features/admin/AdminDashboard";
import AdminUsers from "./features/admin/AdminUsers";
import AdminAnalytics from "./features/admin/AdminAnalytics";
import AdminSettings from "./features/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

            {/* Authenticated user routes */}
            <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/log-meal" element={<LogMealPage />} />
              <Route path="/my-meals" element={<MyMealsPage />} />
              <Route path="/family-meals" element={<FamilyMealsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/ai-coach" element={<AiCoachPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/family" element={<FamilyPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Admin routes */}
            <Route element={<PrivateRoute role="admin"><AdminLayout /></PrivateRoute>}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
