import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  modalScrollContent: {
    padding: 20,
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

export default styles;
