const { Router } = require("express");
const {
  createUser,
  getUserProfile,
  editUserProfile,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const userRouter = Router();

// register user route
userRouter.post("/register", createUser);

// Get user profile - protected Route
userRouter.get("/get-profile", authMiddleware, getUserProfile);

// Edit user profile - protected Route
userRouter.patch("/edit-profile", authMiddleware, editUserProfile);

module.exports = userRouter;
