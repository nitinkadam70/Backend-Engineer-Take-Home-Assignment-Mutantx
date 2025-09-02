// all routes
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const scoreRouter = require("./score.routes");
const leaderboardRouter = require("./leaderboard.routes");

module.exports = {
  userRouter,
  authRouter,
  scoreRouter,
  leaderboardRouter,
};
