import express from "express";
import ensureAuthenticated from "../middleware/authorization.js";
const calenderRouter = express();

calenderRouter.get("/", ensureAuthenticated, (req, res) => {
  console.log("###### Logged In User Detail ######", req.user);
  //res.send("welcome to calender app.");
});

export default calenderRouter;
