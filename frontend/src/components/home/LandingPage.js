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
      <h1 className="landing-header">Welcome to Your Calendar App</h1>
      <p className="landing-description">
        Organize and view your schedule with ease.
      </p>
      <button onClick={OpenCalendar} className="sign-in-button">
        Open Calendar
      </button>
    </div>
  );
};

export default LandingPage;
