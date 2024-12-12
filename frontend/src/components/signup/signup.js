import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Login from "../login/Login";
import { handleError } from "../../util";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './Signup.css';
export default function Signup() {
  const [signupInfo, setSigninInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSigninInfo(copySignupInfo);
  };
  console.log("SignUp info -> ", signupInfo);
  const navigate = useNavigate();

  
  const createAndAssignCalendar = async (e, id) => {
    e.preventDefault();
    //const { name, email, password } = signupInfo;
    // if (!name || !email || !password) {
    //   alert("name, email and password are required");
    // }
    try {
      const url = `https://calendar-app-backend-8mbw.onrender.com/calender/api/calendar`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: id,
          task: [],
        }),
      });
      const result = await response.json();
      const { success, message, error} = result;
      if (success) {
        alert(message);
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
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      alert("name, email and password are required");
    }
    try {
      const url = `https://calendar-app-backend-8mbw.onrender.com/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error, id } = result;
      if (success) {
        

        console.log(id);
        

        createAndAssignCalendar(e, id);

        alert(message);
        setTimeout(() => {
          navigate("/login");
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
  return (
    <>
      <div className="signup-container">
        <h1 className="signup-header">Sign Up</h1>
        <Form className="signup-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={handleChange}
              value={signupInfo.name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              value={signupInfo.email}
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
              onChange={handleChange}
              value={signupInfo.password}
            />
          </Form.Group>

          <Button className="signup-button" onClick={handleSignup}>
            Sign Up
          </Button>
        </Form>
      </div>
    </>
  );
}
