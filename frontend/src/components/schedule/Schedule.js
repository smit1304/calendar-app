import React from "react";
import { useNavigate } from "react-router-dom";
import Placeholder2 from "../Placeholders/image2.png";
import { Link } from "react-router-dom";
import ProjectLogo from "../Placeholders/ProjectLogo.png";
import { useEffect,useState } from "react";

export default function Schedule() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    alert("User Loggedout");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const loadCalendar = async () => {
    try {
      const calendarId = localStorage.getItem("calendarId"); // Retrieve calendarId from localStorage
      if (!calendarId) {
        alert("No calendar ID found in localStorage!");
        return;
      }
      const url = `http://localhost:8080/calender/api/calendar/${
        calendarId
      }/task/`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Trying to load Calendar...");
      const result = await response.json();
      const { success, message, error, tasks } = result;

      if (success) {
        console.log("Successfully loaded tasks");
        console.log(tasks);
        setTasks(tasks); // Store the tasks in state
      } else if (error) {
        const details = error?.details?.[0]?.message;
        alert("Error: " + details);
      } else if (!success) {
        alert("Not successful: " + message);
      }
    } catch (ex) {
      alert("ERROR: " + ex.message);
    }
  };

  useEffect(() => {
    loadCalendar();
  }, []);
  return (
    <div>
      {/* Title Bar */}
      <div className="title-bar">
        <img src={ProjectLogo} alt="Logo" className="logo" />{" "}
        {/* Add your logo file in `public` folder */}
        <h1 className="app-title" onClick={handleLogout}>
          Calendar
        </h1>
        <button className="sign-in-button">Log out</button>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/home">Calendar</Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule">Schedule</Link>
          </li>
        </ul>
      </nav>
      <div>
        <h1>Calendar Tasks</h1>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <li key={task._id}>
                {" "}
                <br />
                <strong>Id: {task._id} </strong> <br />
                <strong>Title:</strong> {task.title} <br />
                <strong>Description:</strong> {task.description} {} <br />
                <strong>Start Date:</strong> {task.startDate} <br />
                <strong>End Date:</strong> {task.endDate}
                            
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
}
