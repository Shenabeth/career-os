import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
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
  );
}
