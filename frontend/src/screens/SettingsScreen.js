import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    Alert,
    Modal,
    TextInput,
    ActivityIndicator,
    Linking,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";
import * as Application from "expo-application";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const SettingsScreen = () => {
    const { theme, themeMode, changeThemeMode, isDark } = useTheme();
    const { user, logout, updateProfile } = useAuth();

    const [loading, setLoading] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [aboutModalVisible, setAboutModalVisible] = useState(false);
    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Notification settings
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [dailyRemindersEnabled, setDailyRemindersEnabled] = useState(false);
    const [achievementAlertsEnabled, setAchievementAlertsEnabled] =
        useState(false);

    // Load notification settings
    useEffect(() => {
        const loadNotificationSettings = async () => {
            try {
                const enabled = await AsyncStorage.getItem(
                    "notificationsEnabled"
                );
                const dailyReminders = await AsyncStorage.getItem(
                    "dailyRemindersEnabled"
                );
                const achievementAlerts = await AsyncStorage.getItem(
                    "achievementAlertsEnabled"
                );

                setNotificationsEnabled(enabled !== "false");
                setDailyRemindersEnabled(dailyReminders !== "false");
                setAchievementAlertsEnabled(achievementAlerts !== "false");
            } catch (error) {
                console.error("Error loading notification settings:", error);
            }
        };

        loadNotificationSettings();
    }, []);

    // Handle theme change
    const handleThemeChange = (mode) => {
        changeThemeMode(mode);
    };

    // Handle logout
    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: () => logout(),
            },
        ]);
    };

    // Handle profile update
    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            await updateProfile({ firstName, lastName });
            setProfileModalVisible(false);
            Alert.alert("Success", "Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Error", "Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Get app version
    const getAppVersion = () => {
        return Application.nativeApplicationVersion || "1.0.0";
    };

    // Get device info
    const getDeviceInfo = () => {
        return `${Device.modelName || "Unknown Device"} (${Device.osName} ${
            Device.osVersion
        })`;
    };

    // Handle password change
    const handlePasswordChange = async () => {
        // Validate passwords
        if (!currentPassword) {
            Alert.alert("Error", "Please enter your current password");
            return;
        }

        if (!newPassword) {
            Alert.alert("Error", "Please enter a new password");
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert("Error", "New password must be at least 6 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            // In a real app, this would call an API endpoint to change the password
            // For now, we'll just simulate success
            setTimeout(() => {
                setPasswordModalVisible(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                Alert.alert("Success", "Password changed successfully");
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Error changing password:", error);
            Alert.alert(
                "Error",
                "Failed to change password. Please try again."
            );
            setLoading(false);
        }
    };

    // Handle notification toggle
    const handleNotificationsToggle = async (value) => {
        try {
            setNotificationsEnabled(value);
            await AsyncStorage.setItem(
                "notificationsEnabled",
                value ? "true" : "false"
            );

            if (value) {
                // Request notification permissions if enabling
                const { status } =
                    await Notifications.requestPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert(
                        "Permission Required",
                        "Please enable notifications in your device settings to receive updates."
                    );
                    setNotificationsEnabled(false);
                    await AsyncStorage.setItem("notificationsEnabled", "false");
                }
            }
        } catch (error) {
            console.error("Error toggling notifications:", error);
        }
    };

    // Handle daily reminders toggle
    const handleDailyRemindersToggle = async (value) => {
        try {
            setDailyRemindersEnabled(value);
            await AsyncStorage.setItem(
                "dailyRemindersEnabled",
                value ? "true" : "false"
            );

            if (value && notificationsEnabled) {
                // Schedule a daily reminder at 9:00 AM
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "ScreenBloom Reminder",
                        body: "Take a moment for mindfulness today!",
                    },
                    trigger: {
                        hour: 9,
                        minute: 0,
                        repeats: true,
                    },
                });
            } else if (!value) {
                // Cancel all scheduled notifications
                await Notifications.cancelAllScheduledNotificationsAsync();
            }
        } catch (error) {
            console.error("Error toggling daily reminders:", error);
        }
    };

    // Handle achievement alerts toggle
    const handleAchievementAlertsToggle = async (value) => {
        try {
            setAchievementAlertsEnabled(value);
            await AsyncStorage.setItem(
                "achievementAlertsEnabled",
                value ? "true" : "false"
            );
        } catch (error) {
            console.error("Error toggling achievement alerts:", error);
        }
    };

    // Open app store for rating
    const handleRateApp = () => {
        // In a real app, this would use the actual app store URL
        const storeUrl =
            Device.osName === "iOS"
                ? "https://apps.apple.com/app/id123456789"
                : "https://play.google.com/store/apps/details?id=com.screenbloom";

        Alert.alert(
            "Rate ScreenBloom",
            "Would you like to rate ScreenBloom in the app store?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Rate Now",
                    onPress: () => Linking.openURL(storeUrl),
                },
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* User Profile Section */}
                <View
                    style={[
                        styles.profileCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <View style={styles.profileHeader}>
                        <View
                            style={[
                                styles.profileAvatar,
                                { backgroundColor: theme.primary },
                            ]}
                        >
                            <Text style={styles.profileInitials}>
                                {user?.firstName?.charAt(0) ||
                                    user?.username?.charAt(0) ||
                                    "U"}
                            </Text>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text
                                style={[
                                    styles.profileName,
                                    { color: theme.text },
                                ]}
                            >
                                {user?.firstName
                                    ? `${user.firstName} ${user.lastName || ""}`
                                    : user?.username}
                            </Text>
                            <Text
                                style={[
                                    styles.profileEmail,
                                    { color: theme.muted },
                                ]}
                            >
                                {user?.email}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.editProfileButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={() => setProfileModalVisible(true)}
                    >
                        <Ionicons
                            name="pencil-outline"
                            size={16}
                            color="#fff"
                        />
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Appearance Section */}
                <View
                    style={[
                        styles.sectionCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        Appearance
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.optionItem,
                            { borderBottomColor: theme.border },
                        ]}
                        onPress={() => handleThemeChange("light")}
                    >
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="sunny-outline"
                                size={22}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.text },
                                ]}
                            >
                                Light Mode
                            </Text>
                        </View>
                        {themeMode === "light" && (
                            <Ionicons
                                name="checkmark-circle"
                                size={22}
                                color={theme.primary}
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.optionItem,
                            { borderBottomColor: theme.border },
                        ]}
                        onPress={() => handleThemeChange("dark")}
                    >
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="moon-outline"
                                size={22}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.text },
                                ]}
                            >
                                Dark Mode
                            </Text>
                        </View>
                        {themeMode === "dark" && (
                            <Ionicons
                                name="checkmark-circle"
                                size={22}
                                color={theme.primary}
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionItem}
                        onPress={() => handleThemeChange("system")}
                    >
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="phone-portrait-outline"
                                size={22}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.text },
                                ]}
                            >
                                System Default
                            </Text>
                        </View>
                        {themeMode === "system" && (
                            <Ionicons
                                name="checkmark-circle"
                                size={22}
                                color={theme.primary}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Notifications Section */}
                <View
                    style={[
                        styles.sectionCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        Notifications
                    </Text>

                    <View
                        style={[
                            styles.optionItem,
                            { borderBottomColor: theme.border },
                        ]}
                    >
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="notifications-outline"
                                size={22}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.text },
                                ]}
                            >
                                Enable Notifications
                            </Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={handleNotificationsToggle}
                            trackColor={{
                                false: theme.disabled,
                                true: theme.primary,
                            }}
                            thumbColor="#fff"
                        />
                    </View>

                    <View
                        style={[
                            styles.optionItem,
                            { borderBottomColor: theme.border },
                        ]}
                    >
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="time-outline"
                                size={22}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.text },
                                ]}
                            >
                                Daily Reminders
                            </Text>
                        </View>
                        <Switch
                            value={dailyRemindersEnabled}
                            onValueChange={handleDailyRemindersToggle}
                            trackColor={{
                                false: theme.disabled,
                                true: theme.primary,
                            }}
                            thumbColor="#fff"
                            disabled={!notificationsEnabled}
                        />
                    </View>

                    <View style={styles.optionItem}>
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="trophy-outline"
                                size={22}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.text },
                                ]}
                            >
                                Achievement Alerts
                            </Text>
                        </View>
                        <Switch
                            value={achievementAlertsEnabled}
                            onValueChange={handleAchievementAlertsToggle}
                            trackColor={{
                                false: theme.disabled,
                                true: theme.primary,
                            }}
                            thumbColor="#fff"
                            disabled={!notificationsEnabled}
                        />
                    </View>
                </View>

                {/* About & Support Section */}
                <View
                    style={[
                        styles.sectionCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        About & Support
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.optionItem,
                            { borderBottomColor: theme.border },
                        ]}
                        onPress={() => setAboutModalVisible(true)}
                    >
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="information-circle-outline"
                                size={22}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.text },
                                ]}
                            >
                                About ScreenBloom
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={22}
                            color={theme.muted}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.optionItem,
                            { borderBottomColor: theme.border },
                        ]}
                        onPress={() => setHelpModalVisible(true)}
                    >
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="help-circle-outline"
                                size={22}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.text },
                                ]}
                            >
                                Help & Support
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={22}
                            color={theme.muted}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionItem}
                        onPress={handleRateApp}
                    >
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="star-outline"
                                size={22}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.text },
                                ]}
                            >
                                Rate the App
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={22}
                            color={theme.muted}
                        />
                    </TouchableOpacity>
                </View>

                {/* Account Section */}
                <View
                    style={[
                        styles.sectionCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        Account
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.optionItem,
                            { borderBottomColor: theme.border },
                        ]}
                        onPress={() => setPasswordModalVisible(true)}
                    >
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={22}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.text },
                                ]}
                            >
                                Change Password
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={22}
                            color={theme.muted}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionItem}
                        onPress={handleLogout}
                    >
                        <View style={styles.optionInfo}>
                            <Ionicons
                                name="log-out-outline"
                                size={22}
                                color={theme.error}
                            />
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: theme.error },
                                ]}
                            >
                                Logout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.versionText, { color: theme.muted }]}>
                    Version {getAppVersion()}
                </Text>
            </ScrollView>

            {/* Edit Profile Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={profileModalVisible}
                onRequestClose={() => setProfileModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.modalContent,
                            { backgroundColor: theme.background },
                        ]}
                    >
                        <View style={styles.modalHeader}>
                            <Text
                                style={[
                                    styles.modalTitle,
                                    { color: theme.text },
                                ]}
                            >
                                Edit Profile
                            </Text>
                            <TouchableOpacity
                                onPress={() => setProfileModalVisible(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color={theme.text}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>
                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                First Name
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor: theme.border,
                                        color: theme.text,
                                        backgroundColor: theme.card,
                                    },
                                ]}
                                placeholder="Enter first name"
                                placeholderTextColor={theme.placeholder}
                                value={firstName}
                                onChangeText={setFirstName}
                            />

                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Last Name
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor: theme.border,
                                        color: theme.text,
                                        backgroundColor: theme.card,
                                    },
                                ]}
                                placeholder="Enter last name"
                                placeholderTextColor={theme.placeholder}
                                value={lastName}
                                onChangeText={setLastName}
                            />

                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    { backgroundColor: theme.primary },
                                ]}
                                onPress={handleUpdateProfile}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.modalButtonText}>
                                        Save Changes
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* About Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={aboutModalVisible}
                onRequestClose={() => setAboutModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.modalContent,
                            { backgroundColor: theme.background },
                        ]}
                    >
                        <View style={styles.modalHeader}>
                            <Text
                                style={[
                                    styles.modalTitle,
                                    { color: theme.text },
                                ]}
                            >
                                About ScreenBloom
                            </Text>
                            <TouchableOpacity
                                onPress={() => setAboutModalVisible(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color={theme.text}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>
                            <View style={styles.aboutHeader}>
                                <Text
                                    style={[
                                        styles.appName,
                                        { color: theme.primary },
                                    ]}
                                >
                                    ScreenBloom
                                </Text>
                                <Text
                                    style={[
                                        styles.appVersion,
                                        { color: theme.muted },
                                    ]}
                                >
                                    Version {getAppVersion()}
                                </Text>
                            </View>

                            <Text
                                style={[
                                    styles.aboutDescription,
                                    { color: theme.text },
                                ]}
                            >
                                ScreenBloom helps you replace mindless scrolling
                                with mindfulness. Track the time you save by not
                                using distracting apps and allocate it to
                                meaningful goals.
                            </Text>

                            <View
                                style={[
                                    styles.aboutFeature,
                                    { borderBottomColor: theme.border },
                                ]}
                            >
                                <Ionicons
                                    name="time-outline"
                                    size={22}
                                    color={theme.primary}
                                />
                                <Text
                                    style={[
                                        styles.aboutFeatureText,
                                        { color: theme.text },
                                    ]}
                                >
                                    Time Swap: Track minutes saved and allocate
                                    them to goals
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.aboutFeature,
                                    { borderBottomColor: theme.border },
                                ]}
                            >
                                <Ionicons
                                    name="game-controller-outline"
                                    size={22}
                                    color={theme.primary}
                                />
                                <Text
                                    style={[
                                        styles.aboutFeatureText,
                                        { color: theme.text },
                                    ]}
                                >
                                    Mini-games: Breathing exercises to unlock
                                    inspirational quotes
                                </Text>
                            </View>

                            <View style={styles.aboutFeature}>
                                <Ionicons
                                    name="shield-outline"
                                    size={22}
                                    color={theme.primary}
                                />
                                <Text
                                    style={[
                                        styles.aboutFeatureText,
                                        { color: theme.text },
                                    ]}
                                >
                                    App Blockers: Customizable with soothing
                                    nature visuals
                                </Text>
                            </View>

                            <Text
                                style={[
                                    styles.deviceInfo,
                                    { color: theme.muted },
                                ]}
                            >
                                Device: {getDeviceInfo()}
                            </Text>

                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    { backgroundColor: theme.primary },
                                ]}
                                onPress={() => setAboutModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Password Change Modal */}
            <PasswordChangeModal
                visible={passwordModalVisible}
                onClose={() => setPasswordModalVisible(false)}
                theme={theme}
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                onSubmit={handlePasswordChange}
                loading={loading}
            />

            {/* Help & Support Modal */}
            <HelpSupportModal
                visible={helpModalVisible}
                onClose={() => setHelpModalVisible(false)}
                theme={theme}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 15,
    },
    profileCard: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    profileInitials: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    profileInfo: {
        marginLeft: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    profileEmail: {
        fontSize: 14,
    },
    editProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 10,
    },
    editProfileText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 5,
    },
    sectionCard: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    optionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    optionInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    optionText: {
        fontSize: 16,
        marginLeft: 15,
    },
    versionText: {
        textAlign: "center",
        fontSize: 12,
        marginTop: 10,
        marginBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    modalBody: {
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    modalButton: {
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    aboutHeader: {
        alignItems: "center",
        marginBottom: 20,
    },
    appName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    appVersion: {
        fontSize: 14,
    },
    aboutDescription: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    aboutFeature: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    aboutFeatureText: {
        fontSize: 14,
        marginLeft: 15,
        flex: 1,
    },
    deviceInfo: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    passwordContainer: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        height: "100%",
        fontSize: 16,
    },
    helpTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    faqItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    faqAnswer: {
        fontSize: 14,
        lineHeight: 20,
    },
    contactText: {
        fontSize: 14,
        marginBottom: 15,
    },
    contactButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    contactButtonText: {
        color: "#fff",
        marginLeft: 10,
        fontWeight: "bold",
    },
});

