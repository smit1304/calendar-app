import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import CalendarPage from "./CalendarPage";
import { Link } from "react-router-dom";
import ProjectLogo from "../Placeholders/ProjectLogo.png";
import Profile from "../profile/Profile";
import { ProfileContainer } from "../profile/ProfileContainer";
export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  //const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [showProfileContainer, setProfileContainer] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    //setEmail(localStorage.getItem("email"));

    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
    // if (userInfo == null) console.log("userInfo is null");
    // else console.log(userInfo);
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("email");
    localStorage.removeItem("userInfo");
    alert("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // const fetchCalender = async () => {
  //   try {
  //     const url = "http://localhost:8080/calender";
  //     const headers = {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     };
  //     const response = await fetch(url, headers);
  //     const result = await response.json();
  //     console.log(result);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };
  // useEffect(() => {
  //   fetchCalender();
  // }, []);
  const handleOnclickProfile = ()=>{
    setProfileContainer(true);
    console.log("Profile clicked" + showProfileContainer);

  }
  return (
    <div>
      {/* Title Bar */}
      <div className="title-bar">
        <img src={ProjectLogo} alt="Logo" className="logo" />{" "}
        {/* Add your logo file in `public` folder */}
        <h1 className="app-title">Calendar</h1>
        <button className="sign-in-button" onClick={handleLogout}>
          Log out
        </button>
        <button
          className="sign-in-button"
          onClick={() => setProfileContainer(true)}
        >
          Profile
        </button>
      </div>
      {/* <Profile user={userInfo}/> */}
      {showProfileContainer && (
        <ProfileContainer
          user={userInfo}
          onClose={() => setProfileContainer(false)}
        />
      )}
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
      <div className="landing-page">
        <h1>Welcome {loggedInUser} !</h1>
      </div>
      <CalendarPage />
    </div>
  );
}
