/**
 * Notification Center Component
 * 
 * Displays a bell icon with unread count badge. When clicked, shows a dropdown
 * with notification history. Users can:
 * - View all recent notifications
 * - Mark individual notifications as read
 * - Mark all as read
 * - Clear individual or all notifications
 * 
 * Integrates with NotificationContext for notification management.
 */

"use client";

import { Bell, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNotifications } from "../contexts/NotificationContext";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleClearNotification = (id: string) => {
    clearNotification(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-600";
      case "error":
        return "bg-red-100 text-red-600";
      case "info":
        return "bg-blue-100 text-blue-600";
      case "warning":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <TooltipPrimitive.Provider>
      <PopoverPrimitive.Root>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild>
            <PopoverPrimitive.Trigger asChild>
              <button 
                className="relative inline-flex items-center justify-center size-9 rounded-md hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 transition-all" 
                type="button"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </button>
            </PopoverPrimitive.Trigger>
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              className="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
              sideOffset={5}
            >
              Notifications
              <TooltipPrimitive.Arrow className="fill-primary" />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content 
          className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-popover-content-transform-origin) rounded-md border p-0 shadow-md outline-hidden",
            "w-96"
          )}
          align="end"
          sideOffset={4}
        >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs"
              type="button"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
              <Bell className="h-12 w-12 mb-2 opacity-20" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                    !notification.read ? "bg-blue-50/50 dark:bg-blue-500/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationIcon(notification.type)}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {notification.title}
                      </p>
                      {notification.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {notification.description}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleMarkAsRead(notification.id)}
                          type="button"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleClearNotification(notification.id)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
