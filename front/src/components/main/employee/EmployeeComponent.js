import React from 'react';
import './styles/EmployeeStyle.css';
import { auth } from '../../common/firebaseConfig';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const EmployeeComponent = ({ showModal, closeModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="employee-modal-overlay">
      <div className="employee-modal">
        <div className="employee-modal-header">
          <h2>직원 관리</h2>
          <button className="employee-close-button" onClick={closeModal}>&times;</button>
        </div>
        <div className="employee-modal-body">
          {/* 직원 관리 관련 내용 */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
