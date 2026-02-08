import { StyleSheet } from "react-native";

export const Colors = {
  light: {
    text: "#1a1a1a",
    background: "#f8f9fa",
    tint: "#6366f1",
    tabIconDefault: "#94a3b8",
    tabIconSelected: "#6366f1",
    primaryButton: "#6366f1",
    primaryButtonGradient: ["#6366f1", "#8b5cf6"],
    destructiveButton: "#ef4444",
    warningButton: "#f59e0b",
    successButton: "#10b981",
    border: "#e2e8f0",
    cardBackground: "#ffffff",
    background_secondary: "#f1f5f9",
    text_secondary: "#64748b",
    text_tertiary: "#94a3b8",
    accent: "#ec4899",
    accentLight: "#fce7f3",
    shadowColor: "rgba(0, 0, 0, 0.08)",
  },
  dark: {
    text: "#f1f5f9",
    background: "#0f172a",
    tint: "#818cf8",
    tabIconDefault: "#64748b",
    tabIconSelected: "#818cf8",
    primaryButton: "#818cf8",
    primaryButtonGradient: ["#818cf8", "#a78bfa"],
    destructiveButton: "#f87171",
    warningButton: "#fbbf24",
    successButton: "#34d399",
    border: "#334155",
    cardBackground: "#1e293b",
    background_secondary: "#1e293b",
    text_secondary: "#94a3b8",
    text_tertiary: "#64748b",
    accent: "#f472b6",
    accentLight: "#831843",
    shadowColor: "rgba(0, 0, 0, 0.3)",
  },
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
  },
  shadowSmall: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  shadowMedium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  shadowLarge: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FontWeights = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

export const Typography = {
  title: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  bodyBold: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
};
