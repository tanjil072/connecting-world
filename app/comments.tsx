import { CommentCard } from "@/components/CommentsCard/comment-card";
import { PostCard } from "@/components/PostCard/post-card";
import { Post } from "@/components/PostCard/types";
import { ThemedText } from "@/components/ThemedText/themed-text";
import { ThemedView } from "@/components/ThemedView/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { postsAPI } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

const CommentsScreen = () => {
  const { postId, username } = useLocalSearchParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

  useEffect(() => {
    fetchPostAndComments();
  }, [postId]);

  const fetchPostAndComments = async () => {
    try {
      setIsLoading(true);
      const response = await postsAPI.getPostById(postId as string);
      const postData = response.data.data;

      // Set post data
      setPost({
        id: postData.id,
        content: postData.content,
        userId: postData.userId,
        username: postData.username,
        createdAt: postData.createdAt,
        likesCount: postData.likesCount,
        commentsCount: postData.commentsCount,
        isLiked: postData.isLiked,
      });

      // Set comments
      setComments(postData.comments || []);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to fetch post",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await postsAPI.getComments(postId as string);
      setComments(response.data.data.comments);
    } catch (error: any) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handlePostComment = async () => {
    if (!commentText.trim()) {
      return;
    }

    try {
      setIsPosting(true);
      await postsAPI.commentOnPost(postId as string, commentText.trim());
      setCommentText("");
      // Update post comments count locally
      if (post) {
        setPost({ ...post, commentsCount: post.commentsCount + 1 });
      }
      fetchComments(); // Refresh comments
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to post comment",
      );
    } finally {
      setIsPosting(false);
    }
  };

  const renderHeader = () => {
    if (!post) return null;
    return (
      <View style={styles.postContainer}>
        <PostCard post={post} />
        <View style={styles.commentsHeader}>
          <ThemedText type="defaultSemiBold" style={styles.commentsHeaderText}>
            Comments ({comments.length})
          </ThemedText>
        </View>
      </View>
    );
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <CommentCard comment={item} />
  );

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="chatbubbles-outline" size={64} color={iconColor} />
        <ThemedText style={styles.emptyTitle}>No comments yet</ThemedText>
        <ThemedText style={styles.emptySubtitle}>
          Be the first to comment!
        </ThemedText>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={0}
      >
        <ThemedView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={textColor} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
                Post
              </ThemedText>
              {(username || post?.username) && (
                <ThemedText style={styles.headerSubtitle}>
                  @{username || post?.username}&apos;s post
                </ThemedText>
              )}
            </View>
            <View style={{ width: 40 }} />
          </View>

          {/* Post and Comments List */}
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#6366f1" />
              <ThemedText style={styles.loadingText}>
                Loading post...
              </ThemedText>
            </View>
          ) : (
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={renderHeader}
              ListEmptyComponent={renderEmpty}
            />
          )}

          {/* Comment Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                placeholderTextColor="#94a3b8"
                value={commentText}
                onChangeText={setCommentText}
                multiline
                maxLength={300}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!commentText.trim() || isPosting) &&
                    styles.sendButtonDisabled,
                ]}
                onPress={handlePostComment}
                disabled={!commentText.trim() || isPosting}
              >
                {isPosting ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Ionicons name="send" size={20} color={textColor} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#64748b",
  },
  listContent: {
    paddingVertical: 12,
    flexGrow: 1,
  },
  postContainer: {
    marginBottom: 8,
  },
  commentsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#f8f9fa",
  },
  commentsHeaderText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: "#1a1a1a",
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#cbd5e1",
    opacity: 0.6,
  },
});
