import { ThemedText } from "@/components/ThemedText/themed-text";
import { ThemedView } from "@/components/ThemedView/themed-view";
import { useAuth } from "@/context/Auth/AuthContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor(
    { light: "#e2e8f0", dark: "#334155" },
    "icon",
  );

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
          </View>

          {/* About Section */}
          <View style={styles.menuSection}>
            <ThemedText style={styles.sectionTitle}>About</ThemedText>

            <View style={[styles.aboutCard, { backgroundColor }]}>
              <View style={styles.aboutHeader}>
                <LinearGradient
                  colors={["#6366f1", "#8b5cf6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.aboutIconContainer}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={28}
                    color="#ffffff"
                  />
                </LinearGradient>
                <View style={styles.aboutTitleContainer}>
                  <ThemedText style={styles.aboutTitle}>
                    Connecting World
                  </ThemedText>
                  <ThemedText style={styles.aboutVersion}>
                    Version 1.0.0
                  </ThemedText>
                </View>
              </View>

              <View style={styles.aboutDivider} />

              <ThemedText style={styles.aboutDescription}>
                A social networking platform designed to bring people together
                through meaningful connections and shared experiences.
              </ThemedText>

              <View style={styles.aboutFeatures}>
                <View style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={18} color="#10b981" />
                  <ThemedText style={styles.featureText}>
                    Create and share posts with the community
                  </ThemedText>
                </View>
                <View style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={18} color="#10b981" />
                  <ThemedText style={styles.featureText}>
                    Real-time notifications and updates
                  </ThemedText>
                </View>
                <View style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={18} color="#10b981" />
                  <ThemedText style={styles.featureText}>
                    Engage with likes and comments
                  </ThemedText>
                </View>
              </View>

              <View style={styles.aboutFooter}>
                <ThemedText style={styles.aboutFooterText}>
                  Developed by Tanjil
                </ThemedText>
              </View>
            </View>
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
  aboutCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  aboutHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  aboutIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  aboutTitleContainer: {
    flex: 1,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  aboutVersion: {
    fontSize: 13,
    color: "#94a3b8",
  },
  aboutDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginBottom: 16,
  },
  aboutDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#64748b",
    marginBottom: 20,
  },
  aboutFeatures: {
    gap: 12,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
    color: "#64748b",
  },
  aboutFooter: {
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  aboutFooterText: {
    fontSize: 13,
    color: "#94a3b8",
  },
});
