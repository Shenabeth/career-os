/**
 * Interview Timeline Component
 * 
 * Displays a chronological timeline of all interview rounds for a single application.
 * Shows:
 * - Interview date, round type, and outcome status
 * - Visual indicators (icons) for passed/failed/pending outcomes
 * - Interview notes and feedback
 * 
 * Used on the Application Detail page to visualize interview progression.
 * Interviews are sorted chronologically by date.
 */

import { Interview } from "../contexts/ApplicationContext";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

interface InterviewTimelineProps {
  interviews: Interview[];
}

export function InterviewTimeline({ interviews }: InterviewTimelineProps) {
  const sortedInterviews = [...interviews].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome.toLowerCase()) {
      case "passed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-slate-400" />;
      default:
        return <Clock className="h-5 w-5 text-blue-600" />;
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
            <div className={`w-10 h-10 rounded-full border-2 ${getOutcomeColor(interview.outcome)} bg-white flex items-center justify-center`}>
              {getOutcomeIcon(interview.outcome)}
            </div>
            {index < sortedInterviews.length - 1 && (
              <div className="w-0.5 h-full bg-slate-200 mt-2" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-8">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium">{interview.roundType}</h4>
                <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(interview.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                interview.outcome.toLowerCase() === "passed"
                  ? "bg-green-100 text-green-700"
                  : interview.outcome.toLowerCase() === "failed"
                  ? "bg-red-100 text-red-700"
                  : interview.outcome.toLowerCase() === "cancelled"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {interview.outcome}
              </span>
            </div>
            {interview.notes && (
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{interview.notes}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
