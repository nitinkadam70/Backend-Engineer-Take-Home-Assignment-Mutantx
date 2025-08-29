const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user with email if not then return directly form here else continue
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }

    // Here we are Matching password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Here we are Creating JWT token with user id and email and validate token for 1d
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1D" }
    );

    // Response with token and user details
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        totalPoints: user.totalPoints,
      },
      message: "Login successful",
    });
  } catch (err) {
    console.log("login:", err);
    res.status(500).json({ message: err.message });
  }
};

// const logout = async (req, res) => {
//   try {
//     res.json({ message: "Logout successful" });
//   } catch (err) {
//     console.log("logout:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = { login };
