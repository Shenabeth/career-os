/**
 * Edit Application Dialog Component
 * 
 * Modal dialog for editing an existing job application. Allows updating:
 * - Company, role, location, salary range
 * - Application date and status
 * - Job posting URL and company website
 * - Additional notes and details
 * 
 * Used on the Application Detail page. Pre-fills form with current application data.
 * Saves changes to context/localStorage on submit.
 */

import { useState } from "react";
import { useApplications, Application, ApplicationStatus } from "../contexts/ApplicationContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

interface EditApplicationDialogProps {
  application: Application;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditApplicationDialog({ application, open, onOpenChange }: EditApplicationDialogProps) {
  const { updateApplication } = useApplications();
  const [company, setCompany] = useState(application.company);
  const [role, setRole] = useState(application.role);
  const [location, setLocation] = useState(application.location);
  const [salaryRange, setSalaryRange] = useState(application.salaryRange || "");
  const [status, setStatus] = useState<ApplicationStatus>(application.status);
  const [appliedDate, setAppliedDate] = useState(application.appliedDate);
  const [jobPostingUrl, setJobPostingUrl] = useState(application.jobPostingUrl || "");
  const [companyWebsite, setCompanyWebsite] = useState(application.companyWebsite || "");
  const [notes, setNotes] = useState(application.notes || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateApplication(application.id, {
      company,
      role,
      location,
      salaryRange: salaryRange || undefined,
      status,
      appliedDate,
      jobPostingUrl: jobPostingUrl || undefined,
      companyWebsite: companyWebsite || undefined,
      notes: notes || undefined,
    });

    toast.success("Application updated successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>
            Update details about your job application
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryRange">Salary Range</Label>
              <Input
                id="salaryRange"
                placeholder="e.g., $100k - $150k"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as ApplicationStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="appliedDate">Date Applied *</Label>
              <Input
                id="appliedDate"
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobPostingUrl">Job Posting URL</Label>
            <Input
              id="jobPostingUrl"
              type="url"
              placeholder="https://..."
              value={jobPostingUrl}
              onChange={(e) => setJobPostingUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyWebsite">Company Website</Label>
            <Input
              id="companyWebsite"
              type="url"
              placeholder="https://..."
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this application..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
