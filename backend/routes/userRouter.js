import express from "express";
import {
  update,
  getUserById,
  deleteUserById,
  listAllUsers,
} from "../controller/userController.js";

const userRouter = express();

userRouter.post("/update/:id", update);
userRouter.get("/all", listAllUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/delete/:id", deleteUserById);

export default userRouter;
