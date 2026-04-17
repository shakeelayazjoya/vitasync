import { createAsyncThunk } from "@reduxjs/toolkit";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "@/services/api";
import type { MealLogItem } from "@/redux/thunks/createMeal";
import type { RootState } from "@/redux/store";

export interface ReportDayEntry {
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

export interface WeeklyDailyRow {
  day: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

export interface MonthlyWeeklyAverageRow {
  week: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sleep: number;
}

export interface MonthlyReportResponse {
  year: number;
  month: number;
  familyMember: string;
  calorieGoal: number;
  totalConsumedCalories: number;
  monthlyGoalCalories: number;
  totalKcalDifference: number;
  totalMonthDays: number;
  goalDaysReached: number;
  goalAchievementRate: number;
  averageDailyCalories: number;
  averageDailyDifference: number;
  avgWeight?: number;
  avgSleep?: number;
  days: ReportDayEntry[];
  mealLogs?: MealLogItem[];
  weeklyAverages?: MonthlyWeeklyAverageRow[];
  highlights?: string[];
}

export interface WeeklyReportResponse {
  weekStartDate: string;
  weekEndDate: string;
  familyMember: string;
  calorieGoal: number;
  totalConsumedCalories: number;
  weeklyGoalCalories: number;
  totalKcalDifference: number;
  totalWeekDays: number;
  goalDaysReached: number;
  goalAchievementRate: number;
  averageDailyCalories: number;
  averageDailyDifference: number;
  days: ReportDayEntry[];
  mealLogs?: MealLogItem[];
  dailyData?: WeeklyDailyRow[];
  insights?: string[];
}

export interface MonthlyReportQuery {
  year: number;
  month: number;
  familyMember?: string;
}

export interface WeeklyReportQuery {
  weekStartDate: string;
  weekEndDate: string;
  familyMember?: string;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Server error. Please try again.";
};

const formatMetricValue = (value: string | number) => (typeof value === "number" ? value.toString() : value);

const getWeeklyTableRows = (report?: WeeklyReportResponse) => {
  if (!report?.days?.length) {
    return [];
  }
  return report.days.map((item) => [
    item.date,
    item.consumedCalories,
    item.totalProtein,
    item.totalCarbs,
    item.totalFat,
    report.dailyData?.find((row) => row.day === item.date || row.day === item.date.slice(8))?.water?.toFixed(1) ?? "",
  ]);
};

const getWeeklyInsights = (report?: WeeklyReportResponse) => {
  return report?.insights ?? [];
};

const getMonthlyTableRows = (report?: MonthlyReportResponse) => {
  if (!report?.weeklyAverages?.length) {
    return [];
  }
  return report.weeklyAverages.map((item) => [item.week, item.calories, item.protein, item.carbs, item.fat, item.sleep.toFixed(1)]);
};

const getMonthDateStrings = (year: number, month: number) => {
  const dates: string[] = [];
  const date = new Date(year, month - 1, 1);
  while (date.getMonth() === month - 1) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    dates.push(`${yyyy}-${mm}-${dd}`);
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

const getMonthlyMealLogRows = (report?: MonthlyReportResponse) => {
  const records: Record<string, MealLogItem[]> = {};
  (report?.mealLogs ?? []).forEach((meal) => {
    const date = meal.loggedAt.slice(0, 10);
    records[date] = records[date] || [];
    records[date].push(meal);
  });

  const dateStrings = report ? getMonthDateStrings(report.year, report.month) : [];
  const rows: Array<(string | number)[]> = [];

  dateStrings.forEach((date) => {
    const meals = records[date] ?? [];
    if (meals.length === 0) {
      rows.push([date, "", "", "", "", "", ""]);
      return;
    }

    meals.forEach((meal) => {
      const foods = meal.foods.map((food) => food.name).join(", ");
      const totalCal = meal.totalCalories ?? meal.foods.reduce((sum, food) => sum + food.calories, 0);
      const energy = meal.bodyResponse?.energy ?? "";
      const mode = (meal.bodyResponse as unknown as { mode?: string })?.mode ?? meal.bodyResponse?.mood ?? "";
      const digestion = meal.bodyResponse?.digestion ?? "";
      const mealType = meal.mealType
        ? meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)
        : "";

      rows.push([date, mealType, foods, totalCal, energy, mode, digestion]);
    });
  });

  return rows;
};

const getWeekDateStrings = (weekStartDate: string, weekEndDate: string) => {
  const dates: string[] = [];
  const start = new Date(weekStartDate);
  const end = new Date(weekEndDate);
  const current = new Date(start);

  while (current <= end) {
    const yyyy = current.getFullYear();
    const mm = String(current.getMonth() + 1).padStart(2, "0");
    const dd = String(current.getDate()).padStart(2, "0");
    dates.push(`${yyyy}-${mm}-${dd}`);
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

const getWeeklyMealLogRows = (report?: WeeklyReportResponse) => {
  const records: Record<string, MealLogItem[]> = {};
  (report?.mealLogs ?? []).forEach((meal) => {
    const date = meal.loggedAt.slice(0, 10);
    records[date] = records[date] || [];
    records[date].push(meal);
  });

  const dateStrings = report?.weekStartDate && report?.weekEndDate ? getWeekDateStrings(report.weekStartDate, report.weekEndDate) : [];
  const rows: Array<(string | number)[]> = [];

  dateStrings.forEach((date) => {
    const meals = records[date] ?? [];
    if (meals.length === 0) {
      rows.push([date, "", "", "", "", "", ""]);
      return;
    }

    meals.forEach((meal) => {
      const foods = meal.foods.map((food) => food.name).join(", ");
      const totalCal = meal.totalCalories ?? meal.foods.reduce((sum, food) => sum + food.calories, 0);
      const energy = meal.bodyResponse?.energy ?? "";
      const mode = (meal.bodyResponse as unknown as { mode?: string })?.mode ?? meal.bodyResponse?.mood ?? "";
      const digestion = meal.bodyResponse?.digestion ?? "";
      const mealType = meal.mealType
        ? meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)
        : "";

      rows.push([date, mealType, foods, totalCal, energy, mode, digestion]);
    });
  });

  return rows;
};

const getMonthlyHighlights = (report?: MonthlyReportResponse) => {
  return report?.highlights ?? [];
};

const buildPdfDocument = (options: {
  accentColor: [number, number, number];
  title: string;
  subtitle: string;
  periodLabel: string;
  badgeLabel: string;
  metrics: { label: string; value: string; note: string }[];
  tableHead: string[];
  tableBody: Array<(string | number)[]>;
  additionalTableTitle?: string;
  additionalTableHead?: string[];
  additionalTableBody?: Array<(string | number)[]>;
  summaryText?: string;
  insights: string[];
  footer: string;
  filename: string;
}) => {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const [r, g, b] = options.accentColor;

  doc.setFillColor(r, g, b);
  doc.rect(0, 0, 612, 40, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(options.title, 40, 56);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(options.subtitle, 40, 74);

  doc.setFillColor(r, g, b);
  doc.roundedRect(40, 86, 140, 22, 6, 6, "F");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(options.badgeLabel, 48, 100);

  const metricBoxWidth = 132;
  const metricBoxHeight = 62;
  options.metrics.forEach((metric, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 40 + col * (metricBoxWidth + 16);
    const y = 122 + row * (metricBoxHeight + 12);

    doc.setFillColor(250, 250, 250);
    doc.roundedRect(x, y, metricBoxWidth, metricBoxHeight, 10, 10, "F");
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(x, y, metricBoxWidth, metricBoxHeight, 10, 10, "S");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(45, 55, 72);
    doc.text(metric.label, x + 10, y + 18);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(metric.value, x + 10, y + 38);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(metric.note, x + 10, y + 53);
  });

  const metricRows = Math.ceil(options.metrics.length / 2);
  const tableStartY = 122 + metricRows * (metricBoxHeight + 12) + (options.summaryText ? 32 : 18);
  if (options.summaryText) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text(options.summaryText, 40, tableStartY - 18, { maxWidth: 512 });
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 24, 39);
  doc.text(options.title.includes("Weekly") ? "Daily breakdown" : "Weekly averages", 40, tableStartY - 8);

  autoTable(doc, {
    startY: tableStartY,
    head: [options.tableHead],
    body: options.tableBody,
    theme: "striped",
    styles: {
      fontSize: 9,
      cellPadding: 4,
      halign: "center",
      valign: "middle",
    },
    headStyles: {
      fillColor: [r, g, b],
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 248, 255],
    },
    margin: {
      left: 40,
      right: 40,
    },
  });

  if (options.additionalTableTitle && options.additionalTableHead && options.additionalTableBody) {
    const secondTableY = (doc as any).lastAutoTable?.finalY ? (doc as any).lastAutoTable.finalY + 28 : tableStartY + 18;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(17, 24, 39);
    doc.text(options.additionalTableTitle, 40, secondTableY);

    autoTable(doc, {
      startY: secondTableY + 12,
      head: [options.additionalTableHead],
      body: options.additionalTableBody,
      theme: "striped",
      styles: {
        fontSize: 8,
        cellPadding: 4,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [r, g, b],
        textColor: 255,
      },
      alternateRowStyles: {
        fillColor: [245, 248, 255],
      },
      margin: {
        left: 40,
        right: 40,
      },
    });
  }

  const footerY = 760;
  doc.setDrawColor(218, 220, 224);
  doc.line(40, footerY, 572, footerY);
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text(options.footer, 40, footerY + 14, { maxWidth: 480 });
  doc.text("Page 1", 572, footerY + 14, { align: "right" });

  doc.save(options.filename);
};

const buildMealOnlyPdf = (options: {
  accentColor: [number, number, number];
  title: string;
  subtitle: string;
  badgeLabel: string;
  tableTitle: string;
  tableHead: string[];
  tableBody: Array<(string | number)[]>;
  footer: string;
  filename: string;
}) => {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const [r, g, b] = options.accentColor;

  doc.setFillColor(r, g, b);
  doc.rect(0, 0, 612, 40, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(options.title, 40, 56);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(options.subtitle, 40, 74);

  doc.setFillColor(r, g, b);
  doc.roundedRect(40, 86, 140, 22, 6, 6, "F");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(options.badgeLabel, 48, 100);

  const tableStartY = 140;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 24, 39);
  doc.text(options.tableTitle, 40, tableStartY - 8);

  autoTable(doc, {
    startY: tableStartY,
    head: [options.tableHead],
    body: options.tableBody,
    theme: "striped",
    styles: {
      fontSize: 9,
      cellPadding: 4,
      halign: "center",
      valign: "middle",
    },
    headStyles: {
      fillColor: [r, g, b],
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 248, 255],
    },
    margin: {
      left: 40,
      right: 40,
    },
  });

