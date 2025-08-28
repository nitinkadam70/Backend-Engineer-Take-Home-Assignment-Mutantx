const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Checking Here if email already exists then we return msg
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Here we are Hashing password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(password, "=>", hashedPassword);

    // After that save user in database
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    // console.log("newUser", newUser);

    // Responding without exposing password only created user details
    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        totalPoints: newUser.totalPoints,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User profile fetched successfully", user });
  } catch (error) {
    // console.log("getUserProfile error:", error);
    return res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};

//  Edit user profile
const editUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("userId", userId);
    const { username } = req.body;
    // console.log("editUserProfile: ", req.body);

    const updatedData = {};
    if (username) updatedData.username = username;

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $set: updatedData },
      { new: true, runValidators: true }
    ).select("-password");

    // console.log("updatedUser", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

module.exports = { createUser, getUserProfile, editUserProfile };
