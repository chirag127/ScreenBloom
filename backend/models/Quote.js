const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuoteSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            default: "Unknown",
        },
        category: {
            type: String,
            enum: [
                "mindfulness",
                "productivity",
                "motivation",
                "wellness",
                "general",
            ],
            default: "general",
        },
        isLocked: {
            type: Boolean,
            default: true,
        },
        unlockRequirement: {
            type: {
                type: String,
                enum: ["time_saved", "mini_game", "streak", "none"],
                default: "mini_game",
            },
            value: {
                type: Number,
                default: 1, // e.g., complete 1 mini-game
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Quote", QuoteSchema);
