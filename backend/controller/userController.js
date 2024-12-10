import UserModel from "../model/user.js";
import errorHandler from "./error.controller.js";
import extend from "lodash/extend.js";
import mongoose from "mongoose";

export const update = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid ID");
  }

  const { name, email, password } = req.body;
  try {
    // Find the user by ID and update the details
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(user.toJSON());
    //Update data of product
    user.name = name;
    user.email = email;
    //Save in data base
    await user.save();

    res.status(200).json({
      message: "Update success",
      success: true,
      name: user.name,
      email: user.email,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
      error: err,
    });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    // Find the user by ID and update the details
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(user.toJSON());
    res.status(200).json({
      message: "Search success",
      success: true,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
      error: err,
    });
  }
};

export const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    // Find the user by ID and update the details
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.to;
    console.log(user.toJSON());
    res.status(200).json({
      message: "Delete success",
      success: true,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
      error: err,
    });
  }
};

export const listAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find(); // Fetch all users

    res.status(200).json({
      message: "Search success",
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
      error: err,
    });
  }
};
