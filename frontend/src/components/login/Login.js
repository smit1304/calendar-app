import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return alert("email and password are required");
    }
    try {
      
      //Login user Data
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      console.log("afterfetchgubg");
      const result = await response.json();
      const { success, message, jwtToken, name, id, error } = result;
      if (success) {
        //
        const urlCalendar = `http://localhost:8080/calender/api/calendar/${id}`;
        console.log("Calendar "+ urlCalendar);
        const responseCalendar = await fetch(urlCalendar, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
         // body: JSON.stringify(loginInfo),
        });
        const resultCalendar = await responseCalendar.json();
        console.log(JSON.stringify(resultCalendar));
        console.log(resultCalendar._id);
        alert(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("email", email);
        localStorage.setItem("calendarId", resultCalendar._id);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            email: email,
            name: name,
            id: id,
            calendarId: resultCalendar._id,
          })
        );
        
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        alert(details);
      } else if (!success) {
        alert(message);
      }
      console.log(result);
    } catch (err) {
      alert(err);
    }
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="primary" type="submit" onClick={navigateToSignUp}>
            sign in
          </Button>
        </Form>
      </div>
    </>
  );
}
