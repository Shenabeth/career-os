/**
 * Applications Page
 * 
 * Displays all job applications in a searchable table with filtering capabilities.
 * Users can:
 * - Search applications by company name
 * - Filter by application status (Applied, Interview, Offer, Rejected)
 * - Add new applications via dialog
 * - Edit or delete existing applications
 * - Click on an application to view full details
 * 
 * Protected route - redirects unauthenticated users to login.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useApplications, Application } from "../contexts/ApplicationContext";
import { useNotifications } from "../contexts/NotificationContext";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { AddApplicationDialog } from "../components/AddApplicationDialog";
import { EditApplicationDialog } from "../components/EditApplicationDialog";

export function ApplicationsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { applications, deleteApplication } = useApplications();
  const { addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Filter and search applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-transparent";
      case "interview":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border-transparent";
      case "offer":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 border-transparent";
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 border-transparent";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300 border-transparent";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleDelete = (id: string, company: string) => {
    if (confirm(`Are you sure you want to delete the application for ${company}?`)) {
      deleteApplication(id);
      addNotification("success", "Application deleted", `${company} has been removed from your applications.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl mb-2 dark:text-white">Applications</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage all your job applications in one place</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Application
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by company, role, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applications Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
          {filteredApplications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow
                    key={app.id}
                    className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 dark:border-slate-700"
                    onClick={() => navigate(`/applications/${app.id}`)}
                  >
                    <TableCell className="dark:text-slate-200">{app.company}</TableCell>
                    <TableCell className="dark:text-slate-200">{app.role}</TableCell>
                    <TableCell className="dark:text-slate-300">{app.location}</TableCell>
                    <TableCell className="dark:text-slate-300">{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClasses(app.status)}>
                        {getStatusLabel(app.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingApplication(app);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(app.id, app.company);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <p>No applications found</p>
              {applications.length === 0 && (
                <Button
                  variant="link"
                  onClick={() => setIsAddDialogOpen(true)}
                  className="mt-2"
                >
                  Add your first application
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      <AddApplicationDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />

      {editingApplication && (
        <EditApplicationDialog
          application={editingApplication}
          open={!!editingApplication}
          onOpenChange={(open) => !open && setEditingApplication(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-800 dark:border-slate-700 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>© 2026 CareerOS. Built by Shenabeth Jenkins with React and designed for job seekers.</p>
        </div>
      </footer>
    </div>
  );
}
