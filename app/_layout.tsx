import { AuthProvider, useAuth } from "@/context/Auth/AuthContext";
import {
  NotificationsProvider,
  useNotifications,
} from "@/context/Notifications/NotificationsContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { notificationsAPI } from "@/services/api";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

// Import Firebase messaging only if available (development build required)
let messaging: any = null;
try {
  messaging = require("@react-native-firebase/messaging").default;
} catch (e) {
  console.log("Firebase messaging not available - requires development build");
}

export const unstable_settings = {
  anchor: "(tabs)",
};

const RootLayoutNav = () => {
  const { isSignedIn, isLoading } = useAuth();
  const { refreshUnreadCount } = useNotifications();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthGroup) {
      // Redirect to login if not signed in
      router.replace("/(auth)/login");
    } else if (isSignedIn && inAuthGroup) {
      // Redirect to tabs if signed in
      router.replace("/(tabs)");
    }
  }, [isSignedIn, isLoading, segments]);

  // Setup FCM when user is signed in
  useEffect(() => {
    if (!messaging || !isSignedIn) return;

    const setupFCM = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log("Authorization status:", authStatus);

          const token = await messaging().getToken();
          console.log("Device FCM Token:", token);

          // Send FCM token to backend
          try {
            await notificationsAPI.saveFCMToken(token);
            console.log("FCM token saved to backend successfully");
          } catch (error) {
            console.error("Error saving FCM token to backend:", error);
          }
        }
      } catch (error) {
        console.error("Error setting up FCM:", error);
      }
    };

    setupFCM();
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage: any) => {
        console.log("📱 Foreground notification received:", remoteMessage);

        // Refresh unread count when notification arrives
        refreshUnreadCount();

        // Display notification when app is in foreground
        if (remoteMessage.notification) {
          // Alert.alert(
          //   remoteMessage.notification.title || "New Notification",
          //   remoteMessage.notification.body || "",
          //   [{ text: "OKa" }],
          // );
        }
      },
    );

    // Handle notification tap when app is in background
    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      console.log(
        "📲 App opened from background via notification:",
        remoteMessage.notification,
      );
    });

    // Handle notification tap when app was closed/quit
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          console.log(
            "📲 App opened from quit state via notification - Notification caused app to open from quit state:",
            remoteMessage.notification,
          );
        }
      });

    return unsubscribeOnMessage;
  }, [isSignedIn]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-post"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="comments"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  // Register background handler (needs to be registered early)
  useEffect(() => {
    if (!messaging) return;

    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log("Message handled in the background!", remoteMessage);
    });
  }, []);

  return (
    <AuthProvider>
      <NotificationsProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <RootLayoutNav />
          <StatusBar style="auto" />
        </ThemeProvider>
      </NotificationsProvider>
    </AuthProvider>
  );
};

export default RootLayout;
