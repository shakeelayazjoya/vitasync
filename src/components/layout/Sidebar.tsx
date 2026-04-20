/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, UtensilsCrossed, Clock, BarChart3, Bot,
  Users, FileText, Settings, ClipboardList, LogOut, ChevronLeft, Dna, X, Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import whitelogo from "../../../public/nutrisynclogo.png";


const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Log Meal", path: "/log-meal", icon: UtensilsCrossed },
  { label: "My Meals", path: "/my-meals", icon: ClipboardList },
  { label: "Family Meals", path: "/family-meals", icon: Dna },
  { label: "History", path: "/history", icon: Clock },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
  { label: "AI Coach", path: "/ai-coach", icon: Bot },
  { label: "Calculator", path: "/calculator", icon: Calculator },
  { label: "Add Family", path: "/family", icon: Users },
  { label: "Reports", path: "/reports", icon: FileText },
  { label: "Settings", path: "/settings", icon: Settings },
];

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-dark text-dark-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
         <img src={whitelogo} alt="NutriSyncLogo" className="h-10 w-auto" />
        {onClose && (
          <Button variant="ghost" size="icon" className="ml-auto text-dark-foreground/60 hover:text-dark-foreground" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-dark-foreground/60 hover:text-dark-foreground hover:bg-dark-card"
              }`}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
              {user?.name?.split(" ").map((n) => n[0]).join("") || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/40 text-primary">
              {user?.plan || "Free"}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-dark-foreground/50 hover:text-destructive hover:bg-destructive/10"
          onClick={() => { logout(); onClose?.(); }}
        >
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-60 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-60 border-none">
          <SidebarContent onClose={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Mobile trigger rendered in TopBar */}
    </>
  );
};

export { Sidebar, navItems };
export default Sidebar;
