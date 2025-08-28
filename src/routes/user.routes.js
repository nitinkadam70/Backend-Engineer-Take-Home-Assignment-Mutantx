const { Router } = require("express");
const { createUser } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/register", createUser);

module.exports = userRouter;
