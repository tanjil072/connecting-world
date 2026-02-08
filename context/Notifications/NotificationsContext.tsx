import { notificationsAPI } from "@/services/api";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../Auth/AuthContext";

interface NotificationsContextType {
  unreadCount: number;
  refreshUnreadCount: () => Promise<void>;
  decrementUnreadCount: (amount?: number) => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { isSignedIn } = useAuth();

  const refreshUnreadCount = async () => {
    if (!isSignedIn) {
      setUnreadCount(0);
      return;
    }

    try {
      const response = await notificationsAPI.getNotifications(1, 1);
      const count = response.data.data.unreadCount;
      setUnreadCount(count);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const decrementUnreadCount = (amount: number = 1) => {
    setUnreadCount((prev) => Math.max(0, prev - amount));
  };

  useEffect(() => {
    if (isSignedIn) {
      refreshUnreadCount();

      // Poll for new notifications every 30 seconds
      const interval = setInterval(refreshUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [isSignedIn]);

  return (
    <NotificationsContext.Provider
      value={{ unreadCount, refreshUnreadCount, decrementUnreadCount }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider",
    );
  }
  return context;
};
