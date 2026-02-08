import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: "#e2e8f0",
    borderLeftColor: "#6366f1",
  },
  innerContainer: {
    padding: 14,
    paddingLeft: 12,
    // backgroundColor: "#1e293b",
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default styles;
