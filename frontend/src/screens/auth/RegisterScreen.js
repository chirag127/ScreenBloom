import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
    const { register, loading } = useAuth();
    const { theme } = useTheme();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    // Validate form
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!username) {
            errors.username = "Username is required";
            isValid = false;
        } else if (username.length < 3) {
            errors.username = "Username must be at least 3 characters";
            isValid = false;
        }

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

        if (!confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    // Handle registration
    const handleRegister = async () => {
        if (validateForm()) {
            try {
                await register({
                    username,
                    email,
                    password,
                    firstName,
                    lastName,
                });
                // Navigation is handled by the AppNavigator based on auth state
            } catch (error) {
                Alert.alert(
                    "Registration Failed",
                    error.msg ||
                        "An error occurred during registration. Please try again.",
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
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerText, { color: theme.primary }]}>
                        Create Account
                    </Text>
                    <Text style={[styles.subHeaderText, { color: theme.text }]}>
                        Join ScreenBloom and start your mindfulness journey
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="person-outline"
                            size={24}
                            color={theme.primary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    borderColor: errors.username
                                        ? theme.error
                                        : theme.border,
                                    color: theme.text,
                                    backgroundColor: theme.card,
                                },
                            ]}
                            placeholder="Username"
                            placeholderTextColor={theme.placeholder}
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                        {errors.username && (
                            <Text
                                style={[
                                    styles.errorText,
                                    { color: theme.error },
                                ]}
                            >
                                {errors.username}
                            </Text>
                        )}
                    </View>

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

                    <View style={styles.nameContainer}>
                        <View
                            style={[
                                styles.inputContainer,
                                { flex: 1, marginRight: 5 },
                            ]}
                        >
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor: theme.border,
                                        color: theme.text,
                                        backgroundColor: theme.card,
                                        paddingHorizontal: 15,
                                    },
                                ]}
                                placeholder="First Name (Optional)"
                                placeholderTextColor={theme.placeholder}
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>

                        <View
                            style={[
                                styles.inputContainer,
                                { flex: 1, marginLeft: 5 },
                            ]}
                        >
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor: theme.border,
                                        color: theme.text,
                                        backgroundColor: theme.card,
                                        paddingHorizontal: 15,
                                    },
                                ]}
                                placeholder="Last Name (Optional)"
                                placeholderTextColor={theme.placeholder}
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
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
                                    borderColor: errors.confirmPassword
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
                                placeholder="Confirm Password"
                                placeholderTextColor={theme.placeholder}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                <Ionicons
                                    name={
                                        showConfirmPassword
                                            ? "eye-off-outline"
                                            : "eye-outline"
                                    }
                                    size={24}
                                    color={theme.primary}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && (
                            <Text
                                style={[
                                    styles.errorText,
                                    { color: theme.error },
                                ]}
                            >
                                {errors.confirmPassword}
                            </Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.registerButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.registerButtonText}>
                                Create Account
                            </Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={[styles.loginText, { color: theme.text }]}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text
                                style={[
                                    styles.loginLink,
                                    { color: theme.primary },
                                ]}
                            >
                                {" "}
                                Sign In
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
        padding: 20,
    },
    headerContainer: {
        alignItems: "center",
        marginVertical: 30,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "bold",
    },
    subHeaderText: {
        fontSize: 16,
        marginTop: 5,
        textAlign: "center",
    },
    formContainer: {
        width: "100%",
    },
    inputContainer: {
        marginBottom: 15,
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    registerButton: {
        height: 55,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    registerButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    loginText: {
        fontSize: 16,
    },
    loginLink: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default RegisterScreen;
