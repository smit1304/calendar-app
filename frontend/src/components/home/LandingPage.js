import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
const LandingPage = () => {
  const navigate = useNavigate();

  const OpenCalendar = () => {
    navigate("/home");
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Your Calendar App</h1>
      <p>Organize and view your schedule with ease.</p>
      <button onClick={OpenCalendar} className="sign-in-button">
        Open Calendar
      </button>
    </div>
  );
};

export default LandingPage;
