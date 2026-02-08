import { useAuth } from "@/context/Auth/AuthContext";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

const LoginScreen = () => {
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Login failed", "Invalid credentials");
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={30}
      >
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>Connecting World</Text>
          <Text style={styles.subtitle}>
            Welcome back — sign in to continue 🌍
          </Text>

          {/* Illustration */}
          <Image
            source={require("@/assets/images/login.jpg")}
            style={styles.image}
            resizeMode="contain"
          />

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
              style={styles.textInput}
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
                returnKeyType="done"
                onSubmitEditing={handleLogin} // 🔥 login from keyboard
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Text style={styles.showText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Signing in..." : "Login"}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account?</Text>

            <Link href="/(auth)/signup">
              <Text style={styles.signup}> Sign up</Text>
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 18,
    paddingBottom: 40, // prevents keyboard squeeze
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
    width: 170,
    height: 170,
    marginVertical: 8,
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

  textInput: {
    paddingVertical: 16,
    fontSize: 15,
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

  signup: {
    color: PURPLE,
    fontWeight: "700",
  },
});
