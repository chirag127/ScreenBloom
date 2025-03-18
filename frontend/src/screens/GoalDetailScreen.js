import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Modal,
    TextInput,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { timeTrackerAPI } from "../services/api";
import { Ionicons } from "@expo/vector-icons";

const GoalDetailScreen = ({ route, navigation }) => {
    const { goal } = route.params;
    const { theme } = useTheme();

    const [loading, setLoading] = useState(false);
    const [allocateModalVisible, setAllocateModalVisible] = useState(false);
    const [completeModalVisible, setCompleteModalVisible] = useState(false);
    const [timeToAllocate, setTimeToAllocate] = useState("");
    const [completedTime, setCompletedTime] = useState("");

    // Categories for goals
    const categories = [
        { id: "reading", name: "Reading", icon: "book-outline" },
        { id: "exercise", name: "Exercise", icon: "fitness-outline" },
        { id: "meditation", name: "Meditation", icon: "leaf-outline" },
        { id: "learning", name: "Learning", icon: "school-outline" },
        { id: "other", name: "Other", icon: "ellipsis-horizontal-outline" },
    ];

    // Allocate time to goal
    const handleAllocateTime = async () => {
        if (
            !timeToAllocate ||
            isNaN(parseInt(timeToAllocate)) ||
            parseInt(timeToAllocate) <= 0
        ) {
            Alert.alert("Error", "Please enter a valid time in minutes");
            return;
        }

        try {
            setLoading(true);
            await timeTrackerAPI.allocateTime(goal._id, {
                timeToAllocate: parseInt(timeToAllocate),
            });

            setTimeToAllocate("");
            setAllocateModalVisible(false);

            Alert.alert("Success", "Time allocated successfully");
            navigation.goBack();
        } catch (error) {
            console.error("Error allocating time:", error);
            Alert.alert(
                "Error",
                error.msg || "Failed to allocate time. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Mark time as completed
    const handleCompleteTime = async () => {
        if (
            !completedTime ||
            isNaN(parseInt(completedTime)) ||
            parseInt(completedTime) <= 0
        ) {
            Alert.alert("Error", "Please enter a valid time in minutes");
            return;
        }

        try {
            setLoading(true);
            await timeTrackerAPI.completeGoalTime(goal._id, {
                completedTime: parseInt(completedTime),
            });

            setCompletedTime("");
            setCompleteModalVisible(false);

            Alert.alert("Success", "Time marked as completed");
            navigation.goBack();
        } catch (error) {
            console.error("Error completing time:", error);
            Alert.alert(
                "Error",
                "Failed to mark time as completed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Format minutes to hours and minutes
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    // Get category icon
    const getCategoryIcon = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.icon : "ellipsis-horizontal-outline";
    };

    // Get category name
    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "Other";
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Goal Header */}
                <View
                    style={[styles.goalHeader, { backgroundColor: theme.card }]}
                >
                    <View
                        style={[
                            styles.categoryIcon,
                            { backgroundColor: theme.primary },
                        ]}
                    >
                        <Ionicons
                            name={getCategoryIcon(goal.category)}
                            size={30}
                            color="#fff"
                        />
                    </View>
                    <Text style={[styles.goalName, { color: theme.text }]}>
                        {goal.name}
                    </Text>
                    <Text style={[styles.categoryName, { color: theme.muted }]}>
                        {getCategoryName(goal.category)}
                    </Text>

                    <View
                        style={[
                            styles.statusBadge,
                            {
                                backgroundColor: goal.isCompleted
                                    ? theme.success
                                    : theme.primary,
                            },
                        ]}
                    >
                        <Text style={styles.statusText}>
                            {goal.isCompleted ? "Completed" : "In Progress"}
                        </Text>
                    </View>
                </View>

                {/* Goal Progress */}
                <View
                    style={[
                        styles.progressCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        Progress
                    </Text>

                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    backgroundColor: theme.primary,
                                    width: `${Math.min(
                                        100,
                                        (goal.completedTime / goal.targetTime) *
                                            100
                                    )}%`,
                                },
                            ]}
                        />
                    </View>

                    <View style={styles.progressStats}>
                        <View style={styles.progressStat}>
                            <Text
                                style={[
                                    styles.progressValue,
                                    { color: theme.primary },
                                ]}
                            >
                                {formatTime(goal.targetTime)}
                            </Text>
                            <Text
                                style={[
                                    styles.progressLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Target
                            </Text>
                        </View>

                        <View style={styles.progressStat}>
                            <Text
                                style={[
                                    styles.progressValue,
                                    { color: theme.primary },
                                ]}
                            >
                                {formatTime(goal.allocatedTime)}
                            </Text>
                            <Text
                                style={[
                                    styles.progressLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Allocated
                            </Text>
                        </View>

                        <View style={styles.progressStat}>
                            <Text
                                style={[
                                    styles.progressValue,
                                    { color: theme.primary },
                                ]}
                            >
                                {formatTime(goal.completedTime)}
                            </Text>
                            <Text
                                style={[
                                    styles.progressLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Completed
                            </Text>
                        </View>
                    </View>

                    <Text
                        style={[
                            styles.progressPercentage,
                            { color: theme.text },
                        ]}
                    >
                        {Math.round(
                            (goal.completedTime / goal.targetTime) * 100
                        )}
                        % Complete
                    </Text>
                </View>

                {/* Goal Actions */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={() => setAllocateModalVisible(true)}
                    >
                        <Ionicons name="time-outline" size={24} color="#fff" />
                        <Text style={styles.actionButtonText}>
                            Allocate Time
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            { backgroundColor: theme.success },
                        ]}
                        onPress={() => setCompleteModalVisible(true)}
                    >
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={24}
                            color="#fff"
                        />
                        <Text style={styles.actionButtonText}>
                            Mark Completed
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Goal Tips */}
                <View
                    style={[styles.tipsCard, { backgroundColor: theme.card }]}
                >
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        Tips
                    </Text>

                    <View style={styles.tipItem}>
                        <Ionicons
                            name="bulb-outline"
                            size={24}
                            color={theme.primary}
                        />
                        <Text style={[styles.tipText, { color: theme.text }]}>
                            Break your goal into smaller, manageable sessions.
                        </Text>
                    </View>

                    <View style={styles.tipItem}>
                        <Ionicons
                            name="calendar-outline"
                            size={24}
                            color={theme.primary}
                        />
                        <Text style={[styles.tipText, { color: theme.text }]}>
                            Schedule specific times for working on this goal.
                        </Text>
                    </View>

                    <View style={styles.tipItem}>
                        <Ionicons
                            name="trophy-outline"
                            size={24}
                            color={theme.primary}
                        />
                        <Text style={[styles.tipText, { color: theme.text }]}>
                            Celebrate small wins along the way to stay
                            motivated.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Allocate Time Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={allocateModalVisible}
                onRequestClose={() => setAllocateModalVisible(false)}
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
                                Allocate Time
                            </Text>
                            <TouchableOpacity
                                onPress={() => setAllocateModalVisible(false)}
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
                                    styles.allocateTitle,
                                    { color: theme.text },
                                ]}
                            >
                                Allocate time to: {goal.name}
                            </Text>

                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Time to allocate (minutes)
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
                                placeholder="Enter time in minutes"
                                placeholderTextColor={theme.placeholder}
                                value={timeToAllocate}
                                onChangeText={setTimeToAllocate}
                                keyboardType="numeric"
                            />

                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    { backgroundColor: theme.primary },
                                ]}
                                onPress={handleAllocateTime}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.modalButtonText}>
                                        Allocate Time
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Complete Time Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={completeModalVisible}
                onRequestClose={() => setCompleteModalVisible(false)}
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
                                Mark Time Completed
                            </Text>
                            <TouchableOpacity
                                onPress={() => setCompleteModalVisible(false)}
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
                                    styles.allocateTitle,
                                    { color: theme.text },
                                ]}
                            >
                                Mark completed time for: {goal.name}
                            </Text>

                            <Text
                                style={[
                                    styles.allocateInfo,
                                    { color: theme.muted },
                                ]}
                            >
                                Current progress:{" "}
                                {formatTime(goal.completedTime)} /{" "}
                                {formatTime(goal.targetTime)}
                            </Text>

                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Time completed (minutes)
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
                                placeholder="Enter time in minutes"
                                placeholderTextColor={theme.placeholder}
                                value={completedTime}
                                onChangeText={setCompletedTime}
                                keyboardType="numeric"
                            />

                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    { backgroundColor: theme.success },
                                ]}
                                onPress={handleCompleteTime}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.modalButtonText}>
                                        Mark as Completed
                                    </Text>
                                )}
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
    goalHeader: {
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
    categoryIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    goalName: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "center",
    },
    categoryName: {
        fontSize: 16,
        marginBottom: 15,
    },
    statusBadge: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
    },
    statusText: {
        color: "#fff",
        fontWeight: "bold",
    },
    progressCard: {
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
    progressBar: {
        height: 15,
        backgroundColor: "#E0E0E0",
        borderRadius: 7.5,
        marginBottom: 15,
    },
    progressFill: {
        height: "100%",
        borderRadius: 7.5,
    },
    progressStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    progressStat: {
        alignItems: "center",
    },
    progressValue: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    progressLabel: {
        fontSize: 14,
    },
    progressPercentage: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        flex: 0.48,
    },
    actionButtonText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
    tipsCard: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tipItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    tipText: {
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
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
    allocateTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    allocateInfo: {
        fontSize: 14,
        marginBottom: 20,
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
});

export default GoalDetailScreen;
