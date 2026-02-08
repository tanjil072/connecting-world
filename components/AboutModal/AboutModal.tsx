import { ThemedText } from "@/components/ThemedText/themed-text";
import { ThemedView } from "@/components/ThemedView/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ visible, onClose }) => {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <ThemedView style={styles.modalContent}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <ThemedText type="title" style={styles.modalTitle}>
              About
            </ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color={textColor} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalScrollContent}
          >
            <View style={[styles.aboutCard, { backgroundColor }]}>
              <View style={styles.aboutHeader}>
                <LinearGradient
                  colors={["#6366f1", "#8b5cf6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.aboutIconContainer}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={28}
                    color="#ffffff"
                  />
                </LinearGradient>
                <View style={styles.aboutTitleContainer}>
                  <ThemedText style={styles.aboutTitle}>
                    Connecting World
                  </ThemedText>
                  <ThemedText style={styles.aboutVersion}>
                    Version 1.0.0
                  </ThemedText>
                </View>
              </View>

              <View style={styles.aboutDivider} />

              <ThemedText style={styles.aboutDescription}>
                A social networking platform designed to bring people together
                through meaningful connections and shared experiences.
              </ThemedText>

              <View style={styles.aboutFeatures}>
                <View style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={18} color="#10b981" />
                  <ThemedText style={styles.featureText}>
                    Create and share posts with the community
                  </ThemedText>
                </View>
                <View style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={18} color="#10b981" />
                  <ThemedText style={styles.featureText}>
                    Real-time notifications and updates
                  </ThemedText>
                </View>
                <View style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={18} color="#10b981" />
                  <ThemedText style={styles.featureText}>
                    Engage with likes and comments
                  </ThemedText>
                </View>
              </View>

              <View style={styles.aboutFooter}>
                <ThemedText style={styles.aboutFooterText}>
                  Developed by Tanjil
                </ThemedText>
              </View>
            </View>
          </ScrollView>
        </ThemedView>
      </SafeAreaView>
    </Modal>
  );
};
