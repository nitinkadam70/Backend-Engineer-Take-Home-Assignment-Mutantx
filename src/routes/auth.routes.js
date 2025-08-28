const { Router } = require("express");
const { login } = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/login", login);

module.exports = authRouter;
