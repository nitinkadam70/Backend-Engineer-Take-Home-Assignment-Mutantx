const { Router } = require("express");
const { getLeaderboard } = require("../controllers/leaderboard.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const leaderboardRouter = Router();

// Get leaderboard - protected Route
leaderboardRouter.get("/get-leaderboard", authMiddleware, getLeaderboard);

module.exports = leaderboardRouter;
