/**
 * Navigation Bar Component
 * 
 * Two-row horizontal navigation bar displayed at the top of authenticated pages:
 * - Top row: CareerOS branding, notification bell, user profile, settings, logout
 * - Bottom row: Navigation links to Dashboard and Applications
 * 
 * Sticky positioned for easy access while scrolling.
 */

import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Briefcase, LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";
import { useNotifications } from "../contexts/NotificationContext";
import { NotificationCenter } from "./NotificationCenter";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addNotification } = useNotifications();

  const handleLogout = () => {
    logout();
    addNotification("info", "Logged out", "You've been successfully logged out.");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-white dark:bg-slate-900 dark:border-slate-700 sticky top-0 z-50">
      {/* Top Row - Logo, Notifications, User Actions */}
      <div className="border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-semibold dark:text-white">CareerOS</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {user?.name}
                </span>
              </div>

              <NotificationCenter />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/settings")}
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout} 
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Navigation Links */}
      <div className="bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 h-12">
            <Button
              variant={isActive("/dashboard") ? "secondary" : "ghost"}
              onClick={() => navigate("/dashboard")}
              className={`gap-2 ${
                isActive("/dashboard") 
                  ? "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600" 
                  : ""
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={isActive("/applications") ? "secondary" : "ghost"}
              onClick={() => navigate("/applications")}
              className={`gap-2 ${
                isActive("/applications") 
                  ? "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600" 
                  : ""
              }`}
            >
              <FileText className="h-4 w-4" />
              Applications
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
