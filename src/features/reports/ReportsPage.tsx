import { useEffect } from "react";
import { Download, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/shared/PageHeader";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  downloadMonthlyReportPdf,
  downloadWeeklyReportPdf,
  fetchMonthlyReport,
  fetchWeeklyReport,
} from "@/redux/thunks/reports";

const ReportsPage = () => {
  const dispatch = useAppDispatch();
  const {
    monthlyReport,
    weeklyReport,
    isMonthlyLoading,
    isWeeklyLoading,
    isMonthlyDownloading,
    isWeeklyDownloading,
    monthlyError,
    weeklyError,
    monthlyDownloadError,
    weeklyDownloadError,
  } = useAppSelector((state) => state.reports);

  useEffect(() => {
    dispatch(fetchWeeklyReport({ weekStartDate: "2026-04-12", weekEndDate: "2026-04-19" }));
    dispatch(fetchMonthlyReport({ year: 2026, month: 4 }));
  }, [dispatch]);

  type ReportCardVariant = "default" | "secondary" | "destructive" | "outline";
  type ReportCard = {
    id: string;
    title: string;
    subtitle: string;
    period: string;
    status: string;
    badgeVariant: ReportCardVariant;
    icon: typeof TrendingUp | typeof Calendar;
    accentClass: string;
    errorMessage: string | null;
    isLoading: boolean;
    isDownloading: boolean;
    downloadErrorMessage: string | null;
    onClick: () => void;
  };

  const reportCards: ReportCard[] = [
    {
      id: "weekly",
      title: "Weekly Nutrition Report",
      subtitle: "See your hydration, calories, and protein progress for the week.",

      period: "Apr 12–19, 2026",
      status: isWeeklyLoading ? "Loading..." : weeklyReport ? "Ready" : weeklyError ? "Error" : "Ready",
      badgeVariant: weeklyError ? "destructive" : "secondary",
      icon: TrendingUp,
      accentClass: "border-blue-500",
      errorMessage: weeklyError,
      isLoading: isWeeklyLoading,
      isDownloading: isWeeklyDownloading,
      downloadErrorMessage: weeklyDownloadError,
      onClick: () => dispatch(downloadWeeklyReportPdf({ weekStartDate: "2026-04-12", weekEndDate: "2026-04-19" })),
    },
    {
      id: "monthly",
      title: "Monthly Health Summary",
      subtitle: "Review your monthly recovery, calories, and activity performance.",
      period: "April 2026",
      status: isMonthlyLoading ? "Loading..." : monthlyReport ? "Ready" : monthlyError ? "Error" : "Ready",
      badgeVariant: monthlyError ? "destructive" : "secondary",
      icon: Calendar,
      accentClass: "border-emerald-500",
      errorMessage: monthlyError,
      isLoading: isMonthlyLoading,
      isDownloading: isMonthlyDownloading,
      downloadErrorMessage: monthlyDownloadError,
      onClick: () => dispatch(downloadMonthlyReportPdf({ year: 2026, month: 4 })),
    },
  ];

  return (
    <div className="space-y-6 py-12">
      <PageHeader title="Reports" description="Download health reports and share with your doctor" />
      <div className="space-y-3">
        {reportCards.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className={`hover:shadow-md transition-shadow border-l-4 ${report.accentClass}`}>
              <CardHeader className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base font-semibold">{report.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{report.subtitle}</p>
                  </div>
                  <Badge variant={report.badgeVariant}>{report.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{report.period}</p>
              </CardHeader>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Icon className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-foreground">{report.status}</p>
                  {report.errorMessage ? (
                    <p className="mt-2 text-xs text-destructive">{report.errorMessage}</p>
                  ) : null}
                  {report.downloadErrorMessage ? (
                    <p className="mt-2 text-xs text-destructive">{report.downloadErrorMessage}</p>
                  ) : null}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={report.isLoading || report.isDownloading}
                  onClick={report.onClick}
                >
                  <Download className="h-4 w-4 mr-1" />
                  {report.isDownloading ? "Generating..." : "Download PDF"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <p className="text-sm text-muted-foreground">
        PDFs are generated based on your logged data and can be shared directly with your healthcare provider.
      </p>
    </div>
  );
};

export default ReportsPage;
