import { useState } from "react";
import { useApplications } from "../contexts/ApplicationContext";
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

interface AddInterviewDialogProps {
  applicationId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddInterviewDialog({ applicationId, open, onOpenChange }: AddInterviewDialogProps) {
  const { addInterview } = useApplications();
  const [roundType, setRoundType] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [outcome, setOutcome] = useState("Pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addInterview({
      applicationId,
      roundType,
      date,
      notes,
      outcome,
    });

    toast.success("Interview added successfully!");
    
    // Reset form
    setRoundType("");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
    setOutcome("Pending");
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Interview</DialogTitle>
          <DialogDescription>
            Record details about an interview round
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
            <Button type="submit">Add Interview</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
