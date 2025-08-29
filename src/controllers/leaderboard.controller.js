const scoreModel = require("../models/score.model");
const userModel = require("../models/user.model");
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await userModel.aggregate([
      {
        // join all scores for each user
        $lookup: {
          from: "scores", // collection name for scores
          localField: "_id", // user _id
          foreignField: "userId", // match with userId in scores
          as: "scores", // all matching scores in array
        },
      },
      {
        // calculate totalScore and lastActivity
        $addFields: {
          totalScore: { $sum: "$scores.points" }, // sum of all points
          lastActivity: { $max: "$scores.createdAt" }, // latest score date
        },
      },
      {
        // only select required fields
        $project: {
          _id: 0,
          userId: "$_id",
          username: 1,
          email: 1,
          totalScore: 1,
          lastActivity: 1,
        },
      },
      {
        // sort users -> first by score, then last activity
        $sort: { totalScore: -1, lastActivity: -1 },
      },
    ]);

    // assign ranks (users with 0 points will be at the bottom)
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      ...entry,
    }));

    return res.status(200).json({
      success: true,
      count: rankedLeaderboard.length,
      leaderboard: rankedLeaderboard,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getLeaderboard,
};
