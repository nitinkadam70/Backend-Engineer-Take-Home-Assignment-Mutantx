const { Router } = require("express");
const {
  createUser,
  getUserProfile,
  editUserProfile,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const userRouter = Router();

userRouter.post("/register", createUser);

userRouter.get("/get-profile", authMiddleware, getUserProfile);

userRouter.patch("/edit-profile", authMiddleware, editUserProfile);

module.exports = userRouter;
