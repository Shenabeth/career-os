/**
 * Settings Page
 * 
 * User account management page with options to:
 * - View current user profile information
 * - Delete user account (with confirmation)
 * - Logout from application
 * 
 * Protected route - redirects unauthenticated users to login.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useNotifications } from "../contexts/NotificationContext";
import { Navbar } from "../components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { User, Mail, Trash2, Pencil, Check, X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

export function SettingsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateUserName } = useAuth();
  const { addNotification } = useNotifications();
  const { theme, setTheme } = useTheme();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const isDemoUser = user.id === "demo";

  const handleEditName = () => {
    setNewName(user.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (newName.trim() && newName !== user.name) {
      const success = updateUserName(newName.trim());
      if (success) {
        addNotification("success", "Name updated successfully!", "Your profile has been updated.");
        setIsEditingName(false);
      } else {
        addNotification("error", "Failed to update name", "Unable to update your profile.");
      }
    } else {
      setIsEditingName(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewName("");
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone and will delete all your applications and data."
      )
    ) {
      // Remove user data from localStorage
      localStorage.removeItem("offertrack_user");
      localStorage.removeItem(`offertrack_applications_${user.id}`);
      localStorage.removeItem(`offertrack_interviews_${user.id}`);

      // Remove from users list
      const usersData = localStorage.getItem("offertrack_users");
      if (usersData) {
        const users = JSON.parse(usersData);
        const filteredUsers = users.filter((u: any) => u.id !== user.id);
        localStorage.setItem("offertrack_users", JSON.stringify(filteredUsers));
      }

      addNotification("success", "Account deleted successfully", "Your account and all data have been removed.");
      logout();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-3xl flex-1">
        <div className="mb-8">
          <h1 className="text-3xl mb-2 dark:text-white">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your account settings and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>View your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter your name"
                    autoFocus
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSaveName}
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="flex-1 dark:text-slate-200">{user.name}</span>
                  {!isDemoUser && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleEditName}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span className="dark:text-slate-200">{user.email}</span>
              </div>
            </div>

            {isDemoUser && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Profile editing is not available for the demo account.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks and feels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Theme</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Choose your preferred color theme
                </p>
                <div className="flex gap-3">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                    className="flex-1 gap-2"
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                    className="flex-1 gap-2"
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    onClick={() => setTheme("system")}
                    className="flex-1 gap-2"
                  >
                    <Monitor className="h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your application data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Storage</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Your data is stored locally in your browser. Clear your browser data to remove
                  all applications and interviews.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 dark:text-white">Delete Account</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Permanently delete your account and all associated data. This action cannot be
                  undone.
                </p>
                {!isDemoUser ? (
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    The demo account cannot be deleted.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-800 dark:border-slate-700 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>© 2026 CareerOS. Built by Shenabeth Jenkins with React and designed for job seekers.</p>
        </div>
      </footer>
    </div>
  );
}
