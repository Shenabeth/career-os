/**
 * Root Layout Component
 * 
 * Serves as the main layout wrapper for all routes. Uses React Router's
 * Outlet component to render nested route components. This enables consistent
 * layout structure across all pages while allowing individual routes to define
 * their own content.
 */

import { Outlet } from "react-router";

export function Root() {
  return <Outlet />;
}
