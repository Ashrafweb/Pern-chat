import express from "express";
import {
  getUser,
  login,
  logout,
  signUp,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/requireAuth.js";
const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/signup", signUp);

authRouter.get("/user", protectRoute, getUser);
export default authRouter;
