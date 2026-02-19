/**
 * Interview Timeline Component
 * 
 * Displays a chronological timeline of all interview rounds for a single application.
 * Shows:
 * - Interview date, round type, and outcome status
 * - Visual indicators (icons) for passed/failed/pending outcomes
 * - Interview notes and feedback
 * - Edit and delete buttons for each interview
 * 
 * Used on the Application Detail page to visualize interview progression.
 * Interviews are sorted chronologically by date.
 */

import { useState } from "react";
import { Interview, useApplications } from "../contexts/ApplicationContext";
import { useNotifications } from "../contexts/NotificationContext";
import { Calendar, CheckCircle, XCircle, Clock, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { EditInterviewDialog } from "./EditInterviewDialog";

interface InterviewTimelineProps {
  interviews: Interview[];
}

export function InterviewTimeline({ interviews }: InterviewTimelineProps) {
  const { deleteInterview } = useApplications();
  const { addNotification } = useNotifications();
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  const sortedInterviews = [...interviews].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleDelete = (id: string, roundType: string) => {
    if (confirm(`Are you sure you want to delete the ${roundType} interview?`)) {
      deleteInterview(id);
      addNotification("success", "Interview deleted", `${roundType} has been removed from your timeline.`);
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome.toLowerCase()) {
      case "passed":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-slate-400" />;
      default:
        return <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome.toLowerCase()) {
      case "passed":
        return "border-green-600";
      case "failed":
        return "border-red-600";
      case "cancelled":
        return "border-slate-400";
      default:
        return "border-blue-600";
    }
  };

  return (
    <div className="space-y-6">
      {sortedInterviews.map((interview, index) => (
        <div key={interview.id} className="flex gap-4">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full border-2 ${getOutcomeColor(interview.outcome)} bg-white dark:bg-slate-800 flex items-center justify-center`}>
              {getOutcomeIcon(interview.outcome)}
            </div>
            {index < sortedInterviews.length - 1 && (
              <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 mt-2" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-8">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium dark:text-white">{interview.roundType}</h4>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(interview.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  interview.outcome.toLowerCase() === "passed"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : interview.outcome.toLowerCase() === "failed"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    : interview.outcome.toLowerCase() === "cancelled"
                    ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                }`}>
                  {interview.outcome}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingInterview(interview)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(interview.id, interview.roundType)}
                >
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </Button>
              </div>
            </div>
            {interview.notes && (
              <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{interview.notes}</p>
            )}
          </div>
        </div>
      ))}

      {editingInterview && (
        <EditInterviewDialog
          interview={editingInterview}
          open={!!editingInterview}
          onOpenChange={(open) => !open && setEditingInterview(null)}
        />
      )}
    </div>
  );
}
