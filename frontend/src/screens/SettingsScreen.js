import React, { useState } from "react";
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
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";
import * as Application from "expo-application";

const SettingsScreen = () => {
    const { theme, themeMode, changeThemeMode, isDark } = useTheme();
    const { user, logout, updateProfile } = useAuth();

    const [loading, setLoading] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [aboutModalVisible, setAboutModalVisible] = useState(false);

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
                            value={user?.preferences?.notifications?.enabled}
                            trackColor={{
                                false: theme.disabled,
                                true: theme.primary,
                            }}
                            thumbColor="#fff"
                            // In a real app, this would update the user preferences
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
                            value={
                                user?.preferences?.notifications?.dailyReminder
                            }
                            trackColor={{
                                false: theme.disabled,
                                true: theme.primary,
                            }}
                            thumbColor="#fff"
                            // In a real app, this would update the user preferences
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
                            value={
                                user?.preferences?.notifications
                                    ?.achievementAlerts
                            }
                            trackColor={{
                                false: theme.disabled,
                                true: theme.primary,
                            }}
                            thumbColor="#fff"
                            // In a real app, this would update the user preferences
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

                    <TouchableOpacity style={styles.optionItem}>
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
});

export default SettingsScreen;
