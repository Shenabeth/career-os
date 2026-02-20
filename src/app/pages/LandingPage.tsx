/**
 * Landing Page
 * 
 * Public page displayed to unauthenticated users. Showcases CareerOS features,
 * benefits, and provides navigation to login/signup. Includes hero section,
 * feature highlights, how-it-works guide, and call-to-action buttons.
 */

import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Briefcase, BarChart3, CheckCircle, Users, ClipboardList } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl dark:text-white">CareerOS</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl mb-6 max-w-3xl mx-auto dark:text-white">
          Track Your Job Applications With Confidence
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Stay organized throughout your job search. Manage applications, track interviews, 
          and analyze your progress all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate("/signup")}>
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Try Demo Account
          </Button>
        </div>
        {/* <p className="text-sm text-slate-500 mt-4">
          Demo credentials: demo@offertrack.com / demo123
        </p> */}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl text-center mb-12 dark:text-white">Everything You Need to Land Your Dream Job</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-6">
              <ClipboardList className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-2" />
              <CardTitle>Application Tracking</CardTitle>
              <CardDescription>
                Organize all your job applications in one place with detailed information and notes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-6">
              <Users className="h-10 w-10 text-green-600 dark:text-green-400 mb-2" />
              <CardTitle>Interview Management</CardTitle>
              <CardDescription>
                Track interview rounds, add notes, and monitor your progress through each stage
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-6">
              <BarChart3 className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-2" />
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Visualize your job search with insights on applications, response rates, and trends
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-6">
              <CheckCircle className="h-10 w-10 text-orange-600 dark:text-orange-400 mb-2" />
              <CardTitle>Status Updates</CardTitle>
              <CardDescription>
                Keep track of where each application stands from applied to offer received
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl text-center mb-12 dark:text-white">Simple, Yet Powerful</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xl mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl mb-2 dark:text-white">Add Applications</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Quickly add job applications with company details, role, and salary information
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xl mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl mb-2 dark:text-white">Track Progress</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Update status as you move through the process and log interview details
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xl mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl mb-2 dark:text-white">Get Insights</h3>
            <p className="text-slate-600 dark:text-slate-400">
              View analytics on your job search and optimize your application strategy
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Ready to Get Started?</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Join thousands of job seekers who are taking control of their job search!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/signup")}
            >
              Create Free Account
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-800 dark:border-slate-700 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>© 2026 CareerOS. Built by <a href="https://shenabeth.github.io/" className="text-blue-600 dark:text-blue-400 underline hover:opacity-80">Shenabeth Jenkins</a> with React and designed for job seekers.</p>
        </div>
      </footer>
    </div>
  );
}
