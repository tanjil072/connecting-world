import { AboutModal } from "@/components/AboutModal/AboutModal";
import { ThemedText } from "@/components/ThemedText/themed-text";
import { ThemedView } from "@/components/ThemedView/themed-view";
import { useAuth } from "@/context/Auth/AuthContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import messaging from "@react-native-firebase/messaging";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor(
    { light: "#e2e8f0", dark: "#334155" },
    "icon",
  );

  // Check notification permission status on mount
  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    try {
      if (messaging) {
        // Get the current permission status without requesting
        const authStatus = await messaging().hasPermission();
        console.log("Current notification permission status:", authStatus);

        // Only consider AUTHORIZED as enabled (not PROVISIONAL)
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;
        console.log("Notifications enabled:", enabled);
        setNotificationsEnabled(enabled);
      }
    } catch (error) {
      console.error("Error checking notification permission:", error);
    }
  };

  const handleToggleNotifications = async (value: boolean) => {
    try {
      if (value) {
        console.log("🔔 Requesting notification permission...");
        console.log("Platform:", Platform.OS);

        let authStatus: any;
        let enabled = false;

        if (Platform.OS === "android") {
          // For Android, request the POST_NOTIFICATIONS permission
          console.log("📱 Android: Requesting POST_NOTIFICATIONS permission");

          try {
            if (PermissionsAndroid) {
              try {
                const result = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                  {
                    title: "Notification Permission",
                    message:
                      "This app needs permission to send you notifications",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                  },
                );

                console.log("Android Permission Result:", result);
                enabled = result === PermissionsAndroid.RESULTS.GRANTED;

                if (enabled) {
                  // Still request Firebase permission
                  authStatus = await messaging().requestPermission();
                  console.log(
                    "Firebase Permission after Android request:",
                    authStatus,
                  );
                }
              } catch (err) {
                console.error("Error requesting Android permission:", err);
              }
            } else {
              // Fallback: just request Firebase permission
              authStatus = await messaging().requestPermission();
              console.log("Permission request result:", authStatus);
              enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            }
          } catch (err) {
            console.error("Android permission error:", err);
            authStatus = await messaging().requestPermission();
            enabled =
              authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          }
        } else {
          // For iOS
          console.log("🍎 iOS: Requesting notification permission");
          authStatus = await messaging().requestPermission();
          console.log("Permission request result:", authStatus);
          const isAuthorized =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED;
          const isProvisional =
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          enabled = isAuthorized || isProvisional;
        }

        if (enabled) {
          setNotificationsEnabled(true);
          try {
            const token = await messaging().getToken();
            console.log("✅ FCM Token obtained:", token);
          } catch (tokenError) {
            console.error("❌ Error getting FCM token:", tokenError);
          }
          Alert.alert("Success", "Notifications enabled successfully!");
        } else {
          console.log("❌ Permission not granted");
          setNotificationsEnabled(false);
          Alert.alert(
            "Permission Denied",
            "You denied notification permissions. Please enable them in Settings > Apps > Connecting World > Notifications.",
          );
        }
      } else {
        setNotificationsEnabled(false);
      }
    } catch (error) {
      console.error("Error toggling notifications:", error);
      setNotificationsEnabled(false);
      Alert.alert("Error", "Failed to update notification settings");
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/(auth)/login");
          },
        },
      ],
      { cancelable: true },
    );
  };

  const getInitials = (username: string) => {
    if (!username) return "??";
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Profile
          </ThemedText>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Card */}
          <View style={[styles.profileCard, { backgroundColor }]}>
            <LinearGradient
              colors={["#6366f1", "#8b5cf6", "#ec4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarLarge}
            >
              <Text style={styles.avatarText}>
                {getInitials(user?.username || "")}
              </Text>
            </LinearGradient>

            <Text style={[styles.name, { color: textColor }]}>
              {user?.username}
            </Text>
            <ThemedText style={styles.email}>{user?.email}</ThemedText>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            <ThemedText style={styles.sectionTitle}>Account</ThemedText>

            <TouchableOpacity
              style={[styles.menuItem, { backgroundColor }]}
              onPress={() => {
                // Navigate to feed with username filter
                if (user?.username) {
                  router.push(`/(tabs)/feed?username=${user.username}` as any);
                }
              }}
            >
              <View
                style={[
                  styles.menuIconContainer,
                  { backgroundColor: borderColor },
                ]}
              >
                <Ionicons name="person-outline" size={22} color="#6366f1" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuLabel}>View Posts</ThemedText>
                <ThemedText style={styles.menuDescription}>
                  View all your posts
                </ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <View style={[styles.menuItem, { backgroundColor }]}>
              <View
                style={[
                  styles.menuIconContainer,
                  { backgroundColor: borderColor },
                ]}
              >
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color="#10b981"
                />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuLabel}>Notifications</ThemedText>
                <ThemedText style={styles.menuDescription}>
                  {notificationsEnabled ? "Enabled" : "Disabled"}
                </ThemedText>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: "#cbd5e1", true: "#86efac" }}
                thumbColor={notificationsEnabled ? "#10b981" : "#94a3b8"}
              />
            </View>
          </View>

          {/* About Section */}
          <View style={styles.menuSection}>
            <ThemedText style={styles.sectionTitle}>About</ThemedText>

            <TouchableOpacity
              style={[styles.menuItem, { backgroundColor }]}
              onPress={() => setShowAboutModal(true)}
            >
              <View
                style={[
                  styles.menuIconContainer,
                  { backgroundColor: borderColor },
                ]}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color="#6366f1"
                />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuLabel}>
                  About Connecting World
                </ThemedText>
                <ThemedText style={styles.menuDescription}>
                  App version 1.0.0
                </ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor, borderColor }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={22} color="#ef4444" />
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </TouchableOpacity>

          {/* App Info */}
          <View style={styles.appInfo}>
            <ThemedText style={styles.appInfoText}>
              Connecting World © 2026
            </ThemedText>
            <ThemedText style={styles.appInfoText}>Version 1.0.0</ThemedText>
          </View>
        </ScrollView>

        {/* About Modal */}
        <AboutModal
          visible={showAboutModal}
          onClose={() => setShowAboutModal(false)}
        />
      </ThemedView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  scrollContent: {
    padding: 20,
  },
  profileCard: {
    alignItems: "center",
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "700",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#64748b",
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#94a3b8",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: "#94a3b8",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 20,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ef4444",
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 4,
  },
  appInfoText: {
    fontSize: 12,
    color: "#94a3b8",
  },
});
