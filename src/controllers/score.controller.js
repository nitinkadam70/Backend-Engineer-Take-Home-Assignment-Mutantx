const scoreModel = require("../models/score.model");

// We can Add new score with this controller
const addScore = async (req, res) => {
  try {
    const { points } = req.body;

    // validation for only we accepts 5,10,50 numbers
    if (![5, 10, 50].includes(points)) {
      return res
        .status(400)
        .json({ message: "Invalid score value. Only 5, 10, 50 are allowed." });
    }

    const userId = req.user.id;

    const score = new scoreModel({
      userId: userId,
      points,
    });

    await score.save();
    // console.log("added new score: ", score);

    res.status(201).json({ message: "Score added successfully", score });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error adding score", error: error.message });
  }
};

// With this api we can get user score history
const getUserScores = async (req, res) => {
  try {
    const userId = req.user.id;

    const scores = await scoreModel
      .find({ userId: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ scores });
    console.log("scores", scores);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching scores", error: error.message });
  }
};

module.exports = {
  addScore,
  getUserScores,
};
