import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { timeTrackerAPI } from "../services/api";
import { Ionicons } from "@expo/vector-icons";

const TimeSwapScreen = ({ navigation }) => {
    const { theme } = useTheme();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [timeTracker, setTimeTracker] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [goalName, setGoalName] = useState("");
    const [goalCategory, setGoalCategory] = useState("reading");
    const [goalTime, setGoalTime] = useState("");
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [allocateModalVisible, setAllocateModalVisible] = useState(false);
    const [timeToAllocate, setTimeToAllocate] = useState("");
    const [completeModalVisible, setCompleteModalVisible] = useState(false);
    const [completedTime, setCompletedTime] = useState("");

    // Categories for goals
    const categories = [
        { id: "reading", name: "Reading", icon: "book-outline" },
        { id: "exercise", name: "Exercise", icon: "fitness-outline" },
        { id: "meditation", name: "Meditation", icon: "leaf-outline" },
        { id: "learning", name: "Learning", icon: "school-outline" },
        { id: "other", name: "Other", icon: "ellipsis-horizontal-outline" },
    ];

    // Fetch time tracker data
    const fetchTimeTracker = async () => {
        try {
            setLoading(true);
            const data = await timeTrackerAPI.getTimeTracker();
            setTimeTracker(data);
        } catch (error) {
            console.error("Error fetching time tracker:", error);
            Alert.alert("Error", "Failed to load time data. Please try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Handle refresh
    const onRefresh = () => {
        setRefreshing(true);
        fetchTimeTracker();
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchTimeTracker();
    }, []);

    // Create a new goal
    const handleCreateGoal = async () => {
        if (!goalName.trim()) {
            Alert.alert("Error", "Please enter a goal name");
            return;
        }

        if (!goalTime || isNaN(parseInt(goalTime)) || parseInt(goalTime) <= 0) {
            Alert.alert("Error", "Please enter a valid time in minutes");
            return;
        }

        try {
            setLoading(true);
            await timeTrackerAPI.createGoal({
                name: goalName,
                category: goalCategory,
                targetTime: parseInt(goalTime),
            });

            // Reset form
            setGoalName("");
            setGoalCategory("reading");
            setGoalTime("");
            setModalVisible(false);

            // Refresh data
            await fetchTimeTracker();
        } catch (error) {
            console.error("Error creating goal:", error);
            Alert.alert("Error", "Failed to create goal. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Allocate time to a goal
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
            await timeTrackerAPI.allocateTime(selectedGoal._id, {
                timeToAllocate: parseInt(timeToAllocate),
            });

            // Reset form
            setTimeToAllocate("");
            setAllocateModalVisible(false);
            setSelectedGoal(null);

            // Refresh data
            await fetchTimeTracker();
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

    // Mark time as completed for a goal
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
            await timeTrackerAPI.completeGoalTime(selectedGoal._id, {
                completedTime: parseInt(completedTime),
            });

            // Reset form
            setCompletedTime("");
            setCompleteModalVisible(false);
            setSelectedGoal(null);

            // Refresh data
            await fetchTimeTracker();
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

    // Calculate available time to allocate
    const calculateAvailableTime = () => {
        if (!timeTracker) return 0;

        const totalAllocatedTime = timeTracker.goals.reduce(
            (total, goal) => total + goal.allocatedTime,
            0
        );

        return Math.max(0, timeTracker.totalTimeSaved - totalAllocatedTime);
    };

    // Get icon for category
    const getCategoryIcon = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.icon : "ellipsis-horizontal-outline";
    };

    if (loading && !timeTracker) {
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
                {/* Time Saved Summary */}
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <View style={styles.cardHeader}>
                        <Ionicons
                            name="time-outline"
                            size={24}
                            color={theme.primary}
                        />
                        <Text style={[styles.cardTitle, { color: theme.text }]}>
                            Time Saved
                        </Text>
                    </View>

                    <View style={styles.timeStats}>
                        <View style={styles.timeStat}>
                            <Text
                                style={[
                                    styles.timeValue,
                                    { color: theme.primary },
                                ]}
                            >
                                {formatTime(timeTracker?.totalTimeSaved || 0)}
                            </Text>
                            <Text
                                style={[
                                    styles.timeLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Total Saved
                            </Text>
                        </View>

                        <View style={styles.timeStat}>
                            <Text
                                style={[
                                    styles.timeValue,
                                    { color: theme.success },
                                ]}
                            >
                                {formatTime(calculateAvailableTime())}
                            </Text>
                            <Text
                                style={[
                                    styles.timeLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Available
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Goals Section */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        Your Goals
                    </Text>
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

                {timeTracker?.goals && timeTracker.goals.length > 0 ? (
                    timeTracker.goals.map((goal) => (
                        <TouchableOpacity
                            key={goal._id}
                            style={[
                                styles.goalCard,
                                { backgroundColor: theme.card },
                            ]}
                            onPress={() =>
                                navigation.navigate("GoalDetail", { goal })
                            }
                        >
                            <View style={styles.goalHeader}>
                                <View style={styles.goalTitleContainer}>
                                    <Ionicons
                                        name={getCategoryIcon(goal.category)}
                                        size={24}
                                        color={theme.primary}
                                    />
                                    <Text
                                        style={[
                                            styles.goalTitle,
                                            { color: theme.text },
                                        ]}
                                    >
                                        {goal.name}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.goalStatus,
                                        {
                                            backgroundColor: goal.isCompleted
                                                ? theme.success
                                                : theme.primary,
                                        },
                                    ]}
                                >
                                    <Text style={styles.goalStatusText}>
                                        {goal.isCompleted
                                            ? "Completed"
                                            : "In Progress"}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.goalProgress}>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            {
                                                backgroundColor: theme.primary,
                                                width: `${Math.min(
                                                    100,
                                                    (goal.completedTime /
                                                        goal.targetTime) *
                                                        100
                                                )}%`,
                                            },
                                        ]}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.progressText,
                                        { color: theme.text },
                                    ]}
                                >
                                    {formatTime(goal.completedTime)} /{" "}
                                    {formatTime(goal.targetTime)}
                                </Text>
                            </View>

                            <View style={styles.goalActions}>
                                <TouchableOpacity
                                    style={[
                                        styles.goalButton,
                                        { backgroundColor: theme.primary },
                                    ]}
                                    onPress={() => {
                                        setSelectedGoal(goal);
                                        setAllocateModalVisible(true);
                                    }}
                                    disabled={calculateAvailableTime() <= 0}
                                >
                                    <Text style={styles.goalButtonText}>
                                        Allocate Time
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.goalButton,
                                        { backgroundColor: theme.success },
                                    ]}
                                    onPress={() => {
                                        setSelectedGoal(goal);
                                        setCompleteModalVisible(true);
                                    }}
                                >
                                    <Text style={styles.goalButtonText}>
                                        Mark Completed
                                    </Text>
                                </TouchableOpacity>
                            </View>
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
                            name="flag-outline"
                            size={48}
                            color={theme.muted}
                        />
                        <Text style={[styles.emptyText, { color: theme.text }]}>
                            You don't have any goals yet
                        </Text>
                        <Text
                            style={[
                                styles.emptySubtext,
                                { color: theme.muted },
                            ]}
                        >
                            Create a goal to start allocating your saved time
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Create Goal Modal */}
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
                                Create New Goal
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

                        <View style={styles.modalBody}>
                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Goal Name
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
                                placeholder="Enter goal name"
                                placeholderTextColor={theme.placeholder}
                                value={goalName}
                                onChangeText={setGoalName}
                            />

                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Category
                            </Text>
                            <View style={styles.categoryContainer}>
                                {categories.map((category) => (
                                    <TouchableOpacity
                                        key={category.id}
                                        style={[
                                            styles.categoryButton,
                                            {
                                                backgroundColor:
                                                    goalCategory === category.id
                                                        ? theme.primary
                                                        : theme.card,
                                                borderColor: theme.border,
                                            },
                                        ]}
                                        onPress={() =>
                                            setGoalCategory(category.id)
                                        }
                                    >
                                        <Ionicons
                                            name={category.icon}
                                            size={20}
                                            color={
                                                goalCategory === category.id
                                                    ? "#fff"
                                                    : theme.text
                                            }
                                        />
                                        <Text
                                            style={[
                                                styles.categoryText,
                                                {
                                                    color:
                                                        goalCategory ===
                                                        category.id
                                                            ? "#fff"
                                                            : theme.text,
                                                },
                                            ]}
                                        >
                                            {category.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Target Time (minutes)
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
                                value={goalTime}
                                onChangeText={setGoalTime}
                                keyboardType="numeric"
                            />

                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    { backgroundColor: theme.primary },
                                ]}
                                onPress={handleCreateGoal}
                            >
                                <Text style={styles.modalButtonText}>
                                    Create Goal
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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
                            {selectedGoal && (
                                <>
                                    <Text
                                        style={[
                                            styles.allocateTitle,
                                            { color: theme.text },
                                        ]}
                                    >
                                        Allocate time to: {selectedGoal.name}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.allocateInfo,
                                            { color: theme.muted },
                                        ]}
                                    >
                                        Available time:{" "}
                                        {formatTime(calculateAvailableTime())}
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
                                    >
                                        <Text style={styles.modalButtonText}>
                                            Allocate Time
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
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
                            {selectedGoal && (
                                <>
                                    <Text
                                        style={[
                                            styles.allocateTitle,
                                            { color: theme.text },
                                        ]}
                                    >
                                        Mark completed time for:{" "}
                                        {selectedGoal.name}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.allocateInfo,
                                            { color: theme.muted },
                                        ]}
                                    >
                                        Current progress:{" "}
                                        {formatTime(selectedGoal.completedTime)}{" "}
                                        / {formatTime(selectedGoal.targetTime)}
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
                                    >
                                        <Text style={styles.modalButtonText}>
                                            Mark as Completed
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
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
    timeStats: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    timeStat: {
        alignItems: "center",
    },
    timeValue: {
        fontSize: 24,
        fontWeight: "bold",
    },
    timeLabel: {
        fontSize: 14,
        marginTop: 5,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    goalCard: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    goalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    goalTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    goalTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    goalStatus: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    goalStatusText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    goalProgress: {
        marginBottom: 15,
    },
    progressBar: {
        height: 10,
        backgroundColor: "#E0E0E0",
        borderRadius: 5,
        marginBottom: 5,
    },
    progressFill: {
        height: "100%",
        borderRadius: 5,
    },
    progressText: {
        fontSize: 14,
        textAlign: "right",
    },
    goalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    goalButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        flex: 0.48,
        alignItems: "center",
    },
    goalButtonText: {
        color: "#fff",
        fontWeight: "bold",
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
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    categoryButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 10,
        width: "48%",
    },
    categoryText: {
        marginLeft: 5,
        fontSize: 14,
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
    allocateTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    allocateInfo: {
        fontSize: 14,
        marginBottom: 20,
    },
});

export default TimeSwapScreen;
