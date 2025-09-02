const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or invalid" });
    }

    //Here we are extracting token from Bearer token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Check if token is blacklisted
    const blacklisted = await blacklistModel.findOne({ token });
    if (blacklisted) {
      return res
        .status(401)
        .json({ message: "Token is invalid. Please login again." });
    }

    //  Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
