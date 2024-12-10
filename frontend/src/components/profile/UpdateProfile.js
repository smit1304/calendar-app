import PropTypes from "prop-types";
import "./Profile.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
export default function UpdateProfile({ user, onCancel, onUpdate }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: user.id,
    newName: user.name,
    newEmail: user.email,
    currentPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/update/${formData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.newName, // Only include necessary fields
            email: formData.newEmail,
            password: formData.currentPassword,
        }),
        }
      );
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        alert(message);
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("email");
        localStorage.removeItem("userInfo");
        alert("User Loggedout");
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
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form>
        <div>
          <label>ID: </label>
          <input type="text" value={formData.id} disabled />
        </div>
        <div>
          <label>New Name: </label>
          <input
            type="text"
            name="newName"
            //  value={formData.newName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Email: </label>
          <input
            type="email"
            name="newEmail"
            //value={formData.newEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Current Password: </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" onClick={handleUpdateSubmit}>
          Submit
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
