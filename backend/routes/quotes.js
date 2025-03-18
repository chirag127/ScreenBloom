const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Quote, UserProgress } = require("../models");

// @route   GET api/quotes
// @desc    Get all quotes
// @access  Private (Admin only)
router.get("/all", auth, async (req, res) => {
    try {
        // In a real app, we would check if the user is an admin here
        const quotes = await Quote.find();
        res.json(quotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/quotes/unlocked
// @desc    Get all quotes unlocked by the user
// @access  Private
router.get("/unlocked", auth, async (req, res) => {
    try {
        const userProgress = await UserProgress.findOne({ user: req.user.id });

        if (!userProgress || userProgress.unlockedQuotes.length === 0) {
            return res.json([]);
        }

        // Get the quote IDs that the user has unlocked
        const unlockedQuoteIds = userProgress.unlockedQuotes.map(
            (uq) => uq.quote
        );

        // Fetch the actual quotes
        const quotes = await Quote.find({
            _id: { $in: unlockedQuoteIds },
        });

        res.json(quotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/quotes/random
// @desc    Get a random unlocked quote
// @access  Private
router.get("/random", auth, async (req, res) => {
    try {
        const userProgress = await UserProgress.findOne({ user: req.user.id });

        if (!userProgress || userProgress.unlockedQuotes.length === 0) {
            // If no quotes are unlocked, return a default quote
            return res.json({
                text: "Start your mindfulness journey to unlock inspirational quotes!",
                author: "ScreenBloom",
                category: "general",
            });
        }

        // Get the quote IDs that the user has unlocked
        const unlockedQuoteIds = userProgress.unlockedQuotes.map(
            (uq) => uq.quote
        );

        // Get a random quote from the unlocked ones
        const count = await Quote.countDocuments({
            _id: { $in: unlockedQuoteIds },
        });

        const random = Math.floor(Math.random() * count);

        const quote = await Quote.findOne({
            _id: { $in: unlockedQuoteIds },
        }).skip(random);

        res.json(quote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/quotes/category/:category
// @desc    Get unlocked quotes by category
// @access  Private
router.get("/category/:category", auth, async (req, res) => {
    try {
        const userProgress = await UserProgress.findOne({ user: req.user.id });

        if (!userProgress || userProgress.unlockedQuotes.length === 0) {
            return res.json([]);
        }

        // Get the quote IDs that the user has unlocked
        const unlockedQuoteIds = userProgress.unlockedQuotes.map(
            (uq) => uq.quote
        );

        // Fetch quotes in the specified category
        const quotes = await Quote.find({
            _id: { $in: unlockedQuoteIds },
            category: req.params.category,
        });

        res.json(quotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
