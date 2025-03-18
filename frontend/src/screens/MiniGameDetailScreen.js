import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
    Easing,
    Modal,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { miniGamesAPI } from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const MiniGameDetailScreen = ({ route, navigation }) => {
    const { game } = route.params;
    const { theme } = useTheme();

    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(game.duration);
    const [completionData, setCompletionData] = useState(null);
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    // Animation values
    const breathAnimation = useRef(new Animated.Value(1)).current;
    const timerRef = useRef(null);

    // Game type icons and colors
    const gameTypeIcons = {
        breathing: "leaf-outline",
        meditation: "flower-outline",
        focus: "eye-outline",
        gratitude: "heart-outline",
    };

    const gameTypeColors = {
        breathing: ["#4CAF50", "#81C784"],
        meditation: ["#9C27B0", "#CE93D8"],
        focus: ["#2196F3", "#90CAF9"],
        gratitude: ["#FF9800", "#FFCC80"],
    };

    // Breathing animation phases
    const breathingPhases = [
        { text: "Inhale", duration: 4000, scale: 1.5 },
        { text: "Hold", duration: 4000, scale: 1.5 },
        { text: "Exhale", duration: 4000, scale: 1 },
        { text: "Hold", duration: 4000, scale: 1 },
    ];

    const [currentPhase, setCurrentPhase] = useState(0);
    const [phaseText, setPhaseText] = useState(breathingPhases[0].text);

    // Start the game
    const startGame = () => {
        setIsPlaying(true);
        setIsPaused(false);
        setTimeRemaining(game.duration);
        setCurrentPhase(0);
        setPhaseText(breathingPhases[0].text);

        // Start the timer
        timerRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    completeGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Start breathing animation
        animateBreathing(0);
    };

    // Pause the game
    const pauseGame = () => {
        setIsPaused(true);
        clearInterval(timerRef.current);
    };

    // Resume the game
    const resumeGame = () => {
        setIsPaused(false);

        // Resume the timer
        timerRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    completeGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Resume breathing animation
        animateBreathing(currentPhase);
    };

    // Stop the game
    const stopGame = () => {
        setIsPlaying(false);
        setIsPaused(false);
        clearInterval(timerRef.current);
        breathAnimation.setValue(1);
    };

    // Animate breathing
    const animateBreathing = (phaseIndex) => {
        const phase = breathingPhases[phaseIndex];

        Animated.timing(breathAnimation, {
            toValue: phase.scale,
            duration: phase.duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            if (isPlaying && !isPaused) {
                const nextPhase = (phaseIndex + 1) % breathingPhases.length;
                setCurrentPhase(nextPhase);
                setPhaseText(breathingPhases[nextPhase].text);
                animateBreathing(nextPhase);
            }
        });
    };

    // Complete the game
    const completeGame = async () => {
        try {
            setLoading(true);
            const data = await miniGamesAPI.completeGame(game._id, {
                duration: game.duration,
            });

            setCompletionData(data);
            setShowCompletionModal(true);
        } catch (error) {
            console.error("Error completing game:", error);
            Alert.alert(
                "Error",
                "Failed to record game completion. Please try again."
            );
        } finally {
            setIsPlaying(false);
            setLoading(false);
        }
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    // Format time in seconds to MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
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

    // Get game type label
    const getGameTypeLabel = (type) => {
        switch (type) {
            case "breathing":
                return "Breathing Exercise";
            case "meditation":
                return "Meditation";
            case "focus":
                return "Focus Exercise";
            case "gratitude":
                return "Gratitude Practice";
            default:
                return type;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Game Header */}
                <LinearGradient
                    colors={gameTypeColors[game.type] || ["#6A5ACD", "#9370DB"]}
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.gameIconContainer}>
                        <Ionicons
                            name={
                                gameTypeIcons[game.type] ||
                                "game-controller-outline"
                            }
                            size={60}
                            color="#fff"
                        />
                    </View>
                    <Text style={styles.gameTitle}>{game.name}</Text>
                    <Text style={styles.gameType}>
                        {getGameTypeLabel(game.type)}
                    </Text>
                </LinearGradient>

                {/* Game Details */}
                <View
                    style={[
                        styles.detailsCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        About this Exercise
                    </Text>
                    <Text style={[styles.description, { color: theme.text }]}>
                        {game.description}
                    </Text>

                    <View style={styles.detailsRow}>
                        <View style={styles.detailItem}>
                            <Ionicons
                                name="time-outline"
                                size={20}
                                color={theme.primary}
                            />
                            <Text
                                style={[
                                    styles.detailLabel,
                                    { color: theme.muted },
                                ]}
                            >
                                Duration
                            </Text>
                            <Text
                                style={[
                                    styles.detailValue,
                                    { color: theme.text },
                                ]}
                            >
                                {formatTime(game.duration)}
                            </Text>
                        </View>

                        <View style={styles.detailItem}>
                            <Ionicons
                                name="stats-chart-outline"
                                size={20}
                                color={theme.primary}
                            />
                            <Text
                                style={[
                                    styles.detailLabel,
                                    { color: theme.muted },
                                ]}
                            >
                                Difficulty
                            </Text>
                            <Text
                                style={[
                                    styles.detailValue,
                                    { color: theme.text },
                                ]}
                            >
                                {getDifficultyLabel(game.difficulty)}
                            </Text>
                        </View>

                        <View style={styles.detailItem}>
                            <Ionicons
                                name="ribbon-outline"
                                size={20}
                                color={theme.primary}
                            />
                            <Text
                                style={[
                                    styles.detailLabel,
                                    { color: theme.muted },
                                ]}
                            >
                                Reward
                            </Text>
                            <Text
                                style={[
                                    styles.detailValue,
                                    { color: theme.text },
                                ]}
                            >
                                Quote
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Instructions */}
                <View
                    style={[
                        styles.instructionsCard,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        Instructions
                    </Text>
                    <Text style={[styles.instructions, { color: theme.text }]}>
                        {game.instructions}
                    </Text>
                </View>

                {/* Game Area */}
                {isPlaying ? (
                    <View
                        style={[
                            styles.gameArea,
                            { backgroundColor: theme.card },
                        ]}
                    >
                        <View style={styles.timerContainer}>
                            <Text style={[styles.timer, { color: theme.text }]}>
                                {formatTime(timeRemaining)}
                            </Text>
                        </View>

                        <View style={styles.breathingContainer}>
                            <Text
                                style={[
                                    styles.phaseText,
                                    { color: theme.primary },
                                ]}
                            >
                                {phaseText}
                            </Text>
                            <Animated.View
                                style={[
                                    styles.breathCircle,
                                    {
                                        backgroundColor:
                                            gameTypeColors[game.type][0] ||
                                            theme.primary,
                                        transform: [{ scale: breathAnimation }],
                                    },
                                ]}
                            />
                        </View>

                        <View style={styles.gameControls}>
                            {isPaused ? (
                                <TouchableOpacity
                                    style={[
                                        styles.controlButton,
                                        { backgroundColor: theme.primary },
                                    ]}
                                    onPress={resumeGame}
                                >
                                    <Ionicons
                                        name="play"
                                        size={24}
                                        color="#fff"
                                    />
                                    <Text style={styles.controlButtonText}>
                                        Resume
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={[
                                        styles.controlButton,
                                        { backgroundColor: theme.primary },
                                    ]}
                                    onPress={pauseGame}
                                >
                                    <Ionicons
                                        name="pause"
                                        size={24}
                                        color="#fff"
                                    />
                                    <Text style={styles.controlButtonText}>
                                        Pause
                                    </Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={[
                                    styles.controlButton,
                                    { backgroundColor: theme.error },
                                ]}
                                onPress={stopGame}
                            >
                                <Ionicons name="stop" size={24} color="#fff" />
                                <Text style={styles.controlButtonText}>
                                    Stop
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={[
                            styles.startButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={startGame}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Ionicons name="play" size={24} color="#fff" />
                                <Text style={styles.startButtonText}>
                                    Start Exercise
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                )}
            </ScrollView>

            {/* Completion Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCompletionModal}
                onRequestClose={() => setShowCompletionModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.modalContent,
                            { backgroundColor: theme.background },
                        ]}
                    >
                        <View style={styles.modalHeader}>
                            <LinearGradient
                                colors={["#4CAF50", "#81C784"]}
                                style={styles.successIcon}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Ionicons
                                    name="checkmark"
                                    size={40}
                                    color="#fff"
                                />
                            </LinearGradient>
                            <Text
                                style={[
                                    styles.modalTitle,
                                    { color: theme.text },
                                ]}
                            >
                                Great Job!
                            </Text>
                            <Text
                                style={[
                                    styles.modalSubtitle,
                                    { color: theme.muted },
                                ]}
                            >
                                You've completed {game.name}
                            </Text>
                        </View>

                        <View style={styles.modalBody}>
                            {completionData?.unlockedQuote && (
                                <View
                                    style={[
                                        styles.quoteCard,
                                        { backgroundColor: theme.card },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.quoteTitle,
                                            { color: theme.primary },
                                        ]}
                                    >
                                        New Quote Unlocked!
                                    </Text>
                                    <Text
                                        style={[
                                            styles.quoteText,
                                            { color: theme.text },
                                        ]}
                                    >
                                        "{completionData.unlockedQuote.text}"
                                    </Text>
                                    <Text
                                        style={[
                                            styles.quoteAuthor,
                                            { color: theme.muted },
                                        ]}
                                    >
                                        — {completionData.unlockedQuote.author}
                                    </Text>
                                </View>
                            )}

                            {completionData?.streak && (
                                <View
                                    style={[
                                        styles.streakCard,
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
                                            {completionData.streak.current} day
                                            {completionData.streak.current !== 1
                                                ? "s"
                                                : ""}{" "}
                                            streak
                                        </Text>
                                    </View>
                                    <Text
                                        style={[
                                            styles.streakSubtext,
                                            { color: theme.muted },
                                        ]}
                                    >
                                        Keep it up! Come back tomorrow to
                                        continue your streak.
                                    </Text>
                                </View>
                            )}

                            {completionData?.newAchievements &&
                                completionData.newAchievements.length > 0 && (
                                    <View
                                        style={[
                                            styles.achievementsCard,
                                            { backgroundColor: theme.card },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.achievementsTitle,
                                                { color: theme.primary },
                                            ]}
                                        >
                                            New Achievements!
                                        </Text>
                                        {completionData.newAchievements.map(
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
                                                        style={
                                                            styles.achievementInfo
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.achievementName,
                                                                {
                                                                    color: theme.text,
                                                                },
                                                            ]}
                                                        >
                                                            {achievement.name}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.achievementDescription,
                                                                {
                                                                    color: theme.muted,
                                                                },
                                                            ]}
                                                        >
                                                            {
                                                                achievement.description
                                                            }
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        )}
                                    </View>
                                )}

                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    { backgroundColor: theme.primary },
                                ]}
                                onPress={() => {
                                    setShowCompletionModal(false);
                                    navigation.goBack();
                                }}
                            >
                                <Text style={styles.modalButtonText}>
                                    Continue
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
        padding: 0,
    },
    header: {
        padding: 20,
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 40,
    },
    gameIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    gameTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5,
    },
    gameType: {
        fontSize: 16,
        color: "#fff",
        opacity: 0.9,
    },
    detailsCard: {
        padding: 20,
        margin: 15,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
    },
    detailsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    detailItem: {
        alignItems: "center",
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        marginTop: 5,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
    },
    instructionsCard: {
        padding: 20,
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    instructions: {
        fontSize: 16,
        lineHeight: 24,
    },
    gameArea: {
        margin: 15,
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    timerContainer: {
        marginBottom: 20,
    },
    timer: {
        fontSize: 36,
        fontWeight: "bold",
    },
    breathingContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
    },
    phaseText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    breathCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.8,
    },
    gameControls: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    controlButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 0.45,
    },
    controlButtonText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
    startButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
        padding: 15,
        borderRadius: 10,
    },
    startButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
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
        alignItems: "center",
        marginBottom: 20,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    modalSubtitle: {
        fontSize: 16,
        textAlign: "center",
    },
    modalBody: {
        marginBottom: 10,
    },
    quoteCard: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    quoteTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
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
    },
    streakCard: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    streakInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    streakText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    streakSubtext: {
        fontSize: 14,
    },
    achievementsCard: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    achievementsTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    achievement: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    achievementIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    achievementInfo: {
        flex: 1,
    },
    achievementName: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    achievementDescription: {
        fontSize: 12,
    },
    modalButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default MiniGameDetailScreen;