  const footerY = 760;
  doc.setDrawColor(218, 220, 224);
  doc.line(40, footerY, 572, footerY);
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text(options.footer, 40, footerY + 14, { maxWidth: 480 });
  doc.text("Page 1", 572, footerY + 14, { align: "right" });

  doc.save(options.filename);
};

const buildWeeklyPdf = (report?: WeeklyReportResponse) => {
  const periodLabel = report?.weekStartDate && report?.weekEndDate ? `${report.weekStartDate} – ${report.weekEndDate}` : "Apr 12–19, 2026";

  buildMealOnlyPdf({
    accentColor: [59, 130, 246],
    title: "Weekly Nutrition Report",
    subtitle: "Weekly meal details from your logged data.",
    badgeLabel: periodLabel,
    tableTitle: "Weekly meal log",
    tableHead: ["Date", "Meal", "Food", "Total Cal", "Energy", "Mode", "Digestion"],
    tableBody: getWeeklyMealLogRows(report),
    footer: "PDFs are generated from your logged nutrition data and are shareable with your healthcare provider.",
    filename: "weekly-nutrition-report.pdf",
  });
};

const buildMonthlyPdf = (report?: MonthlyReportResponse) => {
  buildMealOnlyPdf({
    accentColor: [34, 197, 94],
    title: "Monthly Health Summary",
    subtitle: "Monthly meal details from your logged data.",
    badgeLabel: "April 2026",
    tableTitle: "Monthly meal log",
    tableHead: ["Date", "Meal", "Food", "Total Cal", "Energy", "Mode", "Digestion"],
    tableBody: getMonthlyMealLogRows(report),
    footer: "PDFs are generated from your logged nutrition data and are shareable with your healthcare provider.",
    filename: "monthly-health-summary.pdf",
  });
};

export const fetchMonthlyReport = createAsyncThunk<
  MonthlyReportResponse,
  MonthlyReportQuery,
  { rejectValue: string }
>(
  "reports/fetchMonthlyReport",
  async ({ year, month, familyMember = "self" }, { rejectWithValue }) => {
    try {
      const response = await api.get<MonthlyReportResponse>(
        `/logs/month?year=${year}&month=${month}&familyMember=${familyMember}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchWeeklyReport = createAsyncThunk<
  WeeklyReportResponse,
  WeeklyReportQuery,
  { rejectValue: string }
>(
  "reports/fetchWeeklyReport",
  async ({ weekStartDate, weekEndDate, familyMember = "self" }, { rejectWithValue }) => {
    try {
      const response = await api.get<WeeklyReportResponse>(
        `/logs/week?weekStartDate=${weekStartDate}&weekEndDate=${weekEndDate}&familyMember=${familyMember}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const loadWeeklyReportFromState = async (
  weekStartDate: string,
  weekEndDate: string,
  familyMember: string,
  getState: () => unknown
) => {
  const state = getState() as RootState;
  if (
    state.reports.weeklyReport &&
    state.reports.weeklyReport.weekStartDate === weekStartDate &&
    state.reports.weeklyReport.weekEndDate === weekEndDate
  ) {
    return state.reports.weeklyReport;
  }

  const response = await api.get<WeeklyReportResponse>(
    `/logs/week?weekStartDate=${weekStartDate}&weekEndDate=${weekEndDate}&familyMember=${familyMember}`
  );
  return response.data;
};

const loadMonthlyReportFromState = async (
  year: number,
  month: number,
  familyMember: string,
  getState: () => unknown
) => {
  const state = getState() as RootState;
  if (
    state.reports.monthlyReport &&
    state.reports.monthlyReport.year === year &&
    state.reports.monthlyReport.month === month
  ) {
    return state.reports.monthlyReport;
  }

  const response = await api.get<MonthlyReportResponse>(
    `/logs/month?year=${year}&month=${month}&familyMember=${familyMember}`
  );
  return response.data;
};

export const downloadMonthlyReportPdf = createAsyncThunk<
  void,
  MonthlyReportQuery,
  { rejectValue: string }
>(
  "reports/downloadMonthlyReportPdf",
  async ({ year, month, familyMember = "self" }, { rejectWithValue, getState }) => {
    try {
      const report = await loadMonthlyReportFromState(year, month, familyMember, getState);
      buildMonthlyPdf(report);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const downloadWeeklyReportPdf = createAsyncThunk<
  void,
  WeeklyReportQuery,
  { rejectValue: string }
>(
  "reports/downloadWeeklyReportPdf",
  async ({ weekStartDate, weekEndDate, familyMember = "self" }, { rejectWithValue, getState }) => {
    try {
      const report = await loadWeeklyReportFromState(weekStartDate, weekEndDate, familyMember, getState);
      buildWeeklyPdf(report);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
