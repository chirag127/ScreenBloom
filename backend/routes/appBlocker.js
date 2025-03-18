const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { AppBlocker } = require("../models");

// @route   GET api/app-blocker
// @desc    Get user's app blocker settings
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        let appBlocker = await AppBlocker.findOne({ user: req.user.id });

        if (!appBlocker) {
            // Create a new app blocker if one doesn't exist
            appBlocker = new AppBlocker({
                user: req.user.id,
                blockedApps: [],
                globalSettings: {
                    enableAllBlockers: true,
                    allowBreaks: true,
                    breakDuration: 5,
                    breakFrequency: 60,
                },
            });

            await appBlocker.save();
        }

        res.json(appBlocker);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/app-blocker/apps
// @desc    Add a new app to block
// @access  Private
router.post("/apps", auth, async (req, res) => {
    const { appName, appIcon, packageName, customMessage, backgroundImage } =
        req.body;

    try {
        let appBlocker = await AppBlocker.findOne({ user: req.user.id });

        if (!appBlocker) {
            appBlocker = new AppBlocker({
                user: req.user.id,
                blockedApps: [],
                globalSettings: {
                    enableAllBlockers: true,
                    allowBreaks: true,
                    breakDuration: 5,
                    breakFrequency: 60,
                },
            });
        }

        // Check if app is already in the list
        const existingApp = appBlocker.blockedApps.find(
            (app) => app.appName === appName
        );

        if (existingApp) {
            return res.status(400).json({ msg: "App already in blocker list" });
        }

        // Create new blocked app
        const newBlockedApp = {
            appName,
            appIcon: appIcon || "",
            packageName: packageName || "",
            isBlocked: true,
            blockSchedule: [
                {
                    dayOfWeek: 0, // Sunday
                    startTime: "00:00",
                    endTime: "23:59",
                },
                {
                    dayOfWeek: 1, // Monday
                    startTime: "00:00",
                    endTime: "23:59",
                },
                {
                    dayOfWeek: 2, // Tuesday
                    startTime: "00:00",
                    endTime: "23:59",
                },
                {
                    dayOfWeek: 3, // Wednesday
                    startTime: "00:00",
                    endTime: "23:59",
                },
                {
                    dayOfWeek: 4, // Thursday
                    startTime: "00:00",
                    endTime: "23:59",
                },
                {
                    dayOfWeek: 5, // Friday
                    startTime: "00:00",
                    endTime: "23:59",
                },
                {
                    dayOfWeek: 6, // Saturday
                    startTime: "00:00",
                    endTime: "23:59",
                },
            ],
            customMessage:
                customMessage ||
                "Take a deep breath. Do you really need to use this app right now?",
            backgroundImage: backgroundImage || "default-nature",
        };

        appBlocker.blockedApps.push(newBlockedApp);
        await appBlocker.save();

        res.json(newBlockedApp);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   PUT api/app-blocker/apps/:appId
// @desc    Update a blocked app's settings
// @access  Private
router.put("/apps/:appId", auth, async (req, res) => {
    const { isBlocked, blockSchedule, customMessage, backgroundImage } =
        req.body;

    try {
        const appBlocker = await AppBlocker.findOne({ user: req.user.id });

        if (!appBlocker) {
            return res.status(404).json({ msg: "App blocker not found" });
        }

        // Find the app
        const app = appBlocker.blockedApps.id(req.params.appId);

        if (!app) {
            return res
                .status(404)
                .json({ msg: "App not found in blocker list" });
        }

        // Update app settings
        if (isBlocked !== undefined) app.isBlocked = isBlocked;
        if (blockSchedule) app.blockSchedule = blockSchedule;
        if (customMessage) app.customMessage = customMessage;
        if (backgroundImage) app.backgroundImage = backgroundImage;

        await appBlocker.save();
        res.json(app);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   DELETE api/app-blocker/apps/:appId
// @desc    Remove an app from the blocker list
// @access  Private
router.delete("/apps/:appId", auth, async (req, res) => {
    try {
        const appBlocker = await AppBlocker.findOne({ user: req.user.id });

        if (!appBlocker) {
            return res.status(404).json({ msg: "App blocker not found" });
        }

        // Find the app index
        const appIndex = appBlocker.blockedApps.findIndex(
            (app) => app._id.toString() === req.params.appId
        );

        if (appIndex === -1) {
            return res
                .status(404)
                .json({ msg: "App not found in blocker list" });
        }

        // Remove the app
        appBlocker.blockedApps.splice(appIndex, 1);

        await appBlocker.save();
        res.json({ msg: "App removed from blocker list" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   PUT api/app-blocker/settings
// @desc    Update global app blocker settings
// @access  Private
router.put("/settings", auth, async (req, res) => {
    const { enableAllBlockers, allowBreaks, breakDuration, breakFrequency } =
        req.body;

    try {
        let appBlocker = await AppBlocker.findOne({ user: req.user.id });

        if (!appBlocker) {
            return res.status(404).json({ msg: "App blocker not found" });
        }

        // Update global settings
        if (enableAllBlockers !== undefined) {
            appBlocker.globalSettings.enableAllBlockers = enableAllBlockers;
        }

        if (allowBreaks !== undefined) {
            appBlocker.globalSettings.allowBreaks = allowBreaks;
        }

        if (breakDuration) {
            appBlocker.globalSettings.breakDuration = breakDuration;
        }

        if (breakFrequency) {
            appBlocker.globalSettings.breakFrequency = breakFrequency;
        }

        await appBlocker.save();
        res.json(appBlocker.globalSettings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/app-blocker/check/:packageName
// @desc    Check if an app should be blocked at the current time
// @access  Private
router.get("/check/:packageName", auth, async (req, res) => {
    try {
        const appBlocker = await AppBlocker.findOne({ user: req.user.id });

        if (!appBlocker) {
            return res.json({ isBlocked: false });
        }

        // Check global settings first
        if (!appBlocker.globalSettings.enableAllBlockers) {
            return res.json({ isBlocked: false });
        }

        // Find the app
        const app = appBlocker.blockedApps.find(
            (app) => app.packageName === req.params.packageName
        );

        if (!app || !app.isBlocked) {
            return res.json({ isBlocked: false });
        }

        // Check if the app should be blocked at the current time
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0-6 (Sunday-Saturday)
        const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

        // Find schedule for current day
        const schedule = app.blockSchedule.find(
            (s) => s.dayOfWeek === dayOfWeek
        );

        if (!schedule) {
            return res.json({ isBlocked: false });
        }

        // Check if current time is within blocked hours
        const isBlocked =
            currentTime >= schedule.startTime &&
            currentTime <= schedule.endTime;

        res.json({
            isBlocked,
            customMessage: app.customMessage,
            backgroundImage: app.backgroundImage,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
