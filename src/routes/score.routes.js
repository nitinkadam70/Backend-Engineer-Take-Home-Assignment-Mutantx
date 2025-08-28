const { Router } = require("express");
const { getUserScores, addScore } = require("../controllers/score.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const scoreRouter = Router();

// add score
scoreRouter.post("/add-score", authMiddleware, addScore);

// get user scores
scoreRouter.get("/get-user-scores", authMiddleware, getUserScores);

module.exports = scoreRouter;
