import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { Dashboard } from "./pages/Dashboard";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { ApplicationDetailPage } from "./pages/ApplicationDetailPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "dashboard", Component: Dashboard },
      { path: "applications", Component: ApplicationsPage },
      { path: "applications/:id", Component: ApplicationDetailPage },
      { path: "settings", Component: SettingsPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
