import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Guest.css';

const Guest = () => {
  const navigate = useNavigate();

  const handleGuestAccess = () => {
    // Optional: store guest status in localStorage or context
    localStorage.setItem('guestUser', 'true');

    // Notify user
    alert('You are now logged in as a guest.');

    // React-router way to navigate
    navigate('/main', { state: { city: 'Hyderabad' } }); // or any default city
  };

  return (
  <div className="guest-access-inline">
    <button onClick={handleGuestAccess} className="guest-btn">
      Continue as Guest
    </button>
  </div>
);
  
};

export default Guest;
