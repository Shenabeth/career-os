/**
 * Main Application Root Component
 * 
 * Sets up the core providers and routing for the entire application:
 * - AuthProvider: Manages user authentication state
 * - ApplicationProvider: Manages job applications and interviews data
 * - NotificationProvider: Manages notification history and toast system
 * - RouterProvider: Handles client-side routing
 * - Toaster: Displays notifications to the user
 */

import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ApplicationProvider } from "./contexts/ApplicationContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <NotificationProvider>
          <ApplicationProvider>
            <RouterProvider router={router} />
            <Toaster />
          </ApplicationProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
