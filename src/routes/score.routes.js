const { Router } = require("express");
const { getUserScores, addScore } = require("../controllers/score.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const { addScoreLimiter } = require("../middlewares/rateLimit.middlewares");

const scoreRouter = Router();

// add score - protected Route
scoreRouter.post("/add-score", authMiddleware, addScoreLimiter, addScore);

// get user scores - protected Route
scoreRouter.get("/get-user-scores", authMiddleware, getUserScores);

module.exports = scoreRouter;
