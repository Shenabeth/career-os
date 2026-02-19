/**
 * Main Application Root Component
 * 
 * Sets up the core providers and routing for the entire application:
 * - AuthProvider: Manages user authentication state
 * - ApplicationProvider: Manages job applications and interviews data
 * - RouterProvider: Handles client-side routing
 * - Toaster: Displays notifications to the user
 */

import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ApplicationProvider } from "./contexts/ApplicationContext";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ApplicationProvider>
    </AuthProvider>
  );
}

export default App;
