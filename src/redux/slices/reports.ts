import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMonthlyReport,
  fetchWeeklyReport,
  downloadMonthlyReportPdf,
  downloadWeeklyReportPdf,
  MonthlyReportResponse,
  WeeklyReportResponse,
} from "@/redux/thunks/reports";

interface ReportsState {
  monthlyReport: MonthlyReportResponse | null;
  weeklyReport: WeeklyReportResponse | null;
  isMonthlyLoading: boolean;
  isWeeklyLoading: boolean;
  isMonthlyDownloading: boolean;
  isWeeklyDownloading: boolean;
  monthlyError: string | null;
  weeklyError: string | null;
  monthlyDownloadError: string | null;
  weeklyDownloadError: string | null;
}

const initialState: ReportsState = {
  monthlyReport: null,
  weeklyReport: null,
  isMonthlyLoading: false,
  isWeeklyLoading: false,
  isMonthlyDownloading: false,
  isWeeklyDownloading: false,
  monthlyError: null,
  weeklyError: null,
  monthlyDownloadError: null,
  weeklyDownloadError: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    clearReports: (state) => {
      state.monthlyReport = null;
      state.weeklyReport = null;
      state.isMonthlyLoading = false;
      state.isWeeklyLoading = false;
      state.isMonthlyDownloading = false;
      state.isWeeklyDownloading = false;
      state.monthlyError = null;
      state.weeklyError = null;
      state.monthlyDownloadError = null;
      state.weeklyDownloadError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyReport.pending, (state) => {
        state.isMonthlyLoading = true;
        state.monthlyError = null;
      })
      .addCase(
        fetchMonthlyReport.fulfilled,
        (state, action: PayloadAction<MonthlyReportResponse>) => {
          state.isMonthlyLoading = false;
          state.monthlyReport = action.payload;
        }
      )
      .addCase(fetchMonthlyReport.rejected, (state, action) => {
        state.isMonthlyLoading = false;
        state.monthlyError = action.payload || "Unable to load monthly report.";
      })
      .addCase(fetchWeeklyReport.pending, (state) => {
        state.isWeeklyLoading = true;
        state.weeklyError = null;
      })
      .addCase(
        fetchWeeklyReport.fulfilled,
        (state, action: PayloadAction<WeeklyReportResponse>) => {
          state.isWeeklyLoading = false;
          state.weeklyReport = action.payload;
        }
      )
      .addCase(fetchWeeklyReport.rejected, (state, action) => {
        state.isWeeklyLoading = false;
        state.weeklyError = action.payload || "Unable to load weekly report.";
      })
      .addCase(downloadMonthlyReportPdf.pending, (state) => {
        state.isMonthlyDownloading = true;
        state.monthlyDownloadError = null;
      })
      .addCase(downloadMonthlyReportPdf.fulfilled, (state) => {
        state.isMonthlyDownloading = false;
      })
      .addCase(downloadMonthlyReportPdf.rejected, (state, action) => {
        state.isMonthlyDownloading = false;
        state.monthlyDownloadError = action.payload || "Unable to download monthly report.";
      })
      .addCase(downloadWeeklyReportPdf.pending, (state) => {
        state.isWeeklyDownloading = true;
        state.weeklyDownloadError = null;
      })
      .addCase(downloadWeeklyReportPdf.fulfilled, (state) => {
        state.isWeeklyDownloading = false;
      })
      .addCase(downloadWeeklyReportPdf.rejected, (state, action) => {
        state.isWeeklyDownloading = false;
        state.weeklyDownloadError = action.payload || "Unable to download weekly report.";
      });
  },
});

export const { clearReports } = reportsSlice.actions;
export default reportsSlice.reducer;
