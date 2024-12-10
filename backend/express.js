import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter.js";
import calenderRouter from "./routes/calenderRouter.js";
import userRouter from "./routes/userRouter.js";
import { deleteUserById } from "./controller/userController.js";
import UserModel from "./model/user.js";
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/calender", calenderRouter);
app.use("/user", userRouter);

export default app;
