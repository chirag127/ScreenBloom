const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProgressSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        miniGamesCompleted: [
            {
                miniGame: {
                    type: Schema.Types.ObjectId,
                    ref: "MiniGame",
                },
                completedAt: {
                    type: Date,
                    default: Date.now,
                },
                duration: {
                    type: Number, // in seconds
                    required: true,
                },
            },
        ],
        unlockedQuotes: [
            {
                quote: {
                    type: Schema.Types.ObjectId,
                    ref: "Quote",
                },
                unlockedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        streak: {
            current: {
                type: Number,
                default: 0,
            },
            longest: {
                type: Number,
                default: 0,
            },
            lastActive: {
                type: Date,
                default: Date.now,
            },
        },
        achievements: [
            {
                name: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                unlockedAt: {
                    type: Date,
                    default: Date.now,
                },
                icon: {
                    type: String,
                    default: "",
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("UserProgress", UserProgressSchema);
