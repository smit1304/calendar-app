import errorHandler from "./error.controller.js";
import Calendar from "../model/calendar.js";
import extend from "lodash/extend.js";

//Creation Calendar
const create = async (req, res) => {
  //Get data from body
  const newCalendar = new Calendar(req.body);
  if (newCalendar.author == null)
    return res.status(400).json({
      error: "User is required",
    });

  let user = await Calendar.find({ author: newCalendar.author });
  if (user.length > 0)
    //Return error by user have a calendar
    return res.status(400).json({
      error: "User have a calendar Created",
    });

  try {
    //Save data in data base
    await newCalendar.save();
    return res.status(200).json({
      message: "Successfully Created calendar!",
      success: true,
    });
  } catch (err) {
    //Return error
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    const query = {};
    //Check if exist id and add it to the query
    if (req.query.author) {
      query.author = { $regex: req.query.author, $options: "i" };
    }

    //send request to data base based in the query.
    let calendar = await Calendar.find(query).select("author task updated created");
    //showing porducts in the response
    res.json(calendar);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const calendarByID = async (req, res, next, id) => {
  try {
    //find element by id in data bas
    let calendar = await Calendar.findOne({author: id});
    //If product doesn't exist show message en response
    if (!calendar)
      return res.status("400").json({
        error: "Calendar not found",
        id: id
      });
    req.profile = calendar;
    next();
    return calendar;
    //Try to catch error in case that happend
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve calendar",
    });
  }
};

const read = (req, res) => {
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    //Take object info
    let calendar = req.profile;
    //Update data of product
    calendar = extend(calendar, req.body);
    //Update date
    calendar.updated = Date.now();
    //Save in data base
    await calendar.save();
    res.json(calendar);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const remove = async (req, res) => {
  try {
    //Take object from Data base
    let calendar = req.profile;
    //Delete product from data base
    let deletedCalendar = await calendar.deleteOne();
    res.json(deletedCalendar);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const deleteAll = async (req, res) => {
  try {
    //Delete all calendar from data base
    let result = await Calendar.deleteMany({});
    res.status(200).json({
      message: `${result.deletedCount} products deleted successfully.`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
export default {
  create,
  calendarByID: calendarByID,
  read,
  list,
  remove,
  update,
  deleteAll,
};
