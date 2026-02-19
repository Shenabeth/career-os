/**
 * Authentication Context & Provider
 * 
 * Manages user authentication state and operations:
 * - User login/signup/logout
 * - Persistent authentication via localStorage
 * - Demo account support (demo@offertrack.com / demo123)
 * - Provides useAuth() hook for accessing auth state throughout the app
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
      return true;
    }

    // Demo account
    if (email === "demo@offertrack.com" && password === "demo123") {
      const demoUser = { id: "demo", name: "Demo User", email: "demo@offertrack.com" };
      setUser(demoUser);
      localStorage.setItem("offertrack_user", JSON.stringify(demoUser));
      return true;
    }

    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
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

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("offertrack_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
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
