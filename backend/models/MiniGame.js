const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MiniGameSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["breathing", "meditation", "focus", "gratitude"],
            default: "breathing",
        },
        description: {
            type: String,
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
        duration: {
            type: Number, // in seconds
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner",
        },
        unlockRequirement: {
            type: {
                type: String,
                enum: ["time_saved", "previous_game", "none"],
                default: "none",
            },
            value: {
                type: Number,
                default: 0,
            },
        },
        rewardQuote: {
            type: Schema.Types.ObjectId,
            ref: "Quote",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("MiniGame", MiniGameSchema);
