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




module.exports = { createUser };
