const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

// Load environment variables from .env file
dotenv.config();

// Import routes
const userRouter = require("./src/routes/user.routes");
const authRouter = require("./src/routes/auth.routes");
const scoreRouter = require("./src/routes/score.routes");
const leaderboardRouter = require("./src/routes/leaderboard.routes");

// Initialize app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send({ message: "Welcome to the home page" });
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/scores", scoreRouter);
app.use("/api/leaderboard", leaderboardRouter);

const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, async () => {
  try {
    await connectDB.connection;
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("ERROR: " + e);
  }
  console.log(`server started on http://localhost:${PORT}`);
});
