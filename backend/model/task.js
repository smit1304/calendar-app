import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Schema Task
const TaskSchema = new Schema({
  _id : {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: "Task"
  },
  description: {
    type: String,
    default: ""
  },
  startDate: {
    type: String,
    default: ""
    },
    endDate: {
     type: String,
    default: ""
    }
});
export { TaskSchema }; // Export only the schema
const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
