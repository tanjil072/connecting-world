import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  headerInfo: {
    marginLeft: 14,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
  },
  timestamp: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 3,
  },
  menuButton: {
    padding: 10,
    borderRadius: 12,
  },
  menuButtonPressed: {
    backgroundColor: "rgba(99, 102, 241, 0.08)",
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  seeMoreText: {
    color: "#6366f1",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#334155",
    marginVertical: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionButtonActive: {
    backgroundColor: "rgba(236, 72, 153, 0.08)",
  },
  likeText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#ec4899",
    fontSize: 14,
  },
  likeTextInactive: {
    marginLeft: 8,
    fontWeight: "500",
    color: "#94a3b8",
    fontSize: 14,
  },
  commentText: {
    marginLeft: 8,
    color: "#94a3b8",
    fontWeight: "500",
    fontSize: 14,
  },
  shareText: {
    marginLeft: 8,
    color: "#94a3b8",
    fontWeight: "500",
    fontSize: 14,
  },
});

export default styles;
