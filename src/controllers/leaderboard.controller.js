const userModel = require("../models/user.model");

const getLeaderboard = async (req, res) => {
  try {
    // get page and limit from query params (default: page=1, limit=10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // aggregate pipeline
    const leaderboard = await userModel.aggregate([
      {
        $lookup: {
          from: "scores",
          localField: "_id",
          foreignField: "userId",
          as: "scores",
        },
      },
      {
        $addFields: {
          totalScore: { $sum: "$scores.points" },
          lastActivity: { $max: "$scores.createdAt" },
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          username: 1,
          email: 1,
          totalScore: 1,
          lastActivity: 1,
        },
      },
      { $sort: { totalScore: -1, lastActivity: -1 } },
      { $skip: skip }, // skip documents
      { $limit: limit }, // limit documents
    ]);

    // count total users for pagination info
    const totalUsers = await userModel.countDocuments();

    // assign ranks according to user score - rank : 1 rank:2

    let currentRank = 1;
    let prevScore = null;

    const rankedLeaderboard = leaderboard.map((entry, index) => {
      if (entry.totalScore !== prevScore) {
        currentRank = index + 1; // new rank only when score changes
      }
      prevScore = entry.totalScore;

      return { rank: currentRank, ...entry };
    });

    return res.status(200).json({
      success: true,
      count: rankedLeaderboard.length,
      page,
      totalPages: Math.ceil(totalUsers / limit),
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
