import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { ThemedText } from "../ThemedText/themed-text";
import { ThemedView } from "../ThemedView/themed-view";
import { formatDate } from "./helpers";
import styles from "./styles";
import { CommentCardProps } from "./types";

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
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

  return (
    <ThemedView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <LinearGradient
            colors={["#6366f1", "#8b5cf6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <ThemedText style={styles.avatarText}>
              {getInitials(comment.username)}
            </ThemedText>
          </LinearGradient>
          <View style={styles.userInfo}>
            <ThemedText type="defaultSemiBold" style={styles.username}>
              {comment.username}
            </ThemedText>
            <ThemedText style={styles.timestamp}>
              {formatDate(comment.createdAt)}
            </ThemedText>
          </View>
        </View>
        <ThemedText style={styles.content}>{comment.content}</ThemedText>
      </View>
    </ThemedView>
  );
};
