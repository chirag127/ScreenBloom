const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeTrackerSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        totalTimeSaved: {
            type: Number, // in minutes
            default: 0,
        },
        dailyStats: [
            {
                date: {
                    type: Date,
                    required: true,
                },
                timeSaved: {
                    type: Number, // in minutes
                    default: 0,
                },
                appsBlocked: [
                    {
                        appName: String,
                        timeBlocked: Number, // in minutes
                    },
                ],
            },
        ],
        goals: [
            {
                name: {
                    type: String,
                    required: true,
                },
                category: {
                    type: String,
                    enum: [
                        "reading",
                        "exercise",
                        "meditation",
                        "learning",
                        "other",
                    ],
                    default: "other",
                },
                targetTime: {
                    type: Number, // in minutes
                    required: true,
                },
                allocatedTime: {
                    type: Number, // in minutes
                    default: 0,
                },
                completedTime: {
                    type: Number, // in minutes
                    default: 0,
                },
                isCompleted: {
                    type: Boolean,
                    default: false,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("TimeTracker", TimeTrackerSchema);
