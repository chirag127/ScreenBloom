import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { timeTrackerAPI, quotesAPI, progressAPI } from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const HomeScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState(null);
    const [quote, setQuote] = useState(null);
    const [streak, setStreak] = useState(null);

    const screenWidth = Dimensions.get("window").width - 40;

    // Fetch dashboard data
    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Update streak (for daily login)
            await progressAPI.updateStreak();

            // Fetch time tracking stats
            const timeStats = await timeTrackerAPI.getStats();

            // Fetch random quote
            const randomQuote = await quotesAPI.getRandomQuote();

            // Fetch streak info
            const streakInfo = await progressAPI.getStreak();

            setStats(timeStats);
            setQuote(randomQuote);
            setStreak(streakInfo);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Handle refresh
    const onRefresh = () => {
        setRefreshing(true);
        fetchDashboardData();
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Format minutes to hours and minutes
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    if (loading) {
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
        <ScrollView
            style={[styles.container, { backgroundColor: theme.background }]}
            contentContainerStyle={styles.contentContainer}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[theme.primary]}
                />
            }
        >
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
                <Text style={[styles.welcomeText, { color: theme.text }]}>
                    Welcome back, {user?.firstName || user?.username}!
                </Text>
                {streak && (
                    <View
                        style={[
                            styles.streakContainer,
                            { backgroundColor: theme.card },
                        ]}
                    >
                        <Ionicons name="flame" size={24} color={theme.accent} />
                        <Text
                            style={[styles.streakText, { color: theme.text }]}
                        >
                            {streak.current} day
                            {streak.current !== 1 ? "s" : ""} streak
                        </Text>
                    </View>
                )}
            </View>

            {/* Time Saved Summary */}
            {stats && (
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
                                {formatTime(stats.totalTimeSaved)}
                            </Text>
                            <Text
                                style={[
                                    styles.timeLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Total
                            </Text>
                        </View>

                        <View style={styles.timeStat}>
                            <Text
                                style={[
                                    styles.timeValue,
                                    { color: theme.primary },
                                ]}
                            >
                                {stats.totalGoals}
                            </Text>
                            <Text
                                style={[
                                    styles.timeLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Goals
                            </Text>
                        </View>

                        <View style={styles.timeStat}>
                            <Text
                                style={[
                                    styles.timeValue,
                                    { color: theme.primary },
                                ]}
                            >
                                {stats.completedGoals}
                            </Text>
                            <Text
                                style={[
                                    styles.timeLabel,
                                    { color: theme.text },
                                ]}
                            >
                                Completed
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.cardButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={() => navigation.navigate("TimeSwap")}
                    >
                        <Text style={styles.cardButtonText}>Manage Time</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Weekly Progress Chart */}
            {stats && stats.weeklyStats && (
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <View style={styles.cardHeader}>
                        <Ionicons
                            name="analytics-outline"
                            size={24}
                            color={theme.primary}
                        />
                        <Text style={[styles.cardTitle, { color: theme.text }]}>
                            Weekly Progress
                        </Text>
                    </View>

                    <LineChart
                        data={{
                            labels: stats.weeklyStats.map(
                                (stat) => stat.date.split("-")[2]
                            ), // Day of month
                            datasets: [
                                {
                                    data: stats.weeklyStats.map(
                                        (stat) => stat.timeSaved
                                    ),
                                },
                            ],
                        }}
                        width={screenWidth}
                        height={180}
                        chartConfig={{
                            backgroundColor: theme.card,
                            backgroundGradientFrom: theme.card,
                            backgroundGradientTo: theme.card,
                            decimalPlaces: 0,
                            color: (opacity = 1) =>
                                `rgba(106, 90, 205, ${opacity})`, // Slate Blue
                            labelColor: (opacity = 1) => theme.text,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: theme.primary,
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
            )}

            {/* Quote of the Day */}
            {quote && (
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <View style={styles.cardHeader}>
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            size={24}
                            color={theme.primary}
                        />
                        <Text style={[styles.cardTitle, { color: theme.text }]}>
                            Inspiration
                        </Text>
                    </View>

                    <Text style={[styles.quoteText, { color: theme.text }]}>
                        "{quote.text}"
                    </Text>

                    <Text style={[styles.quoteAuthor, { color: theme.muted }]}>
                        — {quote.author}
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.cardButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={() => navigation.navigate("Quotes")}
                    >
                        <Text style={styles.cardButtonText}>
                            View All Quotes
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Quick Actions */}
            <View style={[styles.card, { backgroundColor: theme.card }]}>
                <View style={styles.cardHeader}>
                    <Ionicons
                        name="flash-outline"
                        size={24}
                        color={theme.primary}
                    />
                    <Text style={[styles.cardTitle, { color: theme.text }]}>
                        Quick Actions
                    </Text>
                </View>

                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={[
                            styles.quickAction,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={() => navigation.navigate("MiniGames")}
                    >
                        <Ionicons
                            name="game-controller-outline"
                            size={24}
                            color="#fff"
                        />
                        <Text style={styles.quickActionText}>
                            Play Mini-Game
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.quickAction,
                            { backgroundColor: theme.secondary },
                        ]}
                        onPress={() => navigation.navigate("AppBlocker")}
                    >
                        <Ionicons
                            name="shield-outline"
                            size={24}
                            color="#fff"
                        />
                        <Text style={styles.quickActionText}>Block Apps</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: "bold",
    },
    streakContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    streakText: {
        marginLeft: 5,
        fontWeight: "bold",
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
        marginBottom: 15,
    },
    timeStat: {
        alignItems: "center",
    },
    timeValue: {
        fontSize: 20,
        fontWeight: "bold",
    },
    timeLabel: {
        fontSize: 14,
        marginTop: 5,
    },
    cardButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    cardButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    quoteText: {
        fontSize: 16,
        fontStyle: "italic",
        lineHeight: 24,
        marginBottom: 10,
    },
    quoteAuthor: {
        fontSize: 14,
        textAlign: "right",
        marginBottom: 15,
    },
    quickActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    quickAction: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        flex: 0.48,
    },
    quickActionText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
});

export default HomeScreen;
