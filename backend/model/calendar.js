import mongoose from "mongoose";
import {TaskSchema} from "./task.js";

const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
  author: 
  { 
    type: Schema.Types.ObjectId, 
    ref: "User",
    unique: true,
    require: true
  },
  task: [TaskSchema],
  created: {
    type: Date,
    default: Date.now
    },
    updated: {
    type: Date,
    default: Date.now
    },
});

const CalendarModel = mongoose.model("Calendar", CalendarSchema);

export default CalendarModel;
