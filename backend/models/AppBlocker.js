const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppBlockerSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        blockedApps: [
            {
                appName: {
                    type: String,
                    required: true,
                },
                appIcon: {
                    type: String,
                    default: "",
                },
                packageName: {
                    type: String,
                    default: "",
                },
                isBlocked: {
                    type: Boolean,
                    default: true,
                },
                blockSchedule: [
                    {
                        dayOfWeek: {
                            type: Number, // 0-6 (Sunday-Saturday)
                            required: true,
                        },
                        startTime: {
                            type: String, // HH:MM format
                            required: true,
                        },
                        endTime: {
                            type: String, // HH:MM format
                            required: true,
                        },
                    },
                ],
                customMessage: {
                    type: String,
                    default:
                        "Take a deep breath. Do you really need to use this app right now?",
                },
                backgroundImage: {
                    type: String,
                    default: "default-nature", // Reference to a nature image
                },
            },
        ],
        globalSettings: {
            enableAllBlockers: {
                type: Boolean,
                default: true,
            },
            allowBreaks: {
                type: Boolean,
                default: true,
            },
            breakDuration: {
                type: Number, // in minutes
                default: 5,
            },
            breakFrequency: {
                type: Number, // in minutes
                default: 60,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("AppBlocker", AppBlockerSchema);
