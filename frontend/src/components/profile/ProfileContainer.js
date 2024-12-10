import UpdateProfile from "./UpdateProfile";
import Profile from "./Profile";
import { useState } from "react";

export const ProfileContainer = ({ user, onClose }) => {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  // Simulated user data

  const handleUpdateClick = () => {
    setShowUpdateProfile(true); // Show UpdateProfile component
  };

  const handleCancel = () => {
    setShowUpdateProfile(false); // Go back to UserProfile component
  };

  const handleUpdateSubmit = (updatedData) => {
    console.log("Updated Data:", updatedData);
    // Add your API call to update the user's information here

    // Return to UserProfile after successful submission
    setShowUpdateProfile(false);
  };

  return (
    <div>
      {showUpdateProfile ? (
        <UpdateProfile
          user={user}
          onCancel={handleCancel}
          onUpdate={handleUpdateSubmit}
        />
      ) : (
        <Profile
          user={user}
          onClose={onClose}
          onUpdateClick={handleUpdateClick}
        />
      )}
    </div>
  );
};
