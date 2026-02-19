/**
 * Notification Management Context & Provider
 * 
 * Manages notification history and state:
 * - Stores all notifications with timestamps
 * - Tracks read/unread status
 * - Provides methods to add, mark as read, and clear notifications
 * - Integrates with Sonner toast for display
 * 
 * Provides useNotifications() hook for accessing notification system throughout the app.
 */

/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { toast as sonnerToast } from "sonner";

export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (type: Notification["type"], title: string, description?: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Load user-specific notifications from localStorage
  const loadNotificationsForUser = useCallback((userId: string) => {
    if (userId === "demo") {
      // Demo user gets empty notifications
      setNotifications([]);
      return;
    }

    const stored = localStorage.getItem(`notifications_${userId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        const withDates = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
        setNotifications(withDates);
      } catch (error) {
        console.error("Failed to parse notifications", error);
        setNotifications([]);
      }
    } else {
      setNotifications([]);
    }
  }, []);

  // Save notifications to localStorage
  const saveNotifications = useCallback((userId: string, notifs: Notification[]) => {
    if (userId === "demo") {
      // Never save demo user notifications
      return;
    }
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(notifs));
  }, []);

  // Load notifications on mount and when user changes
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(user);
      loadNotificationsForUser(user);
    }

    // Listen for user changes
    const handleUserChange = () => {
      const newUser = localStorage.getItem("currentUser");
      if (newUser) {
        setCurrentUser(newUser);
        loadNotificationsForUser(newUser);
      } else {
        setCurrentUser(null);
        setNotifications([]);
      }
    };

    window.addEventListener("userChange", handleUserChange);
    return () => window.removeEventListener("userChange", handleUserChange);
  }, [loadNotificationsForUser]);

  const addNotification = useCallback((
    type: Notification["type"],
    title: string,
    description?: string
  ) => {
    if (!currentUser) return;

    const newNotification: Notification = {
      id: Date.now().toString() + Math.random(),
      type,
      title,
      description,
      timestamp: new Date(),
      read: false,
    };

    const updatedNotifications = [newNotification, ...notifications].slice(0, 50); // Keep last 50
    setNotifications(updatedNotifications);
    saveNotifications(currentUser, updatedNotifications);

    // Also show as toast
    switch (type) {
      case "success":
        sonnerToast.success(title, description ? { description } : undefined);
        break;
      case "error":
        sonnerToast.error(title, description ? { description } : undefined);
        break;
      case "info":
        sonnerToast.info(title, description ? { description } : undefined);
        break;
      case "warning":
        sonnerToast.warning(title, description ? { description } : undefined);
        break;
    }
  }, [currentUser, notifications, saveNotifications]);

  const markAsRead = useCallback((id: string) => {
    if (!currentUser) return;
    
    const updatedNotifications = notifications.map((notif) => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    saveNotifications(currentUser, updatedNotifications);
  }, [currentUser, notifications, saveNotifications]);

  const markAllAsRead = useCallback(() => {
    if (!currentUser) return;
    
    const updatedNotifications = notifications.map((notif) => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    saveNotifications(currentUser, updatedNotifications);
  }, [currentUser, notifications, saveNotifications]);

  const clearNotification = useCallback((id: string) => {
    if (!currentUser) return;
    
    const updatedNotifications = notifications.filter((notif) => notif.id !== id);
    setNotifications(updatedNotifications);
    saveNotifications(currentUser, updatedNotifications);
  }, [currentUser, notifications, saveNotifications]);

  const clearAll = useCallback(() => {
    if (!currentUser) return;
    
    setNotifications([]);
    saveNotifications(currentUser, []);
  }, [currentUser, saveNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
