import { useState, useEffect } from 'react';
import './Calendar.css';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import Sidebar from './Sidebar';
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { parse } from 'date-fns';

function calendarToDb(calendarFormat)
{
  var data = {
    _id: calendarFormat.id,
    title: calendarFormat.title,
    description: calendarFormat.description,
    startDate :calendarFormat.start,
    endDate : calendarFormat.end,
};
  return data;
}

function stringToDate(date)
{
  return parse(date, "yyyy-MM-dd HH:mm", new Date());
}

function dateToString(date)
{
  return parse (date, "yyyy-MM-dd HH:mm");
}

function Calendar() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    email: "",
    calendarId: ""
  });

  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0]

  const [events, setEvents] =  useState([]);
  const addEvent = async (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
    eventsServicePlugin.add(newEvent); // Updates the calendar with the new event
    const updatedCalendarInfo = 
      calendarToDb(newEvent)
    ;
    
    try {
      const url = `http://localhost:8080/calender/api/calendar/${userInfo.calendarId}/task/`;//Should be a relative url
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCalendarInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        console.log("Saved")
      } else if (error) {
        const details = error?.details[0].message;
        alert(details);
      } else if (!success) {
        alert(message);
      }
      console.log(result);
    }catch (ex)
    {
      console.log("Error "+ ex)
    }
  };
  

  const modifyEvent = async (updatedEvent) => {
    setEvents(prevEvents =>
      prevEvents.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    eventsServicePlugin.update(updatedEvent); // Update plugin

    try {
      console.log(userInfo.calendarId, updatedEvent.id);
      const url = `http://localhost:8080/calender/api/calendar/${userInfo.calendarId}/task/${updatedEvent.id}`;//Should be a relative url
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      const result = await response.json();
      
      const { success, message, error } = result;
      if (success) {
        console.log("Updated")
      } else if (error) {
        const details = error?.details[0].message;
        alert("Error Updated: " +details);
      } else if (!success) {
        alert("Not success Updated: " +message);
      }
      console.log(result);
    }catch (ex)
    {
      alert("ERROR: "+ ex);
    }
  };

  const deletedEvent = async (deletedEvent) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== deletedEvent.id));
    eventsServicePlugin.remove(deletedEvent); // Update plugin

    console.log(userInfo.calendarId, deletedEvent.id);
    try {
      const url = `http://localhost:8080/calender/api/calendar/${userInfo.calendarId}/task/${deletedEvent.id}`;//Should be a relative url
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      
      const { success, message, error } = result;
      if (success) {
        console.log("Deleted")
      } else if (error) {
        const details = error?.details[0].message;
        alert("Error Deleted: " +details);
      } else if (!success) {
        alert("Not success Deleted: " +message);
      }
      console.log(result);
    }catch (ex)
    {
      alert("ERROR: "+ ex);
    }
  };  

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [createEventModalPlugin(), createDragAndDropPlugin(), eventsServicePlugin],
  });

  async function loadCalendar(jsonUser)
  {
    
    try {
      //const calendarId = localStorage.getItem("calendarId");
      console.log(jsonUser.calendarId);
      const url = `http://localhost:8080/calender/api/calendar/${jsonUser.calendarId}/task/`;//Should be a relative url
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Trying load Calendar ")
      const result = await response.json();
      const { success, message, error,tasks } = result;
      if (success) {
        console.log("Succesfully loaded")
          for (var idx = 0; idx < tasks.length; idx++) {
            let taskCalendar = tasks[idx];
            let taskSaved = eventsServicePlugin.get(taskCalendar._id);
            if (taskSaved) {
              eventsServicePlugin.update({
                id: taskCalendar._id,
                start: taskCalendar.startDate,
                end: taskCalendar.endDate,
                title: taskCalendar.title,
                description: `"${taskCalendar.description}" ID: ${taskCalendar._id}"`,
              });
            } else {
              eventsServicePlugin.add({
                id: taskCalendar._id,
                start: taskCalendar.startDate,
                end: taskCalendar.endDate,
                title: taskCalendar.title,
                description: `"${taskCalendar.description}" ID: ${taskCalendar._id}"`,
              });
            }
          }        
      } else if (error) {
        const details = error?.details[0].message;
        alert("Error Deleted: " +details);
      } else if (!success) {
        alert("Not success Deleted: " +message);
      }
      

    }catch (ex)
    {
      alert("ERROR: "+ ex);
    }
  }

  useEffect(() => {
    async function initialize() {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        const jsonUser = JSON.parse(storedUserInfo);
        setUserInfo(jsonUser);
  
        // Wait until the eventsServicePlugin is ready (if needed)
        const initialEvents = await eventsServicePlugin.getAll();
        setEvents(initialEvents);
  
        // Call loadCalendar after eventsServicePlugin is ready
        await loadCalendar(jsonUser);
      }
    }
  
    initialize();
  }, [eventsServicePlugin]);

  return (
    <div className="calendar">
      <div className="calendar-container">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
      <Sidebar addEvent={addEvent} modifyEvent={modifyEvent} events={deletedEvent}/>
    </div>
  );
}
export default Calendar;
