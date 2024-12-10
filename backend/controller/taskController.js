import errorHandler from './error.controller.js'
import Task from '../model/task.js'
import Calendar from '../model/calendar.js';
import calendarController from './calendarController.js'
import extend from 'lodash/extend.js';
import mongoose from 'mongoose';

//Creation Task
const create = async (req, res) => {
    const { calendarId } = req.params;
    const newTask = req.body;
    console.log(req.body);
    try {        
    const calendar = await Calendar.findByIdAndUpdate(
        calendarId,
        { $push: { task: newTask}/*, update: Date.now*/ },
        { new: true }
    );
    res.status(200).json({
        message: calendar,
        success: true,
      })     
    } catch (error) {
        res.status(400).json({
            message: "Error adding task:"+ error,
            success: false,
          })   
    }
}

const list = async (req, res) => {

    const { calendarId } = req.params;
     
    if (!mongoose.Types.ObjectId.isValid(calendarId)) {
       return res.status(400).send("Invalid ID");
    }
    
    console.log(calendarId);  
    try {
        console.log("about to tru");
        let calendar = await Calendar.findById(calendarId);
        console.log(calendar);
         //In case the error show error response
        if (!calendar) {
          return res.status(404).send("Calendar not found");
        }
        console.log(calendar.toJSON());
        res.status(200).json({
            message: "Tasks found success",
            success: true,
            tasks: calendar.task,
        });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
      error: err,
    });
  }
}

const update = async (req, res) => {
    const { calendarId, taskId } = req.params;
    const taskInfo = req.body;
  try {
    //Take object info
    let calendar = await Calendar.findById(calendarId);

    //In case the error show error response
    if(calendar.status == 400)
        return res; 
    
    let task = calendar.task.id(taskId);

    if(!task)
        return res.status(400).json(
    {
        error: `Task ${taskId} not found in calendar ${calendarId}`
    })
      //Update task info
    task = extend(task, taskInfo);      
      //Save in data base
      await calendar.save()
      return res.status(200).json({
        message: calendar,
        success: true,
      })   
  } catch (err) {
      return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
      })
  }
}
const remove = async (req, res) => {
    const { calendarId, taskId } = req.params;
    console.log("hellow from remove event");
    try {        
        let calendar = await Calendar.findById(calendarId);
    
        //let calendar = req.profile;
        //In case the error show error response
        if(!calendar)
            return res;

        const taskIndex = calendar.task.findIndex(task => task._id.toString() === taskId);

        if (taskIndex === -1) {
            return res.status("400")
            .json({ error: 'Task not found' });
          }

        calendar.task.splice(taskIndex, 1);
        await calendar.save()
        return res.status(200).json({
            message: calendar,
            success: true,
          });     
    } catch (error) {
        res.status("400")
            .json({ error: "Error removing task:", error });
    }
}

const deleteAll = async (req, res) => {
    const { calendarId} = req.params;
    try {        
        await calendarController.calendarByID(req, res,()=>{
        }, calendarId)
    
        let calendar = req.profile;
        //In case the error show error response
        if(!calendar)
            return res;

        calendar.task = [];
        await calendar.save()        
        res.json(calendar);
    } catch (error) {
        console.error("Error removing task:", error);
    }
};

export default { create, list, remove, update, deleteAll}

