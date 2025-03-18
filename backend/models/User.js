const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        preferences: {
            theme: {
                type: String,
                enum: ["light", "dark", "system"],
                default: "system",
            },
            notifications: {
                enabled: {
                    type: Boolean,
                    default: true,
                },
                dailyReminder: {
                    type: Boolean,
                    default: true,
                },
                achievementAlerts: {
                    type: Boolean,
                    default: true,
                },
            },
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
