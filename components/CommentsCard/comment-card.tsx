import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { ThemedText } from "../ThemedText/themed-text";
import { ThemedView } from "../ThemedView/themed-view";
import { formatDate } from "./helpers";
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
    <ThemedView
      style={{
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: "hidden",
        borderLeftWidth: 4,
        borderLeftColor: "#6366f1",
      }}
    >
      <View
        style={{
          padding: 14,
          paddingLeft: 12,
          backgroundColor: "#1e293b",
          borderRadius: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <LinearGradient
            colors={["#6366f1", "#8b5cf6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <ThemedText
              style={{
                fontWeight: "600",
                fontSize: 12,
                color: "#fff",
              }}
            >
              {getInitials(comment.username)}
            </ThemedText>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <ThemedText
              type="defaultSemiBold"
              style={{ fontSize: 14, color: "#e2e8f0" }}
            >
              {comment.username}
            </ThemedText>
            <ThemedText style={{ fontSize: 12, color: "#94a3b8" }}>
              {formatDate(comment.createdAt)}
            </ThemedText>
          </View>
        </View>
        <ThemedText
          style={{
            fontSize: 14,
            color: "#cbd5e1",
            lineHeight: 20,
          }}
        >
          {comment.content}
        </ThemedText>
      </View>
    </ThemedView>
  );
};
