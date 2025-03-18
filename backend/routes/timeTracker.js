const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { TimeTracker } = require("../models");

// @route   GET api/time-tracker
// @desc    Get user's time tracker data
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        let timeTracker = await TimeTracker.findOne({ user: req.user.id });

        if (!timeTracker) {
            // Create a new time tracker if one doesn't exist
            timeTracker = new TimeTracker({
                user: req.user.id,
                totalTimeSaved: 0,
                dailyStats: [],
                goals: [],
            });

            await timeTracker.save();
        }

        res.json(timeTracker);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/time-tracker/save-time
// @desc    Record time saved from not using blocked apps
// @access  Private
router.post("/save-time", auth, async (req, res) => {
    const { timeSaved, appName } = req.body;

    try {
        let timeTracker = await TimeTracker.findOne({ user: req.user.id });

        if (!timeTracker) {
            timeTracker = new TimeTracker({
                user: req.user.id,
                totalTimeSaved: 0,
                dailyStats: [],
                goals: [],
            });
        }

        // Update total time saved
        timeTracker.totalTimeSaved += timeSaved;

        // Check if there's a daily stat for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let dailyStat = timeTracker.dailyStats.find(
            (stat) =>
                new Date(stat.date).setHours(0, 0, 0, 0) === today.getTime()
        );

        if (dailyStat) {
            // Update existing daily stat
            dailyStat.timeSaved += timeSaved;

            // Update app-specific time if provided
            if (appName) {
                const appStat = dailyStat.appsBlocked.find(
                    (app) => app.appName === appName
                );
                if (appStat) {
                    appStat.timeBlocked += timeSaved;
                } else {
                    dailyStat.appsBlocked.push({
                        appName,
                        timeBlocked: timeSaved,
                    });
                }
            }
        } else {
            // Create new daily stat
            const newDailyStat = {
                date: today,
                timeSaved,
                appsBlocked: appName
                    ? [{ appName, timeBlocked: timeSaved }]
                    : [],
            };

            timeTracker.dailyStats.push(newDailyStat);
        }

        await timeTracker.save();
        res.json(timeTracker);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/time-tracker/goals
// @desc    Create a new goal
// @access  Private
router.post("/goals", auth, async (req, res) => {
    const { name, category, targetTime } = req.body;

    try {
        let timeTracker = await TimeTracker.findOne({ user: req.user.id });

        if (!timeTracker) {
            timeTracker = new TimeTracker({
                user: req.user.id,
                totalTimeSaved: 0,
                dailyStats: [],
                goals: [],
            });
        }

        const newGoal = {
            name,
            category,
            targetTime,
            allocatedTime: 0,
            completedTime: 0,
            isCompleted: false,
        };

        timeTracker.goals.push(newGoal);
        await timeTracker.save();

        res.json(timeTracker.goals[timeTracker.goals.length - 1]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   PUT api/time-tracker/goals/:goalId/allocate
// @desc    Allocate saved time to a goal
// @access  Private
router.put("/goals/:goalId/allocate", auth, async (req, res) => {
    const { timeToAllocate } = req.body;

    try {
        const timeTracker = await TimeTracker.findOne({ user: req.user.id });

        if (!timeTracker) {
            return res.status(404).json({ msg: "Time tracker not found" });
        }

        // Find the goal
        const goal = timeTracker.goals.id(req.params.goalId);

        if (!goal) {
            return res.status(404).json({ msg: "Goal not found" });
        }

        // Check if there's enough unallocated time
        const totalAllocatedTime = timeTracker.goals.reduce(
            (total, goal) => total + goal.allocatedTime,
            0
        );

        const availableTime = timeTracker.totalTimeSaved - totalAllocatedTime;

        if (timeToAllocate > availableTime) {
            return res.status(400).json({
                msg: "Not enough saved time available to allocate",
                availableTime,
            });
        }

        // Allocate time to the goal
        goal.allocatedTime += timeToAllocate;

        await timeTracker.save();
        res.json(goal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   PUT api/time-tracker/goals/:goalId/complete
// @desc    Mark time as completed for a goal
// @access  Private
router.put("/goals/:goalId/complete", auth, async (req, res) => {
    const { completedTime } = req.body;

    try {
        const timeTracker = await TimeTracker.findOne({ user: req.user.id });

        if (!timeTracker) {
            return res.status(404).json({ msg: "Time tracker not found" });
        }

        // Find the goal
        const goal = timeTracker.goals.id(req.params.goalId);

        if (!goal) {
            return res.status(404).json({ msg: "Goal not found" });
        }

        // Update completed time
        goal.completedTime += completedTime;

        // Check if goal is completed
        if (goal.completedTime >= goal.targetTime) {
            goal.isCompleted = true;
        }

        await timeTracker.save();
        res.json(goal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/time-tracker/stats
// @desc    Get user's time tracking statistics
// @access  Private
router.get("/stats", auth, async (req, res) => {
    try {
        const timeTracker = await TimeTracker.findOne({ user: req.user.id });

        if (!timeTracker) {
            return res.status(404).json({ msg: "Time tracker not found" });
        }

        // Calculate statistics
        const totalTimeSaved = timeTracker.totalTimeSaved;
        const totalGoals = timeTracker.goals.length;
        const completedGoals = timeTracker.goals.filter(
            (goal) => goal.isCompleted
        ).length;

        // Get daily stats for the last 7 days
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            return date;
        }).reverse();

        const weeklyStats = last7Days.map((date) => {
            const dailyStat = timeTracker.dailyStats.find(
                (stat) =>
                    new Date(stat.date).setHours(0, 0, 0, 0) === date.getTime()
            );

            return {
                date: date.toISOString().split("T")[0],
                timeSaved: dailyStat ? dailyStat.timeSaved : 0,
            };
        });

        res.json({
            totalTimeSaved,
            totalGoals,
            completedGoals,
            weeklyStats,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
