import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  commentCard: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
    backgroundColor: "rgba(99, 102, 241, 0.05)",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commentTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default styles;