// Password Change Modal
const PasswordChangeModal = ({
    visible,
    onClose,
    theme,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    onSubmit,
    loading,
}) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <View
                style={[
                    styles.modalContent,
                    { backgroundColor: theme.background },
                ]}
            >
                <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: theme.text }]}>
                        Change Password
                    </Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color={theme.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                    <Text style={[styles.inputLabel, { color: theme.text }]}>
                        Current Password
                    </Text>
                    <View
                        style={[
                            styles.passwordContainer,
                            {
                                borderColor: theme.border,
                                backgroundColor: theme.card,
                            },
                        ]}
                    >
                        <TextInput
                            style={[
                                styles.passwordInput,
                                { color: theme.text },
                            ]}
                            placeholder="Enter current password"
                            placeholderTextColor={theme.placeholder}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <Text style={[styles.inputLabel, { color: theme.text }]}>
                        New Password
                    </Text>
                    <View
                        style={[
                            styles.passwordContainer,
                            {
                                borderColor: theme.border,
                                backgroundColor: theme.card,
                            },
                        ]}
                    >
                        <TextInput
                            style={[
                                styles.passwordInput,
                                { color: theme.text },
                            ]}
                            placeholder="Enter new password"
                            placeholderTextColor={theme.placeholder}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <Text style={[styles.inputLabel, { color: theme.text }]}>
                        Confirm New Password
                    </Text>
                    <View
                        style={[
                            styles.passwordContainer,
                            {
                                borderColor: theme.border,
                                backgroundColor: theme.card,
                            },
                        ]}
                    >
                        <TextInput
                            style={[
                                styles.passwordInput,
                                { color: theme.text },
                            ]}
                            placeholder="Confirm new password"
                            placeholderTextColor={theme.placeholder}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.modalButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={onSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.modalButtonText}>
                                Change Password
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

// Help & Support Modal
const HelpSupportModal = ({ visible, onClose, theme }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <View
                style={[
                    styles.modalContent,
                    { backgroundColor: theme.background },
                ]}
            >
                <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: theme.text }]}>
                        Help & Support
                    </Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color={theme.text} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                    <Text style={[styles.helpTitle, { color: theme.primary }]}>
                        Frequently Asked Questions
                    </Text>

                    <View
                        style={[
                            styles.faqItem,
                            { borderBottomColor: theme.border },
                        ]}
                    >
                        <Text
                            style={[styles.faqQuestion, { color: theme.text }]}
                        >
                            How does ScreenBloom track my time?
                        </Text>
                        <Text
                            style={[styles.faqAnswer, { color: theme.muted }]}
                        >
                            ScreenBloom tracks the time you spend away from
                            distracting apps and allows you to allocate that
                            saved time to meaningful goals.
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.faqItem,
                            { borderBottomColor: theme.border },
                        ]}
                    >
                        <Text
                            style={[styles.faqQuestion, { color: theme.text }]}
                        >
                            How do I unlock quotes?
                        </Text>
                        <Text
                            style={[styles.faqAnswer, { color: theme.muted }]}
                        >
                            Complete mindfulness mini-games to unlock
                            inspirational quotes that you can view in the Quotes
                            section.
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.faqItem,
                            { borderBottomColor: theme.border },
                        ]}
                    >
                        <Text
                            style={[styles.faqQuestion, { color: theme.text }]}
                        >
                            Can I use ScreenBloom offline?
                        </Text>
                        <Text
                            style={[styles.faqAnswer, { color: theme.muted }]}
                        >
                            Yes! ScreenBloom works offline and will sync your
                            data when you reconnect to the internet.
                        </Text>
                    </View>

                    <Text
                        style={[
                            styles.helpTitle,
                            { color: theme.primary, marginTop: 20 },
                        ]}
                    >
                        Contact Us
                    </Text>

                    <Text style={[styles.contactText, { color: theme.text }]}>
                        If you need further assistance, please contact us at:
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.contactButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={() =>
                            Linking.openURL("mailto:support@screenbloom.com")
                        }
                    >
                        <Ionicons name="mail-outline" size={20} color="#fff" />
                        <Text style={styles.contactButtonText}>
                            support@screenbloom.com
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.modalButton,
                            { backgroundColor: theme.primary, marginTop: 30 },
                        ]}
                        onPress={onClose}
                    >
                        <Text style={styles.modalButtonText}>Close</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    </Modal>
);

export default SettingsScreen;
