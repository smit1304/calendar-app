import express from "express";
import { login, signup } from "../controller/authController.js";
import {
  loginValidation,
  signupValidation,
} from "../middleware/authValidation.js";

const authRouter = express();

authRouter.post("/login", loginValidation, login);

authRouter.post("/signup", signupValidation, signup);

export default authRouter;
