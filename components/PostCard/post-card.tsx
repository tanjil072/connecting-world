import { ThemedText } from "@/components/ThemedText/themed-text";
import { ThemedView } from "@/components/ThemedView/themed-view";
import { postsAPI } from "@/services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Share,
  TouchableOpacity,
  View,
} from "react-native";

import { getInitials } from "@/constants/helpers";
import styles from "./styles";
import { PostCardProps } from "./types";

export const PostCard: React.FC<PostCardProps> = ({ post, onCommentPress }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync state when post prop changes (e.g., on refresh)
  useEffect(() => {
    setIsLiked(post.isLiked);
    setLikesCount(post.likesCount);
    setCommentsCount(post.commentsCount);
  }, [post.id, post.likesCount, post.commentsCount, post.isLiked]);

  const MAX_CHARS = 100;
  const shouldShowSeeMore = post.content.length > MAX_CHARS;
  const displayContent = isExpanded
    ? post.content
    : post.content.substring(0, MAX_CHARS);

  const handleLike = async () => {
    try {
      setIsLiking(true);

      if (isLiked) {
        const res = await postsAPI.unlikePost(post.id);

        setIsLiked(res.data.data.isLiked);
        setLikesCount(res.data.data.likesCount);
      } else {
        const res = await postsAPI.likePost(post.id);
        console.log(res);
        setIsLiked(res.data.data.isLiked);
        setLikesCount(res.data.data.likesCount);
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to like post",
      );
    } finally {
      setIsLiking(false);
    }
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

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this post by @${post.username}:\n\n${post.content}`,
        title: `Post by @${post.username}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to share post");
    }
  };

  return (
    <ThemedView style={styles.card}>
      {/* Header with profile picture, name, and menu */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <LinearGradient
            colors={["#6366f1", "#8b5cf6", "#ec4899"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <ThemedText style={styles.avatarText}>
              {getInitials(post.username)}
            </ThemedText>
          </LinearGradient>
          <View style={styles.headerInfo}>
            <ThemedText type="defaultSemiBold" style={styles.username}>
              {post.username}
            </ThemedText>
            <ThemedText style={styles.timestamp}>
              {formatDate(post.createdAt)}
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Post content */}
      <View style={styles.contentContainer}>
        <ThemedText style={styles.content}>
          {displayContent}
          {!isExpanded && shouldShowSeeMore && "..."}
        </ThemedText>
        {shouldShowSeeMore && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <ThemedText style={styles.seeMoreText}>
              {isExpanded ? "See Less" : "See More"}
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Footer with likes and comments */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLike}
          disabled={isLiking}
        >
          {isLiking ? (
            <ActivityIndicator size="small" color="#6366f1" />
          ) : (
            <>
              <MaterialCommunityIcons
                name={isLiked ? "heart" : "heart-outline"}
                size={20}
                color={isLiked ? "#ec4899" : "#64748b"}
              />
              <ThemedText
                style={isLiked ? styles.likeText : styles.likeTextInactive}
              >
                {likesCount}
              </ThemedText>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onCommentPress?.(post.id, post)}
        >
          <MaterialCommunityIcons
            name="comment-outline"
            size={20}
            color="#64748b"
          />
          <ThemedText style={styles.commentText}>{commentsCount}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <MaterialCommunityIcons
            name="share-variant-outline"
            size={20}
            color="#64748b"
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};
