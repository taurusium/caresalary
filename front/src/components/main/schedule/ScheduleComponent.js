import React from 'react';
import './styles/ScheduleStyle.css';
import { auth } from '../../common/firebaseConfig';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const ScheduleComponent = ({ showModal, closeModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="schedule-modal-overlay">
      <div className="schedule-modal">
        <div className="schedule-modal-header">
          <h2>일정 관리</h2>
          <button className="schedule-close-button" onClick={closeModal}>&times;</button>
        </div>
        <div className="schedule-modal-body">

        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;