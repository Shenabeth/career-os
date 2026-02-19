/**
 * Dashboard Page
 * 
 * Main analytics dashboard for authenticated users. Displays:
 * - Application statistics (total, by status)
 * - Interview metrics (upcoming, completed)
 * - Response rate analysis
 * - Pie chart of applications by status
 * - Bar chart of applications over time
 * 
 * Protected route - redirects unauthenticated users to login.
 */

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useApplications } from "../contexts/ApplicationContext";
import { Navbar } from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Briefcase, Calendar, CheckCircle, XCircle, TrendingUp, Clock } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { applications } = useApplications();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Calculate statistics
  const totalApplications = applications.length;
  const interviews = applications.filter(app => app.status === "interview").length;
  const offers = applications.filter(app => app.status === "offer").length;
  const rejections = applications.filter(app => app.status === "rejected").length;
  const applied = applications.filter(app => app.status === "applied").length;
  
  // Response rate (applications that moved past "applied" status)
  const responded = interviews + offers + rejections;
  const responseRate = totalApplications > 0 ? Math.round((responded / totalApplications) * 100) : 0;

  // Data for status chart
  const statusData = [
    { name: "Applied", value: applied, color: "#3b82f6" },
    { name: "Interview", value: interviews, color: "#8b5cf6" },
    { name: "Offer", value: offers, color: "#10b981" },
    { name: "Rejected", value: rejections, color: "#ef4444" },
  ].filter(item => item.value > 0);

  // Recent activity
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "interview": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "offer": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "rejected": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl mb-2 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your job search progress and insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl dark:text-white">{totalApplications}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl dark:text-white">{interviews}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Offers</CardTitle>
              <CheckCircle className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl dark:text-white">{offers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Rejections</CardTitle>
              <XCircle className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl dark:text-white">{rejections}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl dark:text-white">{responseRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statusData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300 dark:stroke-slate-600" />
                    <XAxis 
                      dataKey="name" 
                      className="fill-slate-500 dark:fill-slate-400" 
                      tick={{ fontSize: 14 }}
                    />
                    <YAxis 
                      className="fill-slate-500 dark:fill-slate-400" 
                      tick={{ fontSize: 14 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        padding: '8px 12px'
                      }}
                      labelStyle={{ color: 'hsl(var(--popover-foreground))', fontWeight: 600, marginBottom: '4px' }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                      cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} activeBar={{ opacity: 0.8 }}>
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-500 dark:text-slate-400">
                  No applications yet. Add your first application to see insights!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        padding: '8px 12px'
                      }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-500">
                  No applications yet. Add your first application to see insights!
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    onClick={() => navigate(`/applications/${app.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                        {app.company.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{app.role}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{app.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Clock className="h-4 w-4" />
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                <p>No applications yet. Start by adding your first application!</p>
              </div>
            )}
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
