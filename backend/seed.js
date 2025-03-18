const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Quote, MiniGame } = require("./models");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Seed quotes
const seedQuotes = async () => {
    try {
        // Clear existing quotes
        await Quote.deleteMany({});

        const quotes = [
            {
                text: "The present moment is the only time over which we have dominion.",
                author: "Thích Nhất Hạnh",
                category: "mindfulness",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "The mind is everything. What you think you become.",
                author: "Buddha",
                category: "mindfulness",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "You are the sky. Everything else is just the weather.",
                author: "Pema Chödrön",
                category: "mindfulness",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "The goal of meditation isn't to control your thoughts, it's to stop letting them control you.",
                author: "Anonymous",
                category: "mindfulness",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "Your time is limited, so don't waste it living someone else's life.",
                author: "Steve Jobs",
                category: "productivity",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
                author: "Stephen Covey",
                category: "productivity",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "Focus on being productive instead of busy.",
                author: "Tim Ferriss",
                category: "productivity",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "The way to get started is to quit talking and begin doing.",
                author: "Walt Disney",
                category: "motivation",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "It does not matter how slowly you go as long as you do not stop.",
                author: "Confucius",
                category: "motivation",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "Believe you can and you're halfway there.",
                author: "Theodore Roosevelt",
                category: "motivation",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "Take care of your body. It's the only place you have to live.",
                author: "Jim Rohn",
                category: "wellness",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
            {
                text: "Health is a state of complete harmony of the body, mind, and spirit.",
                author: "B.K.S. Iyengar",
                category: "wellness",
                isLocked: true,
                unlockRequirement: {
                    type: "mini_game",
                    value: 1,
                },
            },
        ];

        const savedQuotes = await Quote.insertMany(quotes);
        console.log(`${savedQuotes.length} quotes seeded successfully`);
        return savedQuotes;
    } catch (err) {
        console.error("Error seeding quotes:", err);
        process.exit(1);
    }
};

// Seed mini-games
const seedMiniGames = async (quotes) => {
    try {
        // Clear existing mini-games
        await MiniGame.deleteMany({});

        const miniGames = [
            {
                name: "Box Breathing",
                type: "breathing",
                description:
                    "A simple breathing technique to reduce stress and improve focus",
                instructions:
                    "Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. Repeat.",
                duration: 60, // 1 minute
                difficulty: "beginner",
                unlockRequirement: {
                    type: "none",
                    value: 0,
                },
                rewardQuote: quotes[0]._id,
            },
            {
                name: "4-7-8 Breathing",
                type: "breathing",
                description: "A breathing pattern that promotes relaxation",
                instructions:
                    "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat.",
                duration: 120, // 2 minutes
                difficulty: "intermediate",
                unlockRequirement: {
                    type: "previous_game",
                    value: 1,
                },
                rewardQuote: quotes[1]._id,
            },
            {
                name: "Body Scan",
                type: "meditation",
                description:
                    "A meditation technique to increase body awareness and release tension",
                instructions:
                    "Starting from your toes, gradually bring attention to each part of your body, noticing sensations without judgment.",
                duration: 180, // 3 minutes
                difficulty: "beginner",
                unlockRequirement: {
                    type: "previous_game",
                    value: 2,
                },
                rewardQuote: quotes[2]._id,
            },
            {
                name: "Mindful Minute",
                type: "focus",
                description: "A quick mindfulness exercise to center yourself",
                instructions:
                    "For one minute, focus entirely on your breath. When your mind wanders, gently bring it back to your breathing.",
                duration: 60, // 1 minute
                difficulty: "beginner",
                unlockRequirement: {
                    type: "none",
                    value: 0,
                },
                rewardQuote: quotes[3]._id,
            },
            {
                name: "Three Good Things",
                type: "gratitude",
                description: "A gratitude practice to boost positive emotions",
                instructions:
                    "Think of three good things that happened today, no matter how small. Reflect on why they happened and how they made you feel.",
                duration: 120, // 2 minutes
                difficulty: "beginner",
                unlockRequirement: {
                    type: "previous_game",
                    value: 3,
                },
                rewardQuote: quotes[4]._id,
            },
        ];

        const savedMiniGames = await MiniGame.insertMany(miniGames);
        console.log(`${savedMiniGames.length} mini-games seeded successfully`);
    } catch (err) {
        console.error("Error seeding mini-games:", err);
        process.exit(1);
    }
};

// Run the seed functions
const seedDatabase = async () => {
    try {
        const quotes = await seedQuotes();
        await seedMiniGames(quotes);
        console.log("Database seeded successfully");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
};

seedDatabase();
