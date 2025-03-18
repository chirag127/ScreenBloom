const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { MiniGame, UserProgress, Quote } = require("../models");

// @route   GET api/mini-games
// @desc    Get all mini-games
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const miniGames = await MiniGame.find().populate("rewardQuote");
        res.json(miniGames);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/mini-games/available
// @desc    Get all mini-games available to the user
// @access  Private
router.get("/available", auth, async (req, res) => {
    try {
        // Get all mini-games
        const miniGames = await MiniGame.find().populate("rewardQuote");

        // Get user progress
        const userProgress = await UserProgress.findOne({ user: req.user.id });

        if (!userProgress) {
            // If no progress exists, only return games with no unlock requirements
            const availableGames = miniGames.filter(
                (game) =>
                    game.unlockRequirement.type === "none" ||
                    game.unlockRequirement.value === 0
            );

            return res.json(availableGames);
        }

        // Filter games based on unlock requirements
        const availableGames = miniGames.filter((game) => {
            // Games with no requirements are always available
            if (
                game.unlockRequirement.type === "none" ||
                game.unlockRequirement.value === 0
            ) {
                return true;
            }

            // Check time saved requirement
            if (game.unlockRequirement.type === "time_saved") {
                // We would need to check the TimeTracker model here
                // For now, we'll assume all time-based games are available
                return true;
            }

            // Check previous game requirement
            if (game.unlockRequirement.type === "previous_game") {
                const completedGamesCount =
                    userProgress.miniGamesCompleted.length;
                return completedGamesCount >= game.unlockRequirement.value;
            }

            return false;
        });

        res.json(availableGames);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/mini-games/:id
// @desc    Get mini-game by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
    try {
        const miniGame = await MiniGame.findById(req.params.id).populate(
            "rewardQuote"
        );

        if (!miniGame) {
            return res.status(404).json({ msg: "Mini-game not found" });
        }

        res.json(miniGame);
    } catch (err) {
        console.error(err.message);

        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Mini-game not found" });
        }

        res.status(500).send("Server error");
    }
});

// @route   POST api/mini-games/:id/complete
// @desc    Mark a mini-game as completed
// @access  Private
router.post("/:id/complete", auth, async (req, res) => {
    const { duration } = req.body;

    try {
        // Find the mini-game
        const miniGame = await MiniGame.findById(req.params.id).populate(
            "rewardQuote"
        );

        if (!miniGame) {
            return res.status(404).json({ msg: "Mini-game not found" });
        }

        // Find or create user progress
        let userProgress = await UserProgress.findOne({ user: req.user.id });

        if (!userProgress) {
            userProgress = new UserProgress({
                user: req.user.id,
                miniGamesCompleted: [],
                unlockedQuotes: [],
                streak: {
                    current: 0,
                    longest: 0,
                    lastActive: new Date(),
                },
                achievements: [],
            });
        }

        // Add mini-game to completed list
        userProgress.miniGamesCompleted.push({
            miniGame: miniGame._id,
            completedAt: new Date(),
            duration: duration || miniGame.duration,
        });

        // Check if this unlocks a quote
        if (miniGame.rewardQuote) {
            // Check if quote is already unlocked
            const quoteAlreadyUnlocked = userProgress.unlockedQuotes.some(
                (uq) =>
                    uq.quote.toString() === miniGame.rewardQuote._id.toString()
            );

            if (!quoteAlreadyUnlocked) {
                userProgress.unlockedQuotes.push({
                    quote: miniGame.rewardQuote._id,
                    unlockedAt: new Date(),
                });

                // Update the quote to mark it as unlocked
                await Quote.findByIdAndUpdate(miniGame.rewardQuote._id, {
                    isLocked: false,
                });
            }
        }

        // Update streak
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastActive = new Date(userProgress.streak.lastActive);
        lastActive.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastActive.getTime() === yesterday.getTime()) {
            // Consecutive day
            userProgress.streak.current += 1;

            if (userProgress.streak.current > userProgress.streak.longest) {
                userProgress.streak.longest = userProgress.streak.current;
            }
        } else if (lastActive.getTime() < yesterday.getTime()) {
            // Streak broken
            userProgress.streak.current = 1;
        }

        userProgress.streak.lastActive = today;

        // Check for achievements
        // Example: First breathing exercise
        if (
            miniGame.type === "breathing" &&
            !userProgress.achievements.some((a) => a.name === "First Breath")
        ) {
            userProgress.achievements.push({
                name: "First Breath",
                description: "Completed your first breathing exercise",
                unlockedAt: new Date(),
                icon: "breath-icon",
            });
        }

        // Example: 3-day streak
        if (
            userProgress.streak.current === 3 &&
            !userProgress.achievements.some((a) => a.name === "3-Day Streak")
        ) {
            userProgress.achievements.push({
                name: "3-Day Streak",
                description: "Used ScreenBloom for 3 days in a row",
                unlockedAt: new Date(),
                icon: "streak-icon",
            });
        }

        await userProgress.save();

        res.json({
            miniGame,
            unlockedQuote:
                miniGame.rewardQuote && !miniGame.rewardQuote.isLocked
                    ? miniGame.rewardQuote
                    : null,
            streak: userProgress.streak,
            newAchievements: userProgress.achievements.filter(
                (a) =>
                    new Date(a.unlockedAt).toDateString() ===
                    new Date().toDateString()
            ),
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
