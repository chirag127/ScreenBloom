import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
    const { login, loading } = useAuth();
    const { theme } = useTheme();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    // Validate form
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!email) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
            isValid = false;
        }

        if (!password) {
            errors.password = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    // Handle login
    const handleLogin = async () => {
        if (validateForm()) {
            try {
                await login({ email, password });
                // Navigation is handled by the AppNavigator based on auth state
            } catch (error) {
                Alert.alert(
                    "Login Failed",
                    error.msg || "Please check your credentials and try again.",
                    [{ text: "OK" }]
                );
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.logoContainer}>
                    <Text style={[styles.appName, { color: theme.primary }]}>
                        ScreenBloom
                    </Text>
                    <Text style={[styles.tagline, { color: theme.text }]}>
                        Replace scrolling with mindfulness
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="mail-outline"
                            size={24}
                            color={theme.primary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    borderColor: errors.email
                                        ? theme.error
                                        : theme.border,
                                    color: theme.text,
                                    backgroundColor: theme.card,
                                },
                            ]}
                            placeholder="Email"
                            placeholderTextColor={theme.placeholder}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        {errors.email && (
                            <Text
                                style={[
                                    styles.errorText,
                                    { color: theme.error },
                                ]}
                            >
                                {errors.email}
                            </Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={24}
                            color={theme.primary}
                            style={styles.inputIcon}
                        />
                        <View
                            style={[
                                styles.passwordContainer,
                                {
                                    borderColor: errors.password
                                        ? theme.error
                                        : theme.border,
                                    backgroundColor: theme.card,
                                },
                            ]}
                        >
                            <TextInput
                                style={[
                                    styles.passwordInput,
                                    { color: theme.text },
                                ]}
                                placeholder="Password"
                                placeholderTextColor={theme.placeholder}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={
                                        showPassword
                                            ? "eye-off-outline"
                                            : "eye-outline"
                                    }
                                    size={24}
                                    color={theme.primary}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password && (
                            <Text
                                style={[
                                    styles.errorText,
                                    { color: theme.error },
                                ]}
                            >
                                {errors.password}
                            </Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.loginButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.registerContainer}>
                        <Text
                            style={[styles.registerText, { color: theme.text }]}
                        >
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text
                                style={[
                                    styles.registerLink,
                                    { color: theme.primary },
                                ]}
                            >
                                {" "}
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    appName: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 10,
    },
    tagline: {
        fontSize: 16,
        marginTop: 5,
        textAlign: "center",
    },
    formContainer: {
        width: "100%",
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputIcon: {
        position: "absolute",
        left: 15,
        top: 15,
        zIndex: 1,
    },
    input: {
        height: 55,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 50,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 55,
        borderWidth: 1,
        borderRadius: 10,
    },
    passwordInput: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 50,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 10,
    },
    errorText: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
    },
    loginButton: {
        height: 55,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    registerText: {
        fontSize: 16,
    },
    registerLink: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default LoginScreen;
