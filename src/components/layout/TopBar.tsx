import { useLocation } from "react-router-dom";
import { Bell, Menu, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/utils/formatters";
import { navItems } from "./Sidebar";
import { NavLink } from "react-router-dom";
import { Dna, LogOut, Settings, User, X } from "lucide-react";
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/log-meal": "Log Meal",
  "/history": "History",
  "/analytics": "Analytics",
  "/ai-coach": "AI Coach",
  "/calculator": "Calculator",
  "/family": "Family",
  "/reports": "Reports",
  "/settings": "Settings",
};

const TopBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = pageTitles[location.pathname] || "VitaSync";

  return (
    <header className="fixed top-0 right-0 left-0 md:left-60 h-16 bg-card border-b border-border z-30 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-60 border-none">
            <div className="flex flex-col h-full bg-dark text-dark-foreground">
              <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
                <Dna className="h-7 w-7 text-primary" />
                <span className="text-lg font-bold">VitaSync</span>
                <Button variant="ghost" size="icon" className="ml-auto text-dark-foreground/60" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-dark-foreground/60 hover:text-dark-foreground hover:bg-dark-card"
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-bold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatDate()}
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                  {user?.name?.split(" ").map((n) => n[0]).join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium">{user?.name?.split(" ")[0]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem><User className="h-4 w-4 mr-2" /> Profile</DropdownMenuItem>
            <DropdownMenuItem><Settings className="h-4 w-4 mr-2" /> Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
