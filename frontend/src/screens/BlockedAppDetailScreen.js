import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Switch,
    Alert,
    ActivityIndicator,
    Image,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { appBlockerAPI } from "../services/api";
import { Ionicons } from "@expo/vector-icons";

const BlockedAppDetailScreen = ({ route, navigation }) => {
    const { app } = route.params;
    const { theme } = useTheme();

    const [loading, setLoading] = useState(false);
    const [isBlocked, setIsBlocked] = useState(app.isBlocked);
    const [customMessage, setCustomMessage] = useState(app.customMessage);
    const [selectedBackground, setSelectedBackground] = useState(
        app.backgroundImage
    );

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

    // Days of the week
    const daysOfWeek = [
        { id: 0, name: "Sunday", short: "Sun" },
        { id: 1, name: "Monday", short: "Mon" },
        { id: 2, name: "Tuesday", short: "Tue" },
        { id: 3, name: "Wednesday", short: "Wed" },
        { id: 4, name: "Thursday", short: "Thu" },
        { id: 5, name: "Friday", short: "Fri" },
        { id: 6, name: "Saturday", short: "Sat" },
    ];

    // Save app settings
    const saveSettings = async () => {
        try {
            setLoading(true);

            await appBlockerAPI.updateBlockedApp(app._id, {
                isBlocked,
                customMessage,
                backgroundImage: selectedBackground,
            });

            Alert.alert("Success", "App settings updated successfully");
            navigation.goBack();
        } catch (error) {
            console.error("Error updating app settings:", error);
            Alert.alert(
                "Error",
                "Failed to update app settings. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Delete app from blockers
    const deleteApp = async () => {
        Alert.alert(
            "Remove App",
            `Are you sure you want to remove ${app.appName} from your blocked apps?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            await appBlockerAPI.removeBlockedApp(app._id);
                            navigation.goBack();
                        } catch (error) {
                            console.error("Error removing app:", error);
                            Alert.alert(
                                "Error",
                                "Failed to remove app. Please try again."
                            );
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    // Get schedule for a day
    const getScheduleForDay = (dayId) => {
        const schedule = app.blockSchedule.find((s) => s.dayOfWeek === dayId);
        if (schedule) {
            return `${schedule.startTime} - ${schedule.endTime}`;
        }
        return "Not blocked";
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* App Header */}
                <View
                    style={[styles.appHeader, { backgroundColor: theme.card }]}
                >
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
                    <Text style={[styles.appName, { color: theme.text }]}>
                        {app.appName}
                    </Text>
                    <Text style={[styles.packageName, { color: theme.muted }]}>
                        {app.packageName || "No package name"}
                    </Text>
                </View>

                {/* Blocking Status */}
                <View
                    style={[
                        styles.settingCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <View style={styles.settingHeader}>
                        <Text
                            style={[styles.settingTitle, { color: theme.text }]}
                        >
                            Blocking Status
                        </Text>
                    </View>

                    <View style={styles.blockingStatus}>
                        <Text
                            style={[
                                styles.blockingStatusText,
                                { color: theme.text },
                            ]}
                        >
                            Block this app
                        </Text>
                        <Switch
                            value={isBlocked}
                            onValueChange={setIsBlocked}
                            trackColor={{
                                false: theme.disabled,
                                true: theme.primary,
                            }}
                            thumbColor="#fff"
                        />
                    </View>
                </View>

                {/* Blocking Schedule */}
                <View
                    style={[
                        styles.settingCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <View style={styles.settingHeader}>
                        <Text
                            style={[styles.settingTitle, { color: theme.text }]}
                        >
                            Blocking Schedule
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.editButton,
                                { backgroundColor: theme.primary },
                            ]}
                            onPress={() =>
                                Alert.alert(
                                    "Info",
                                    "Schedule editing will be available in the next update."
                                )
                            }
                        >
                            <Ionicons
                                name="pencil-outline"
                                size={16}
                                color="#fff"
                            />
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    {daysOfWeek.map((day) => (
                        <View key={day.id} style={styles.scheduleItem}>
                            <Text
                                style={[styles.dayName, { color: theme.text }]}
                            >
                                {day.name}
                            </Text>
                            <Text
                                style={[
                                    styles.scheduleTime,
                                    { color: theme.muted },
                                ]}
                            >
                                {getScheduleForDay(day.id)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Custom Message */}
                <View
                    style={[
                        styles.settingCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <View style={styles.settingHeader}>
                        <Text
                            style={[styles.settingTitle, { color: theme.text }]}
                        >
                            Custom Message
                        </Text>
                    </View>

                    <TextInput
                        style={[
                            styles.messageInput,
                            {
                                borderColor: theme.border,
                                color: theme.text,
                                backgroundColor: theme.background,
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
                </View>

                {/* Background Image */}
                <View
                    style={[
                        styles.settingCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <View style={styles.settingHeader}>
                        <Text
                            style={[styles.settingTitle, { color: theme.text }]}
                        >
                            Background Image
                        </Text>
                    </View>

                    <View style={styles.backgroundSelector}>
                        {backgroundImages.map((image) => (
                            <TouchableOpacity
                                key={image.id}
                                style={[
                                    styles.backgroundOption,
                                    {
                                        borderColor:
                                            selectedBackground === image.id
                                                ? theme.primary
                                                : theme.border,
                                        borderWidth:
                                            selectedBackground === image.id
                                                ? 2
                                                : 1,
                                    },
                                ]}
                                onPress={() => setSelectedBackground(image.id)}
                            >
                                <Image
                                    source={image.preview}
                                    style={styles.backgroundPreview}
                                />
                                <Text
                                    style={[
                                        styles.backgroundName,
                                        { color: theme.text },
                                    ]}
                                >
                                    {image.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={saveSettings}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>
                                Save Changes
                            </Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.deleteButton,
                            { backgroundColor: theme.error },
                        ]}
                        onPress={deleteApp}
                        disabled={loading}
                    >
                        <Text style={styles.deleteButtonText}>Remove App</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    appHeader: {
        alignItems: "center",
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    appIconPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    appIconText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    appName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    packageName: {
        fontSize: 14,
    },
    settingCard: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    settingHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    settingTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    editButtonText: {
        color: "#fff",
        marginLeft: 5,
        fontSize: 12,
    },
    blockingStatus: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    blockingStatusText: {
        fontSize: 16,
    },
    scheduleItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    dayName: {
        fontSize: 16,
    },
    scheduleTime: {
        fontSize: 14,
    },
    messageInput: {
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
    },
    backgroundSelector: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    backgroundOption: {
        width: "48%",
        borderRadius: 10,
        marginBottom: 10,
        overflow: "hidden",
    },
    backgroundPreview: {
        width: "100%",
        height: 100,
        resizeMode: "cover",
    },
    backgroundName: {
        textAlign: "center",
        padding: 5,
        fontSize: 14,
    },
    actionButtons: {
        marginTop: 10,
        marginBottom: 30,
    },
    saveButton: {
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    deleteButton: {
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default BlockedAppDetailScreen;
