import React from 'react';
import './styles/CustomerStyle.css'; // 적절한 CSS 스타일을 추가해주세요
import { auth } from '../../common/firebaseConfig';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const CustomerComponent = ({ showModal, closeModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal">
        <div className="customer-modal-header">
          <h2>고객 관리</h2>
          <button className="customer-close-button" onClick={closeModal}>&times;</button>
        </div>
        <div className="customer-modal-body">
          {/* 여기에 고객 관리 관련 내용을 추가하세요 */}
        </div>
      </div>
    </div>
  );
};

export default CustomerComponent;
