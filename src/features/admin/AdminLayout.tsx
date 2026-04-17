import { Outlet, NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, Settings, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const adminNav = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-dark text-dark-foreground fixed left-0 top-0 bottom-0">
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
          <Shield className="h-6 w-6 text-warning" />
          <span className="text-lg font-bold">Admin Panel</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {adminNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-warning/10 text-warning border-l-2 border-warning" : "text-dark-foreground/60 hover:text-dark-foreground hover:bg-dark-card"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <NavLink to="/dashboard">
            <Button variant="ghost" size="sm" className="w-full justify-start text-dark-foreground/50 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to App
            </Button>
          </NavLink>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-60">
        <header className="h-16 bg-card border-b border-border flex items-center px-6 sticky top-0 z-30">
          <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
          <Badge className="ml-3 bg-warning/15 text-warning border-0 text-xs">Admin</Badge>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
