import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter.js";
import calenderRouter from "./routes/calenderRouter.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/calender", calenderRouter);
export default app;
