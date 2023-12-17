import React from 'react';
import './styles/EmployeeStyle.css'; // 적절한 CSS 스타일을 추가해주세요
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
          {/* 여기에 직원 관리 관련 내용을 추가하세요 */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
