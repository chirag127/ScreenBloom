const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { UserProgress } = require("../models");

// @route   GET api/progress
// @desc    Get user's progress
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        let userProgress = await UserProgress.findOne({ user: req.user.id })
            .populate("miniGamesCompleted.miniGame")
            .populate("unlockedQuotes.quote");

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

            await userProgress.save();
        }

        res.json(userProgress);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/progress/achievements
// @desc    Get user's achievements
// @access  Private
router.get("/achievements", auth, async (req, res) => {
    try {
        const userProgress = await UserProgress.findOne({ user: req.user.id });

        if (!userProgress) {
            return res.json([]);
        }

        res.json(userProgress.achievements);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/progress/streak
// @desc    Get user's streak information
// @access  Private
router.get("/streak", auth, async (req, res) => {
    try {
        const userProgress = await UserProgress.findOne({ user: req.user.id });

        if (!userProgress) {
            return res.json({
                current: 0,
                longest: 0,
                lastActive: new Date(),
            });
        }

        res.json(userProgress.streak);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   PUT api/progress/streak/update
// @desc    Update user's streak (for daily login)
// @access  Private
router.put("/streak/update", auth, async (req, res) => {
    try {
        let userProgress = await UserProgress.findOne({ user: req.user.id });

        if (!userProgress) {
            userProgress = new UserProgress({
                user: req.user.id,
                miniGamesCompleted: [],
                unlockedQuotes: [],
                streak: {
                    current: 1,
                    longest: 1,
                    lastActive: new Date(),
                },
                achievements: [],
            });
        } else {
            // Update streak
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const lastActive = new Date(userProgress.streak.lastActive);
            lastActive.setHours(0, 0, 0, 0);

            // If already logged in today, don't update
            if (lastActive.getTime() === today.getTime()) {
                return res.json(userProgress.streak);
            }

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

            // Check for streak achievements
            if (
                userProgress.streak.current === 7 &&
                !userProgress.achievements.some(
                    (a) => a.name === "7-Day Streak"
                )
            ) {
                userProgress.achievements.push({
                    name: "7-Day Streak",
                    description: "Used ScreenBloom for 7 days in a row",
                    unlockedAt: new Date(),
                    icon: "streak-icon-7",
                });
            }

            if (
                userProgress.streak.current === 30 &&
                !userProgress.achievements.some(
                    (a) => a.name === "30-Day Streak"
                )
            ) {
                userProgress.achievements.push({
                    name: "30-Day Streak",
                    description: "Used ScreenBloom for 30 days in a row",
                    unlockedAt: new Date(),
                    icon: "streak-icon-30",
                });
            }
        }

        await userProgress.save();

        res.json({
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
