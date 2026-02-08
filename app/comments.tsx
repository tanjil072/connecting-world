import { CommentCard } from "@/components/CommentsCard/comment-card";
import { Post } from "@/components/PostCard/types";
import { ThemedText } from "@/components/ThemedText/themed-text";
import { ThemedView } from "@/components/ThemedView/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { postsAPI } from "@/services/api";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
  const backgroundColor = useThemeColor({}, "background");

  const getInitials = (username: string) => {
    if (!username) return "?";
    return (
      username
        .split(" ")
        .map((word) => word[0])
        .filter((char) => char)
        .join("")
        .toUpperCase()
        .slice(0, 2) || username.substring(0, 2).toUpperCase()
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

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

      // Set comments (sorted in ascending order - oldest to newest)
      const sortedComments = (postData.comments || []).sort(
        (a: Comment, b: Comment) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      setComments(sortedComments);
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
      const sortedComments = (response.data.data.comments || []).sort(
        (a: Comment, b: Comment) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      setComments(sortedComments);
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
        {/* Custom Post Card */}
        <ThemedView style={styles.postCard}>
          <View style={styles.postHeader}>
            <LinearGradient
              colors={["#6366f1", "#8b5cf6", "#ec4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.postAvatar}
            >
              <ThemedText style={styles.postAvatarText}>
                {getInitials(post.username)}
              </ThemedText>
            </LinearGradient>
            <View style={styles.postHeaderInfo}>
              <ThemedText type="defaultSemiBold" style={styles.postUsername}>
                {post.username}
              </ThemedText>
              <ThemedText style={styles.postTimestamp}>
                {formatDate(post.createdAt)}
              </ThemedText>
            </View>
          </View>

          {/* Post Content */}
          <ThemedText style={styles.postContent}>{post.content}</ThemedText>

          {/* Post Stats */}
          <View style={styles.postStats}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="heart" size={18} color="#ec4899" />
              <ThemedText style={styles.statText}>{post.likesCount}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="comment"
                size={18}
                color="#6366f1"
              />
              <ThemedText style={styles.statText}>
                {post.commentsCount}
              </ThemedText>
            </View>
          </View>
        </ThemedView>

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
  postCard: {
    paddingHorizontal: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  postAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  postAvatarText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  postHeaderInfo: {
    flex: 1,
  },
  postUsername: {
    fontSize: 16,
    marginBottom: 2,
  },
  postTimestamp: {
    fontSize: 13,
    color: "#64748b",
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  postStats: {
    flexDirection: "row",
    gap: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
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
