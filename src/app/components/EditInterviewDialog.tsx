/**
 * Edit Interview Dialog Component
 * 
 * Modal dialog for editing existing interview rounds.
 * Allows updating:
 * - Interview round type (Phone Screen, Technical, Team Interview, etc.)
 * - Interview date
 * - Interview outcome (Passed, Failed, Pending, etc.)
 * - Interview notes and feedback
 * 
 * Used on the Application Detail page. Updates interview data in context/localStorage.
 */

import { useState, useEffect } from "react";
import { useApplications, Interview } from "../contexts/ApplicationContext";
import { useNotifications } from "../contexts/NotificationContext";
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

interface EditInterviewDialogProps {
  interview: Interview;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditInterviewDialog({ interview, open, onOpenChange }: EditInterviewDialogProps) {
  const { updateInterview } = useApplications();
  const { addNotification } = useNotifications();
  const [roundType, setRoundType] = useState(interview.roundType);
  const [date, setDate] = useState(interview.date);
  const [notes, setNotes] = useState(interview.notes);
  const [outcome, setOutcome] = useState(interview.outcome);

  useEffect(() => {
    setRoundType(interview.roundType);
    setDate(interview.date);
    setNotes(interview.notes);
    setOutcome(interview.outcome);
  }, [interview]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateInterview(interview.id, {
      roundType,
      date,
      notes,
      outcome,
    });

    addNotification("success", "Interview updated!", `${roundType} details have been saved.`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Interview</DialogTitle>
          <DialogDescription>
            Update details about this interview round
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roundType">Interview Round *</Label>
            <Select value={roundType} onValueChange={setRoundType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select round type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                <SelectItem value="Technical Interview">Technical Interview</SelectItem>
                <SelectItem value="Coding Challenge">Coding Challenge</SelectItem>
                <SelectItem value="System Design">System Design</SelectItem>
                <SelectItem value="Behavioral Interview">Behavioral Interview</SelectItem>
                <SelectItem value="Team Interview">Team Interview</SelectItem>
                <SelectItem value="Hiring Manager">Hiring Manager</SelectItem>
                <SelectItem value="Onsite">Onsite</SelectItem>
                <SelectItem value="Final Round">Final Round</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="outcome">Outcome *</Label>
            <Select value={outcome} onValueChange={setOutcome}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Passed">Passed</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add notes about this interview..."
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
