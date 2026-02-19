/**
 * Authentication Context & Provider
 * 
 * Manages user authentication state and operations:
 * - User login/signup/logout
 * - Persistent authentication via localStorage
 * - Demo account support (demo@offertrack.com / demo123)
 * - Provides useAuth() hook for accessing auth state throughout the app
 * 
 * Demo Account Protections:
 * - Demo user cannot be modified (name, email, password)
 * - Demo user cannot be deleted
 * - Demo email cannot be used for new account signup
 * - Demo data is cleared from localStorage on each login
 * 
 * All user data is stored locally in the browser (no backend).
 */

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserName: (newName: string) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("offertrack_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo account - always use fresh demo user data
    if (email === "demo@offertrack.com" && password === "demo123") {
      const demoUser = { id: "demo", name: "Demo User", email: "demo@offertrack.com" };
      setUser(demoUser);
      localStorage.setItem("offertrack_user", JSON.stringify(demoUser));
      // Clear any accidentally saved demo data
      localStorage.removeItem("offertrack_applications_demo");
      localStorage.removeItem("offertrack_interviews_demo");
      // Trigger user change event
      window.dispatchEvent(new Event("userChange"));
      return true;
    }

    // Mock login - check if user exists in localStorage
    const usersData = localStorage.getItem("offertrack_users");
    const users = usersData ? JSON.parse(usersData) : [];
    
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(userData);
      localStorage.setItem("offertrack_user", JSON.stringify(userData));
      // Trigger user change event
      window.dispatchEvent(new Event("userChange"));
      return true;
    }

    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Prevent signup with demo email
    if (email === "demo@offertrack.com") {
      return false;
    }

    // Mock signup - store user in localStorage
    const usersData = localStorage.getItem("offertrack_users");
    const users = usersData ? JSON.parse(usersData) : [];

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("offertrack_users", JSON.stringify(users));

    const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userData);
    localStorage.setItem("offertrack_user", JSON.stringify(userData));
    // Trigger user change event
    window.dispatchEvent(new Event("userChange"));

    return true;
  };

  const logout = () => {
    // Trigger user change event
    window.dispatchEvent(new Event("userChange"));
    setUser(null);
    localStorage.removeItem("offertrack_user");
  };

  const updateUserName = (newName: string): boolean => {
    if (!user) return false;
    
    // Prevent demo user from updating their name
    if (user.id === "demo") return false;

    // Update user in users list
    const usersData = localStorage.getItem("offertrack_users");
    if (usersData) {
      const users = JSON.parse(usersData);
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, name: newName } : u
      );
      localStorage.setItem("offertrack_users", JSON.stringify(updatedUsers));
    }

    // Update current user
    const updatedUser = { ...user, name: newName };
    setUser(updatedUser);
    localStorage.setItem("offertrack_user", JSON.stringify(updatedUser));

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUserName,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
