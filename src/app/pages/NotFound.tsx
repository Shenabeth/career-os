/**
 * 404 Not Found Page
 * 
 * Displayed when users navigate to a route that doesn't exist.
 * Provides a user-friendly message and navigation back to the home page.
 */

import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="text-center flex-1 flex items-center justify-center p-4">
        <div>
          <h1 className="text-6xl mb-4">404</h1>
          <h2 className="text-2xl mb-4">Page Not Found</h2>
          <p className="text-slate-600 mb-8">
            The page you're looking for doesn't exist.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Go Home
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>© 2026 CareerOS. Built by Shenabeth Jenkins with React and designed for job seekers.</p>
        </div>
      </footer>
    </div>
  );
}
