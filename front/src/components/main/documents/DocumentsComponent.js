import React from 'react';
import './styles/DocumentsStyle.css';
import { auth } from '../../common/firebaseConfig';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const DocumentsComponent = ({ showModal, closeModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="documents-modal-overlay">
      <div className="documents-modal">
        <div className="documents-modal-header">
          <h2>문서 작성</h2>
          <button className="documents-close-button" onClick={closeModal}>&times;</button>
        </div>
        <div className="documents-modal-body">
          {/* 문서 관련 */}
        </div>
      </div>
    </div>
  );
};

export default DocumentsComponent;
