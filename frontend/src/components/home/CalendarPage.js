// src/components/CalendarPage.js
import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Placeholder1 from "../Placeholders/image.png";
import Calendar from "./Calendar.jsx";

const CalendarPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="CalendarPage">
        {<Calendar />}
      </div>
    </div>
  );
};

export default CalendarPage;
