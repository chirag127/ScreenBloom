const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/time-tracker", require("./routes/timeTracker"));
app.use("/api/app-blocker", require("./routes/appBlocker"));
app.use("/api/mini-games", require("./routes/miniGames"));
app.use("/api/quotes", require("./routes/quotes"));
app.use("/api/progress", require("./routes/userProgress"));

// Basic route for testing
app.get("/", (req, res) => {
    res.send("ScreenBloom API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: "Something went wrong!",
        error: err.message,
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
