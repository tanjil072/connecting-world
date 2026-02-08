import { ThemedText } from "@/components/ThemedText/themed-text";
import { ThemedView } from "@/components/ThemedView/themed-view";
import { useAuth } from "@/context/Auth/AuthContext";
import { postsAPI } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreatePostScreen() {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Please enter some content");
      return;
    }

    try {
      setIsPosting(true);
      await postsAPI.createPost(content.trim());
      Alert.alert("Success", "Post created successfully!", [
        {
          text: "OK",
          onPress: () => {
            setContent("");
            router.back();
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create post",
      );
    } finally {
      setIsPosting(false);
    }
  };

  const characterCount = content.length;
  const maxCharacters = 500;
  const isOverLimit = characterCount > maxCharacters;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ThemedView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="close" size={28} color="#1a1a1a" />
            </TouchableOpacity>
            <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
              Create Post
            </ThemedText>
            <TouchableOpacity
              style={[
                styles.postButton,
                (isPosting || !content.trim() || isOverLimit) &&
                  styles.postButtonDisabled,
              ]}
              onPress={handlePost}
              disabled={isPosting || !content.trim() || isOverLimit}
            >
              {isPosting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <ThemedText style={styles.postButtonText}>Post</ThemedText>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* User Info */}
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <ThemedText style={styles.avatarText}>
                  {user?.username
                    ? user.username.substring(0, 2).toUpperCase()
                    : "??"}
                </ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.username}>
                {user?.username || "Unknown User"}
              </ThemedText>
            </View>

            {/* Content Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="What's on your mind?"
                placeholderTextColor="#94a3b8"
                value={content}
                onChangeText={setContent}
                multiline
                autoFocus
                textAlignVertical="top"
              />
            </View>

            {/* Character Count */}
            <View style={styles.footer}>
              <ThemedText
                style={[
                  styles.characterCount,
                  isOverLimit && styles.characterCountOver,
                ]}
              >
                {characterCount}/{maxCharacters}
              </ThemedText>
            </View>

            {/* Guidelines */}
            <View style={styles.guidelines}>
              <ThemedText style={styles.guidelinesTitle}>
                Posting Guidelines:
              </ThemedText>
              <View style={styles.guidelineItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <ThemedText style={styles.guidelineText}>
                  Be respectful and kind
                </ThemedText>
              </View>
              <View style={styles.guidelineItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <ThemedText style={styles.guidelineText}>
                  Share meaningful content
                </ThemedText>
              </View>
              <View style={styles.guidelineItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <ThemedText style={styles.guidelineText}>
                  Keep it appropriate
                </ThemedText>
              </View>
            </View>
          </ScrollView>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  postButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 70,
    alignItems: "center",
  },
  postButtonDisabled: {
    backgroundColor: "#cbd5e1",
    opacity: 0.6,
  },
  postButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  username: {
    fontSize: 16,
  },
  inputContainer: {
    minHeight: 200,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    color: "#1a1a1a",
    lineHeight: 24,
    minHeight: 200,
  },
  footer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  characterCount: {
    fontSize: 14,
    color: "#64748b",
  },
  characterCountOver: {
    color: "#ef4444",
    fontWeight: "600",
  },
  guidelines: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  guidelinesTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1a1a1a",
  },
  guidelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 8,
  },
});
