const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      enum: [5, 10, 50],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Score", scoreSchema);
