import express from "express";
import calendarController from '../controller/calendarController.js'
import taskController from "../controller/taskController.js"
const router = express();

//Create routes for calendar
router.route('/api/calendar') 
.get(calendarController.list)
.post(calendarController.create)
.delete(calendarController.deleteAll)

router.route('/api/calendar/:calendar') 
.get(calendarController.read)
.put(calendarController.update) 
.delete(calendarController.remove)

router.param('calendar', calendarController.calendarByID) 
//Create route for Task
router.route('/api/calendar/:calendarId/task')
  .get(taskController.list)
  .post(taskController.create)
  .delete(taskController.deleteAll);

router.route('/api/calendar/:calendarId/task/:taskId')
  .put(taskController.update)
  .delete(taskController.remove);

export default router;
