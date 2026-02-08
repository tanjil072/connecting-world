import { authAPI } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextType, User } from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const userId = await AsyncStorage.getItem("userId");
      const username = await AsyncStorage.getItem("username");
      const email = await AsyncStorage.getItem("email");

      if (token && userId && username && email) {
        setUser({ id: userId, username, email });
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(email, password);
      const { token, userId, username, email: userEmail } = response.data.data;

      await AsyncStorage.multiSet([
        ["authToken", token],
        ["userId", userId],
        ["username", username],
        ["email", userEmail],
      ]);

      setUser({
        id: userId,
        email: userEmail,
        username: username,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.signup(email, password, username);
      const {
        token,
        userId,
        username: userName,
        email: userEmail,
      } = response.data.data;

      await AsyncStorage.multiSet([
        ["authToken", token],
        ["userId", userId],
        ["username", userName],
        ["email", userEmail],
      ]);

      setUser({
        id: userId,
        email: userEmail,
        username: userName,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "authToken",
        "userId",
        "username",
        "email",
      ]);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSignedIn: !!user,
        login,
        signup,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
