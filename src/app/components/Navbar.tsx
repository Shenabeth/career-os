/**
 * Navigation Bar Component
 * 
 * Horizontal navigation bar displayed at the top of authenticated pages.
 * Shows navigation links to Dashboard and Applications, user profile name,
 * settings button, and logout button. Includes CareerOS branding.
 */

import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Briefcase, LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-blue-600" />
              <span className="text-xl">CareerOS</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/applications")}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Applications
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-slate-600">
              {user?.name}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
