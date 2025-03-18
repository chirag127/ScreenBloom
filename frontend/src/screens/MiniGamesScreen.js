import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
    Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { miniGamesAPI, progressAPI } from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const MiniGamesScreen = ({ navigation }) => {
    const { theme } = useTheme();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [games, setGames] = useState([]);
    const [userProgress, setUserProgress] = useState(null);
    const [streak, setStreak] = useState(null);

    // Game type icons
    const gameTypeIcons = {
        breathing: "leaf-outline",
        meditation: "flower-outline",
        focus: "eye-outline",
        gratitude: "heart-outline",
    };

    // Game type colors
    const gameTypeColors = {
        breathing: ["#4CAF50", "#81C784"],
        meditation: ["#9C27B0", "#CE93D8"],
        focus: ["#2196F3", "#90CAF9"],
        gratitude: ["#FF9800", "#FFCC80"],
    };

    // Fetch available games
    const fetchGames = async () => {
        try {
            setLoading(true);
            const gamesData = await miniGamesAPI.getAvailableGames();
            const progressData = await progressAPI.getUserProgress();
            const streakData = await progressAPI.getStreak();

            setGames(gamesData);
            setUserProgress(progressData);
            setStreak(streakData);
        } catch (error) {
            console.error("Error fetching games:", error);
            Alert.alert(
                "Error",
                "Failed to load mini-games. Please try again."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Handle refresh
    const onRefresh = () => {
        setRefreshing(true);
        fetchGames();
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchGames();
    }, []);

    // Check if a game is completed today
    const isCompletedToday = (gameId) => {
        if (!userProgress || !userProgress.miniGamesCompleted) return false;

        const today = new Date().toDateString();

        return userProgress.miniGamesCompleted.some((game) => {
            const completedDate = new Date(game.completedAt).toDateString();
            return game.miniGame === gameId && completedDate === today;
        });
    };

    // Format duration in seconds to minutes and seconds
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        }
        return `${remainingSeconds}s`;
    };

    // Get difficulty label
    const getDifficultyLabel = (difficulty) => {
        switch (difficulty) {
            case "beginner":
                return "Beginner";
            case "intermediate":
                return "Intermediate";
            case "advanced":
                return "Advanced";
            default:
                return difficulty;
        }
    };

    if (loading && !games.length) {
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
                {/* Streak Banner */}
                {streak && (
                    <View
                        style={[
                            styles.streakBanner,
                            { backgroundColor: theme.card },
                        ]}
                    >
                        <View style={styles.streakInfo}>
                            <Ionicons
                                name="flame"
                                size={24}
                                color={theme.accent}
                            />
                            <Text
                                style={[
                                    styles.streakText,
                                    { color: theme.text },
                                ]}
                            >
                                {streak.current} day
                                {streak.current !== 1 ? "s" : ""} streak
                            </Text>
                        </View>
                        <Text
                            style={[
                                styles.streakSubtext,
                                { color: theme.muted },
                            ]}
                        >
                            Keep practicing mindfulness daily!
                        </Text>
                    </View>
                )}

                {/* Games List */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    Mini-Games
                </Text>

                {games && games.length > 0 ? (
                    games.map((game) => {
                        const isCompleted = isCompletedToday(game._id);
                        const gradientColors = gameTypeColors[game.type] || [
                            "#6A5ACD",
                            "#9370DB",
                        ];

                        return (
                            <TouchableOpacity
                                key={game._id}
                                style={[
                                    styles.gameCard,
                                    { backgroundColor: theme.card },
                                ]}
                                onPress={() =>
                                    navigation.navigate("MiniGameDetail", {
                                        game,
                                    })
                                }
                            >
                                <LinearGradient
                                    colors={gradientColors}
                                    style={styles.gameImageContainer}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Ionicons
                                        name={
                                            gameTypeIcons[game.type] ||
                                            "game-controller-outline"
                                        }
                                        size={40}
                                        color="#fff"
                                    />
                                </LinearGradient>

                                <View style={styles.gameInfo}>
                                    <View style={styles.gameHeader}>
                                        <Text
                                            style={[
                                                styles.gameName,
                                                { color: theme.text },
                                            ]}
                                        >
                                            {game.name}
                                        </Text>
                                        {isCompleted && (
                                            <View
                                                style={[
                                                    styles.completedBadge,
                                                    {
                                                        backgroundColor:
                                                            theme.success,
                                                    },
                                                ]}
                                            >
                                                <Ionicons
                                                    name="checkmark"
                                                    size={12}
                                                    color="#fff"
                                                />
                                                <Text
                                                    style={styles.completedText}
                                                >
                                                    Done Today
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    <Text
                                        style={[
                                            styles.gameDescription,
                                            { color: theme.muted },
                                        ]}
                                    >
                                        {game.description}
                                    </Text>

                                    <View style={styles.gameDetails}>
                                        <View style={styles.gameDetail}>
                                            <Ionicons
                                                name="time-outline"
                                                size={16}
                                                color={theme.primary}
                                            />
                                            <Text
                                                style={[
                                                    styles.gameDetailText,
                                                    { color: theme.text },
                                                ]}
                                            >
                                                {formatDuration(game.duration)}
                                            </Text>
                                        </View>

                                        <View style={styles.gameDetail}>
                                            <Ionicons
                                                name="stats-chart-outline"
                                                size={16}
                                                color={theme.primary}
                                            />
                                            <Text
                                                style={[
                                                    styles.gameDetailText,
                                                    { color: theme.text },
                                                ]}
                                            >
                                                {getDifficultyLabel(
                                                    game.difficulty
                                                )}
                                            </Text>
                                        </View>

                                        <View style={styles.gameDetail}>
                                            <Ionicons
                                                name="ribbon-outline"
                                                size={16}
                                                color={theme.primary}
                                            />
                                            <Text
                                                style={[
                                                    styles.gameDetailText,
                                                    { color: theme.text },
                                                ]}
                                            >
                                                Unlocks Quote
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                ) : (
                    <View
                        style={[
                            styles.emptyContainer,
                            { backgroundColor: theme.card },
                        ]}
                    >
                        <Ionicons
                            name="game-controller-outline"
                            size={48}
                            color={theme.muted}
                        />
                        <Text style={[styles.emptyText, { color: theme.text }]}>
                            No mini-games available
                        </Text>
                        <Text
                            style={[
                                styles.emptySubtext,
                                { color: theme.muted },
                            ]}
                        >
                            Complete existing games to unlock more
                        </Text>
                    </View>
                )}

                {/* Achievements Section */}
                {userProgress &&
                    userProgress.achievements &&
                    userProgress.achievements.length > 0 && (
                        <>
                            <Text
                                style={[
                                    styles.sectionTitle,
                                    { color: theme.text, marginTop: 20 },
                                ]}
                            >
                                Your Achievements
                            </Text>

                            <View
                                style={[
                                    styles.achievementsContainer,
                                    { backgroundColor: theme.card },
                                ]}
                            >
                                {userProgress.achievements.map(
                                    (achievement, index) => (
                                        <View
                                            key={index}
                                            style={styles.achievement}
                                        >
                                            <View
                                                style={[
                                                    styles.achievementIcon,
                                                    {
                                                        backgroundColor:
                                                            theme.primary,
                                                    },
                                                ]}
                                            >
                                                <Ionicons
                                                    name={
                                                        achievement.icon ||
                                                        "trophy-outline"
                                                    }
                                                    size={20}
                                                    color="#fff"
                                                />
                                            </View>
                                            <View
                                                style={styles.achievementInfo}
                                            >
                                                <Text
                                                    style={[
                                                        styles.achievementName,
                                                        { color: theme.text },
                                                    ]}
                                                >
                                                    {achievement.name}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.achievementDescription,
                                                        { color: theme.muted },
                                                    ]}
                                                >
                                                    {achievement.description}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                )}
                            </View>
                        </>
                    )}
            </ScrollView>
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
    streakBanner: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    streakInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    streakText: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    streakSubtext: {
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    gameCard: {
        flexDirection: "row",
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: "hidden",
    },
    gameImageContainer: {
        width: 100,
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
    },
    gameInfo: {
        flex: 1,
        padding: 15,
    },
    gameHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    gameName: {
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
    },
    completedBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 10,
    },
    completedText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
        marginLeft: 2,
    },
    gameDescription: {
        fontSize: 14,
        marginBottom: 10,
    },
    gameDetails: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    gameDetail: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
        marginBottom: 5,
    },
    gameDetailText: {
        fontSize: 12,
        marginLeft: 5,
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
    achievementsContainer: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    achievement: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    achievementIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    achievementInfo: {
        flex: 1,
    },
    achievementName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    achievementDescription: {
        fontSize: 14,
    },
});

export default MiniGamesScreen;
