import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { User, Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function SettingsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

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

      toast.success("Account deleted successfully");
      logout();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Settings</h1>
          <p className="text-slate-600">Manage your account settings and preferences</p>
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
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <User className="h-4 w-4 text-slate-500" />
                <span>{user.name}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Mail className="h-4 w-4 text-slate-500" />
                <span>{user.email}</span>
              </div>
            </div>

            <p className="text-sm text-slate-500">
              Profile editing is not available in the demo version.
            </p>
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
                <p className="text-sm text-slate-600 mb-4">
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
                <h4 className="font-medium mb-2">Delete Account</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Permanently delete your account and all associated data. This action cannot be
                  undone.
                </p>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
