/**
 * Application Detail Page
 * 
 * Displays comprehensive information for a single job application, including:
 * - Company info, role, location, salary range
 * - Application status and dates
 * - Job posting and company website links
 * - Notes and custom details
 * - Timeline of all associated interviews
 * - Edit application or add new interview rounds
 * 
 * Protected route - accessible only after clicking on an application from the Applications page.
 */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useApplications } from "../contexts/ApplicationContext";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, Building2, MapPin, DollarSign, Calendar, ExternalLink, Pencil, Plus } from "lucide-react";
import { EditApplicationDialog } from "../components/EditApplicationDialog";
import { AddInterviewDialog } from "../components/AddInterviewDialog";
import { InterviewTimeline } from "../components/InterviewTimeline";

export function ApplicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getApplicationById, getInterviewsByApplicationId } = useApplications();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddInterviewOpen, setIsAddInterviewOpen] = useState(false);

  const application = getApplicationById(id!);
  const interviews = getInterviewsByApplicationId(id!);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl mb-4">Application not found</h1>
            <Button onClick={() => navigate("/applications")}>
              Back to Applications
            </Button>
          </div>
        </main>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/applications")}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl mb-2 dark:text-white">{application.role}</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">{application.company}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusBadgeClasses(application.status)}>
                {getStatusLabel(application.status)}
              </Badge>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(true)}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Company</p>
                      <p className="dark:text-slate-200">{application.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
                      <p className="dark:text-slate-200">{application.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Date Applied</p>
                      <p className="dark:text-slate-200">{new Date(application.appliedDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {application.salaryRange && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Salary Range</p>
                        <p className="dark:text-slate-200">{application.salaryRange}</p>
                      </div>
                    </div>
                  )}
                </div>

                {(application.jobPostingUrl || application.companyWebsite) && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      {application.jobPostingUrl && (
                        <a
                          href={application.jobPostingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Job Posting
                        </a>
                      )}
                      {application.companyWebsite && (
                        <a
                          href={application.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Company Website
                        </a>
                      )}
                    </div>
                  </>
                )}

                {application.notes && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Notes</p>
                      <p className="whitespace-pre-wrap dark:text-slate-200">{application.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Interview Timeline */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Interview Timeline</CardTitle>
                <Button
                  size="sm"
                  onClick={() => setIsAddInterviewOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Interview
                </Button>
              </CardHeader>
              <CardContent>
                {interviews.length > 0 ? (
                  <InterviewTimeline interviews={interviews} />
                ) : (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <p>No interviews recorded yet</p>
                    <Button
                      variant="link"
                      onClick={() => setIsAddInterviewOpen(true)}
                      className="mt-2"
                    >
                      Add your first interview
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit Application
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => setIsAddInterviewOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Interview
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Total Interviews</p>
                  <p className="text-2xl dark:text-white">{interviews.length}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Days Since Applied</p>
                  <p className="text-2xl dark:text-white">
                    {Math.floor(
                      (new Date().getTime() - new Date(application.appliedDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {isEditDialogOpen && (
        <EditApplicationDialog
          application={application}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}

      <AddInterviewDialog
        applicationId={application.id}
        open={isAddInterviewOpen}
        onOpenChange={setIsAddInterviewOpen}
      />

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-800 dark:border-slate-700 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>© 2026 CareerOS. Built by <a href="https://shenabeth.github.io/" className="text-blue-600 dark:text-blue-400 underline hover:opacity-80">Shenabeth Jenkins</a> with React and designed for job seekers.</p>
        </div>
      </footer>
    </div>
  );
}
