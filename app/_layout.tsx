import { AuthProvider, useAuth } from "@/context/Auth/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
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

function RootLayoutNav() {
  const { isSignedIn, isLoading } = useAuth();
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
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const requestUserPermission = async () => {
    if (!messaging) return false;
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
      }
      return enabled;
    } catch (error) {
      console.log("Firebase not configured:", error);
      return false;
    }
  };

  useEffect(() => {
    if (!messaging) {
      console.log("Firebase messaging not available - skipping setup");
      return;
    }

    requestUserPermission().then((enabled) => {
      if (enabled) {
        messaging()
          .getToken()
          .then((token: string) => {
            console.log("Device FCM Token:", token);
          })
          .catch((error: any) => {
            console.error("Error getting FCM token:", error);
          });
      }
    });

    // check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification,
          );
        }
      });

    // assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification,
      );
    });

    // register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log("A new FCM message arrived!", remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
