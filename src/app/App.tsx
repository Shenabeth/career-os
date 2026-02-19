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
