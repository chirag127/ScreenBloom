import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Share,
    Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { quotesAPI } from "../services/api";
import { Ionicons } from "@expo/vector-icons";

const QuotesScreen = () => {
    const { theme } = useTheme();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [quotes, setQuotes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [filteredQuotes, setFilteredQuotes] = useState([]);

    // Categories for quotes
    const categories = [
        { id: "all", name: "All Quotes", icon: "list-outline" },
        { id: "mindfulness", name: "Mindfulness", icon: "leaf-outline" },
        { id: "productivity", name: "Productivity", icon: "time-outline" },
        { id: "motivation", name: "Motivation", icon: "flame-outline" },
        { id: "wellness", name: "Wellness", icon: "heart-outline" },
        { id: "general", name: "General", icon: "ellipsis-horizontal-outline" },
    ];

    // Fetch unlocked quotes
    const fetchQuotes = async () => {
        try {
            setLoading(true);
            const data = await quotesAPI.getUnlockedQuotes();
            setQuotes(data);
            setFilteredQuotes(data);
        } catch (error) {
            console.error("Error fetching quotes:", error);
            Alert.alert("Error", "Failed to load quotes. Please try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Handle refresh
    const onRefresh = () => {
        setRefreshing(true);
        fetchQuotes();
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchQuotes();
    }, []);

    // Filter quotes when category changes
    useEffect(() => {
        if (selectedCategory === "all") {
            setFilteredQuotes(quotes);
        } else {
            const filtered = quotes.filter(
                (quote) => quote.category === selectedCategory
            );
            setFilteredQuotes(filtered);
        }
    }, [selectedCategory, quotes]);

    // Share a quote
    const shareQuote = async (quote) => {
        try {
            await Share.share({
                message: `"${quote.text}" — ${quote.author}\n\nShared from ScreenBloom`,
            });
        } catch (error) {
            console.error("Error sharing quote:", error);
        }
    };

    // Get category icon
    const getCategoryIcon = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.icon : "ellipsis-horizontal-outline";
    };

    // Get category color
    const getCategoryColor = (categoryId) => {
        switch (categoryId) {
            case "mindfulness":
                return "#4CAF50"; // Green
            case "productivity":
                return "#2196F3"; // Blue
            case "motivation":
                return "#FF9800"; // Orange
            case "wellness":
                return "#E91E63"; // Pink
            case "general":
            default:
                return "#9C27B0"; // Purple
        }
    };

    if (loading && !quotes.length) {
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
            {/* Category Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
                contentContainerStyle={styles.categoriesContent}
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryTab,
                            {
                                backgroundColor:
                                    selectedCategory === category.id
                                        ? theme.primary
                                        : theme.card,
                                borderColor: theme.border,
                            },
                        ]}
                        onPress={() => setSelectedCategory(category.id)}
                    >
                        <Ionicons
                            name={category.icon}
                            size={18}
                            color={
                                selectedCategory === category.id
                                    ? "#fff"
                                    : theme.text
                            }
                        />
                        <Text
                            style={[
                                styles.categoryText,
                                {
                                    color:
                                        selectedCategory === category.id
                                            ? "#fff"
                                            : theme.text,
                                },
                            ]}
                        >
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Quotes List */}
            <ScrollView
                contentContainerStyle={styles.quotesContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[theme.primary]}
                    />
                }
            >
                {filteredQuotes && filteredQuotes.length > 0 ? (
                    filteredQuotes.map((quote, index) => (
                        <View
                            key={quote._id || index}
                            style={[
                                styles.quoteCard,
                                { backgroundColor: theme.card },
                            ]}
                        >
                            <View style={styles.quoteHeader}>
                                <View
                                    style={[
                                        styles.categoryBadge,
                                        {
                                            backgroundColor: getCategoryColor(
                                                quote.category
                                            ),
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name={getCategoryIcon(quote.category)}
                                        size={14}
                                        color="#fff"
                                    />
                                    <Text style={styles.categoryBadgeText}>
                                        {quote.category
                                            .charAt(0)
                                            .toUpperCase() +
                                            quote.category.slice(1)}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.shareButton,
                                        { backgroundColor: theme.background },
                                    ]}
                                    onPress={() => shareQuote(quote)}
                                >
                                    <Ionicons
                                        name="share-social-outline"
                                        size={20}
                                        color={theme.primary}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text
                                style={[
                                    styles.quoteText,
                                    { color: theme.text },
                                ]}
                            >
                                "{quote.text}"
                            </Text>

                            <Text
                                style={[
                                    styles.quoteAuthor,
                                    { color: theme.muted },
                                ]}
                            >
                                — {quote.author}
                            </Text>
                        </View>
                    ))
                ) : (
                    <View
                        style={[
                            styles.emptyContainer,
                            { backgroundColor: theme.card },
                        ]}
                    >
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            size={48}
                            color={theme.muted}
                        />
                        <Text style={[styles.emptyText, { color: theme.text }]}>
                            No quotes found
                        </Text>
                        <Text
                            style={[
                                styles.emptySubtext,
                                { color: theme.muted },
                            ]}
                        >
                            {selectedCategory === "all"
                                ? "Complete mini-games to unlock inspirational quotes"
                                : `You haven't unlocked any ${selectedCategory} quotes yet`}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    categoriesContainer: {
        maxHeight: 60,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    categoriesContent: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    categoryTab: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
    },
    categoryText: {
        marginLeft: 5,
        fontWeight: "500",
    },
    quotesContainer: {
        padding: 15,
    },
    quoteCard: {
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    quoteHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    categoryBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    categoryBadgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 5,
    },
    shareButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    quoteText: {
        fontSize: 18,
        fontStyle: "italic",
        lineHeight: 28,
        marginBottom: 15,
    },
    quoteAuthor: {
        fontSize: 14,
        textAlign: "right",
        fontWeight: "500",
    },
    emptyContainer: {
        padding: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
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
});

export default QuotesScreen;
