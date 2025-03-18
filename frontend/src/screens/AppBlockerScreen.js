import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Switch,
    Modal,
    Alert,
    ActivityIndicator,
    RefreshControl,
    Image,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { appBlockerAPI } from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";

const AppBlockerScreen = ({ navigation }) => {
    const { theme } = useTheme();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [appBlocker, setAppBlocker] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [appName, setAppName] = useState("");
    const [packageName, setPackageName] = useState("");
    const [customMessage, setCustomMessage] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("default-nature");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredApps, setFilteredApps] = useState([]);

    // Background images for blocked apps
    const backgroundImages = [
        {
            id: "default-nature",
            name: "Forest",
            preview: require("../assets/images/placeholder-forest.png"),
        },
        {
            id: "ocean",
            name: "Ocean",
            preview: require("../assets/images/placeholder-ocean.png"),
        },
        {
            id: "mountains",
            name: "Mountains",
            preview: require("../assets/images/placeholder-mountains.png"),
        },
        {
            id: "sunset",
            name: "Sunset",
            preview: require("../assets/images/placeholder-sunset.png"),
        },
        {
            id: "stars",
            name: "Night Sky",
            preview: require("../assets/images/placeholder-stars.png"),
        },
    ];

    // Fetch app blocker data
    const fetchAppBlocker = async () => {
        try {
            setLoading(true);
            const data = await appBlockerAPI.getAppBlocker();
            setAppBlocker(data);
            setFilteredApps(data.blockedApps);
        } catch (error) {
            console.error("Error fetching app blocker:", error);
            Alert.alert(
                "Error",
                "Failed to load app blocker data. Please try again."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Handle refresh
    const onRefresh = () => {
        setRefreshing(true);
        fetchAppBlocker();
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchAppBlocker();
    }, []);

    // Filter apps when search query changes
    useEffect(() => {
        if (appBlocker) {
            if (searchQuery.trim() === "") {
                setFilteredApps(appBlocker.blockedApps);
            } else {
                const filtered = appBlocker.blockedApps.filter((app) =>
                    app.appName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                );
                setFilteredApps(filtered);
            }
        }
    }, [searchQuery, appBlocker]);

    // Add a new app to block
    const handleAddApp = async () => {
        if (!appName.trim()) {
            Alert.alert("Error", "Please enter an app name");
            return;
        }

        try {
            setLoading(true);
            await appBlockerAPI.addBlockedApp({
                appName,
                packageName,
                customMessage:
                    customMessage ||
                    "Take a deep breath. Do you really need to use this app right now?",
                backgroundImage,
            });

            // Reset form
            setAppName("");
            setPackageName("");
            setCustomMessage("");
            setBackgroundImage("default-nature");
            setModalVisible(false);

            // Refresh data
            await fetchAppBlocker();
        } catch (error) {
            console.error("Error adding app:", error);
            Alert.alert(
                "Error",
                error.msg || "Failed to add app. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Toggle app blocking
    const toggleAppBlocking = async (app) => {
        try {
            await appBlockerAPI.updateBlockedApp(app._id, {
                isBlocked: !app.isBlocked,
            });

            // Update local state
            const updatedApps = appBlocker.blockedApps.map((a) =>
                a._id === app._id ? { ...a, isBlocked: !a.isBlocked } : a
            );

            setAppBlocker({
                ...appBlocker,
                blockedApps: updatedApps,
            });

            setFilteredApps(
                filteredApps.map((a) =>
                    a._id === app._id ? { ...a, isBlocked: !a.isBlocked } : a
                )
            );
        } catch (error) {
            console.error("Error toggling app blocking:", error);
            Alert.alert(
                "Error",
                "Failed to update app settings. Please try again."
            );
        }
    };

    // Toggle global blocker settings
    const toggleGlobalSetting = async (setting) => {
        try {
            const updatedSettings = {
                ...appBlocker.globalSettings,
                [setting]: !appBlocker.globalSettings[setting],
            };

            await appBlockerAPI.updateSettings(updatedSettings);

            // Update local state
            setAppBlocker({
                ...appBlocker,
                globalSettings: updatedSettings,
            });
        } catch (error) {
            console.error("Error updating global settings:", error);
            Alert.alert(
                "Error",
                "Failed to update settings. Please try again."
            );
        }
    };

    // Get device info
    const getDeviceInfo = () => {
        return `${Device.modelName || "Unknown Device"} (${Device.osName} ${
            Device.osVersion
        })`;
    };

    if (loading && !appBlocker) {
        return (
            <View
                style={[
                    styles.loadingContainer,
                    { backgroundColor: theme.background },
                ]}
            >
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[theme.primary]}
                    />
                }
            >
                {/* Global Settings */}
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <View style={styles.cardHeader}>
                        <Ionicons
                            name="settings-outline"
                            size={24}
                            color={theme.primary}
                        />
                        <Text style={[styles.cardTitle, { color: theme.text }]}>
                            Global Settings
                        </Text>
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text
                                style={[
                                    styles.settingTitle,
                                    { color: theme.text },
                                ]}
                            >
                                Enable All Blockers
                            </Text>
                            <Text
                                style={[
                                    styles.settingDescription,
                                    { color: theme.muted },
                                ]}
                            >
                                Turn on/off all app blockers at once
                            </Text>
                        </View>
                        <Switch
                            value={appBlocker?.globalSettings.enableAllBlockers}
                            onValueChange={() =>
                                toggleGlobalSetting("enableAllBlockers")
                            }
                            trackColor={{
                                false: theme.disabled,
                                true: theme.primary,
                            }}
                            thumbColor="#fff"
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text
                                style={[
                                    styles.settingTitle,
                                    { color: theme.text },
                                ]}
                            >
                                Allow Breaks
                            </Text>
                            <Text
                                style={[
                                    styles.settingDescription,
                                    { color: theme.muted },
                                ]}
                            >
                                Allow temporary access to blocked apps
                            </Text>
                        </View>
                        <Switch
                            value={appBlocker?.globalSettings.allowBreaks}
                            onValueChange={() =>
                                toggleGlobalSetting("allowBreaks")
                            }
                            trackColor={{
                                false: theme.disabled,
                                true: theme.primary,
                            }}
                            thumbColor="#fff"
                        />
                    </View>

                    <Text style={[styles.deviceInfo, { color: theme.muted }]}>
                        Current device: {getDeviceInfo()}
                    </Text>
                </View>

                {/* Search and Add */}
                <View style={styles.searchContainer}>
                    <View
                        style={[
                            styles.searchBar,
                            {
                                backgroundColor: theme.card,
                                borderColor: theme.border,
                            },
                        ]}
                    >
                        <Ionicons
                            name="search-outline"
                            size={20}
                            color={theme.muted}
                        />
                        <TextInput
                            style={[styles.searchInput, { color: theme.text }]}
                            placeholder="Search apps..."
                            placeholderTextColor={theme.placeholder}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery ? (
                            <TouchableOpacity
                                onPress={() => setSearchQuery("")}
                            >
                                <Ionicons
                                    name="close-circle"
                                    size={20}
                                    color={theme.muted}
                                />
                            </TouchableOpacity>
                        ) : null}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.addButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Ionicons name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Blocked Apps List */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    Blocked Apps
                </Text>

                {filteredApps && filteredApps.length > 0 ? (
                    filteredApps.map((app) => (
                        <TouchableOpacity
                            key={app._id}
                            style={[
                                styles.appCard,
                                { backgroundColor: theme.card },
                            ]}
                            onPress={() =>
                                navigation.navigate("BlockedAppDetail", { app })
                            }
                        >
                            <View style={styles.appInfo}>
                                <View
                                    style={[
                                        styles.appIconPlaceholder,
                                        { backgroundColor: theme.primary },
                                    ]}
                                >
                                    <Text style={styles.appIconText}>
                                        {app.appName.charAt(0)}
                                    </Text>
                                </View>
                                <View style={styles.appDetails}>
                                    <Text
                                        style={[
                                            styles.appName,
                                            { color: theme.text },
                                        ]}
                                    >
                                        {app.appName}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.packageName,
                                            { color: theme.muted },
                                        ]}
                                    >
                                        {app.packageName || "No package name"}
                                    </Text>
                                </View>
                            </View>

                            <Switch
                                value={app.isBlocked}
                                onValueChange={() => toggleAppBlocking(app)}
                                trackColor={{
                                    false: theme.disabled,
                                    true: theme.primary,
                                }}
                                thumbColor="#fff"
                            />
                        </TouchableOpacity>
                    ))
                ) : (
                    <View
                        style={[
                            styles.emptyContainer,
                            { backgroundColor: theme.card },
                        ]}
                    >
                        <Ionicons
                            name="shield-outline"
                            size={48}
                            color={theme.muted}
                        />
                        <Text style={[styles.emptyText, { color: theme.text }]}>
                            No apps blocked yet
                        </Text>
                        <Text
                            style={[
                                styles.emptySubtext,
                                { color: theme.muted },
                            ]}
                        >
                            Add apps you want to limit your time on
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Add App Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
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
                                Add App to Block
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color={theme.text}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                App Name*
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
                                placeholder="Enter app name (e.g., Instagram)"
                                placeholderTextColor={theme.placeholder}
                                value={appName}
                                onChangeText={setAppName}
                            />

                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Package Name (Optional)
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
                                placeholder="com.example.app"
                                placeholderTextColor={theme.placeholder}
                                value={packageName}
                                onChangeText={setPackageName}
                            />

                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Custom Message (Optional)
                            </Text>
                            <TextInput
                                style={[
                                    styles.textArea,
                                    {
                                        borderColor: theme.border,
                                        color: theme.text,
                                        backgroundColor: theme.card,
                                    },
                                ]}
                                placeholder="Message to show when app is blocked"
                                placeholderTextColor={theme.placeholder}
                                value={customMessage}
                                onChangeText={setCustomMessage}
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"
                            />

                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Background Image
                            </Text>
                            <View style={styles.imageSelector}>
                                {backgroundImages.map((image) => (
                                    <TouchableOpacity
                                        key={image.id}
                                        style={[
                                            styles.imageOption,
                                            {
                                                borderColor:
                                                    backgroundImage === image.id
                                                        ? theme.primary
                                                        : theme.border,
                                                borderWidth:
                                                    backgroundImage === image.id
                                                        ? 2
                                                        : 1,
                                            },
                                        ]}
                                        onPress={() =>
                                            setBackgroundImage(image.id)
                                        }
                                    >
                                        <Image
                                            source={image.preview}
                                            style={styles.imagePreview}
                                        />
                                        <Text
                                            style={[
                                                styles.imageName,
                                                { color: theme.text },
                                            ]}
                                        >
                                            {image.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    { backgroundColor: theme.primary },
                                ]}
                                onPress={handleAddApp}
                            >
                                <Text style={styles.modalButtonText}>
                                    Add App
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
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
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    settingInfo: {
        flex: 1,
        marginRight: 10,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    settingDescription: {
        fontSize: 14,
    },
    deviceInfo: {
        fontSize: 12,
        marginTop: 15,
        textAlign: "center",
    },
    searchContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    addButton: {
        width: 45,
        height: 45,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    appCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    appInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    appIconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    appIconText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    appDetails: {
        marginLeft: 15,
        flex: 1,
    },
    appName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    packageName: {
        fontSize: 12,
    },
    emptyContainer: {
        padding: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
    },
    emptySubtext: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        maxHeight: "80%",
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
    textArea: {
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    imageSelector: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    imageOption: {
        width: "48%",
        borderRadius: 10,
        marginBottom: 10,
        overflow: "hidden",
    },
    imagePreview: {
        width: "100%",
        height: 100,
        resizeMode: "cover",
    },
    imageName: {
        textAlign: "center",
        padding: 5,
        fontSize: 14,
    },
    modalButton: {
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AppBlockerScreen;
