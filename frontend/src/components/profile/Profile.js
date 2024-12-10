import PropTypes from "prop-types";
import "./Profile.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

export default function Profile({ user, onClose, onUpdateClick }) {
  return (
    <div className="user-profile-container">
      <div className="user-card">
        <button className="close-button top-right" onClick={onClose}>
          &times;
        </button>

        <h2 className="user-name">{user.name}</h2>
        <p className="user-email">Id: {user.id}</p>
        <p className="user-email">
          Email: <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
        <Button variant="primary" onClick={onUpdateClick}>
          Update Data
        </Button>
      </div>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
