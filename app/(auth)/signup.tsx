import { useAuth } from "@/context/Auth/AuthContext";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const PURPLE = "#5B3E96";

const SignupScreen = () => {
  const { signup, isLoading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [focused, setFocused] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      await signup(email, password, username);
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Signup Failed", "Failed to create account");
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraScrollHeight={30}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Connecting World</Text>
          <Text style={styles.subtitle}>
            Create your account and start exploring 🌍
          </Text>

          <Image
            source={require("@/assets/images/signup.jpg")}
            style={styles.image}
            resizeMode="contain"
          />

          {/* Username */}
          <View
            style={[
              styles.inputWrapper,
              focused === "username" && styles.inputFocused,
            ]}
          >
            <TextInput
              placeholder="Username"
              placeholderTextColor="#8e8ea0"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              returnKeyType="next"
              onFocus={() => setFocused("username")}
              onBlur={() => setFocused(null)}
            />
          </View>

          {/* Email */}
          <View
            style={[
              styles.inputWrapper,
              focused === "email" && styles.inputFocused,
            ]}
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor="#8e8ea0"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
            />
          </View>

          {/* Password */}
          <View
            style={[
              styles.inputWrapper,
              focused === "password" && styles.inputFocused,
            ]}
          >
            <View style={styles.passwordRow}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#8e8ea0"
                style={styles.passwordInput}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                returnKeyType="next"
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View
            style={[
              styles.inputWrapper,
              focused === "confirm" && styles.inputFocused,
            ]}
          >
            <View style={styles.passwordRow}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#8e8ea0"
                style={styles.passwordInput}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleSignup}
                onFocus={() => setFocused("confirm")}
                onBlur={() => setFocused(null)}
              />

              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text style={styles.showText}>
                  {showConfirmPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && { opacity: 0.7 }]}
            onPress={handleSignup}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>

            <Link href="/(auth)/login">
              <Text style={styles.login}> Login</Text>
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 18,
    paddingBottom: 40,
  },

  container: {
    borderRadius: 44,
    padding: 26,
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: PURPLE,
  },

  subtitle: {
    fontSize: 15,
    color: "#8e8ea0",
    marginTop: 6,
    marginBottom: 12,
    textAlign: "center",
  },

  image: {
    width: 160,
    height: 160,
    marginVertical: 6,
  },

  inputWrapper: {
    width: "100%",
    backgroundColor: "#f7f6fb",
    borderRadius: 50,
    paddingHorizontal: 18,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "transparent",
  },

  inputFocused: {
    borderColor: PURPLE,
    backgroundColor: "#ffffff",
  },

  input: {
    paddingVertical: 16,
    fontSize: 15,
    width: "100%",
  },

  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
  },

  showText: {
    color: PURPLE,
    fontWeight: "600",
  },

  button: {
    width: "100%",
    backgroundColor: PURPLE,
    paddingVertical: 20,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  footer: {
    flexDirection: "row",
    marginTop: 22,
  },

  footerText: {
    color: "#6b6b80",
  },

  login: {
    color: PURPLE,
    fontWeight: "700",
  },
});
