import React, { createContext, useContext, useState, useEffect } from "react";

export type ApplicationStatus = "applied" | "interview" | "offer" | "rejected";

export interface Interview {
  id: string;
  applicationId: string;
  roundType: string;
  date: string;
  notes: string;
  outcome: string;
}

export interface Application {
  id: string;
  userId: string;
  company: string;
  role: string;
  location: string;
  salaryRange?: string;
  status: ApplicationStatus;
  appliedDate: string;
  jobPostingUrl?: string;
  companyWebsite?: string;
  notes?: string;
  createdAt: string;
}

interface ApplicationContextType {
  applications: Application[];
  interviews: Interview[];
  addApplication: (application: Omit<Application, "id" | "userId" | "createdAt">) => void;
  updateApplication: (id: string, application: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  addInterview: (interview: Omit<Interview, "id">) => void;
  updateInterview: (id: string, interview: Partial<Interview>) => void;
  deleteInterview: (id: string) => void;
  getApplicationById: (id: string) => Application | undefined;
  getInterviewsByApplicationId: (applicationId: string) => Interview[];
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

// Mock data for demo
const demoApplications: Application[] = [
  {
    id: "1",
    userId: "demo",
    company: "Google",
    role: "Senior Software Engineer",
    location: "Mountain View, CA",
    salaryRange: "$180k - $250k",
    status: "interview",
    appliedDate: "2026-02-10",
    jobPostingUrl: "https://careers.google.com",
    companyWebsite: "https://google.com",
    notes: "Great team culture, exciting project on cloud infrastructure",
    createdAt: "2026-02-10T10:00:00Z",
  },
  {
    id: "2",
    userId: "demo",
    company: "Meta",
    role: "Frontend Engineer",
    location: "Menlo Park, CA",
    salaryRange: "$160k - $220k",
    status: "applied",
    appliedDate: "2026-02-12",
    jobPostingUrl: "https://metacareers.com",
    companyWebsite: "https://meta.com",
    notes: "Working on React core team",
    createdAt: "2026-02-12T14:30:00Z",
  },
  {
    id: "3",
    userId: "demo",
    company: "Amazon",
    role: "Full Stack Developer",
    location: "Seattle, WA",
    salaryRange: "$150k - $200k",
    status: "interview",
    appliedDate: "2026-02-05",
    companyWebsite: "https://amazon.com",
    notes: "AWS team, hybrid work model",
    createdAt: "2026-02-05T09:15:00Z",
  },
  {
    id: "4",
    userId: "demo",
    company: "Stripe",
    role: "Software Engineer",
    location: "San Francisco, CA",
    salaryRange: "$170k - $230k",
    status: "offer",
    appliedDate: "2026-01-28",
    jobPostingUrl: "https://stripe.com/jobs",
    companyWebsite: "https://stripe.com",
    notes: "Offer received! Need to respond by March 1st",
    createdAt: "2026-01-28T11:20:00Z",
  },
  {
    id: "5",
    userId: "demo",
    company: "Netflix",
    role: "Senior Backend Engineer",
    location: "Los Gatos, CA",
    salaryRange: "$190k - $260k",
    status: "rejected",
    appliedDate: "2026-01-20",
    companyWebsite: "https://netflix.com",
    notes: "Rejected after phone screen",
    createdAt: "2026-01-20T16:45:00Z",
  },
  {
    id: "6",
    userId: "demo",
    company: "Airbnb",
    role: "Product Engineer",
    location: "Remote",
    salaryRange: "$165k - $210k",
    status: "applied",
    appliedDate: "2026-02-15",
    jobPostingUrl: "https://careers.airbnb.com",
    companyWebsite: "https://airbnb.com",
    notes: "Fully remote position",
    createdAt: "2026-02-15T13:00:00Z",
  },
];

const demoInterviews: Interview[] = [
  {
    id: "1",
    applicationId: "1",
    roundType: "Phone Screen",
    date: "2026-02-14",
    notes: "Discussed system design and past projects. Went well!",
    outcome: "Passed",
  },
  {
    id: "2",
    applicationId: "1",
    roundType: "Technical Interview",
    date: "2026-02-17",
    notes: "Coding challenge on algorithms. Need to wait for feedback.",
    outcome: "Pending",
  },
  {
    id: "3",
    applicationId: "3",
    roundType: "Phone Screen",
    date: "2026-02-08",
    notes: "Behavioral questions and experience review",
    outcome: "Passed",
  },
  {
    id: "4",
    applicationId: "3",
    roundType: "Onsite - Technical",
    date: "2026-02-16",
    notes: "4 rounds of technical interviews. Challenging but interesting.",
    outcome: "Pending",
  },
  {
    id: "5",
    applicationId: "4",
    roundType: "Phone Screen",
    date: "2026-02-01",
    notes: "Initial screening call",
    outcome: "Passed",
  },
  {
    id: "6",
    applicationId: "4",
    roundType: "Technical Interview",
    date: "2026-02-05",
    notes: "Live coding session",
    outcome: "Passed",
  },
  {
    id: "7",
    applicationId: "4",
    roundType: "Team Interview",
    date: "2026-02-10",
    notes: "Met with the team, great culture fit",
    outcome: "Passed",
  },
];

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const storedUser = localStorage.getItem("offertrack_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      
      // Load applications
      const storedApps = localStorage.getItem(`offertrack_applications_${user.id}`);
      if (storedApps) {
        setApplications(JSON.parse(storedApps));
      } else if (user.id === "demo") {
        // Load demo data for demo user
        setApplications(demoApplications);
      }

      // Load interviews
      const storedInterviews = localStorage.getItem(`offertrack_interviews_${user.id}`);
      if (storedInterviews) {
        setInterviews(JSON.parse(storedInterviews));
      } else if (user.id === "demo") {
        setInterviews(demoInterviews);
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage when data changes
    const storedUser = localStorage.getItem("offertrack_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      localStorage.setItem(`offertrack_applications_${user.id}`, JSON.stringify(applications));
      localStorage.setItem(`offertrack_interviews_${user.id}`, JSON.stringify(interviews));
    }
  }, [applications, interviews]);

  const addApplication = (application: Omit<Application, "id" | "userId" | "createdAt">) => {
    const storedUser = localStorage.getItem("offertrack_user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const newApp: Application = {
      ...application,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    setApplications((prev) => [...prev, newApp]);
  };

  const updateApplication = (id: string, updates: Partial<Application>) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updates } : app))
    );
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    setInterviews((prev) => prev.filter((interview) => interview.applicationId !== id));
  };

  const addInterview = (interview: Omit<Interview, "id">) => {
    const newInterview: Interview = {
      ...interview,
      id: Date.now().toString(),
    };
    setInterviews((prev) => [...prev, newInterview]);
  };

  const updateInterview = (id: string, updates: Partial<Interview>) => {
    setInterviews((prev) =>
      prev.map((interview) => (interview.id === id ? { ...interview, ...updates } : interview))
    );
  };

  const deleteInterview = (id: string) => {
    setInterviews((prev) => prev.filter((interview) => interview.id !== id));
  };

  const getApplicationById = (id: string) => {
    return applications.find((app) => app.id === id);
  };

  const getInterviewsByApplicationId = (applicationId: string) => {
    return interviews.filter((interview) => interview.applicationId === applicationId);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        interviews,
        addApplication,
        updateApplication,
        deleteApplication,
        addInterview,
        updateInterview,
        deleteInterview,
        getApplicationById,
        getInterviewsByApplicationId,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useApplications must be used within an ApplicationProvider");
  }
  return context;
}
