import React, { useState, useEffect } from 'react';
import './styles/MainStyle.css';
import { auth } from '../common/firebaseConfig';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import ScheduleComponent from './schedule/Schedule';
import CustomerComponent from './customer/Customer';
import EmployeeComponent from './employee/Employee';
import DocumentsComponent from './documents/Documents';

const MainComponent = () => {
  const [user, setUser] = useState(null);
  const [activeModalId, setActiveModalId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // 로그인한 사용자가 있을 경우 user 상태를 업데이트
        setUser(currentUser);
      } else {
        // 사용자가 없을 경우 user 상태를 null로 설정
        setUser(null);
      }
    });

    // 구독 해지를 위한 함수를 반환
    return unsubscribe;
  }, []);



  // 로그아웃 핸들러
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // 로그아웃 성공 시 처리
      console.log("User signed out.");
    }).catch((error) => {
      // 로그아웃 실패 시 처리
      console.error("Sign out error:", error);
    });
  };

  // 메뉴 아이템 클릭 핸들러
  const handleMenuItemClick = (id) => {
    setActiveModalId(id);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setActiveModalId(null);
  };
  
  const renderModal = () => {
    switch (activeModalId) {
      case 'schedule':
        console.log(111)
        return <ScheduleComponent showModal={activeModalId === 'schedule'} closeModal={handleCloseModal} />;
      case 'customer':
        return <CustomerComponent showModal={activeModalId === 'customer'} closeModal={handleCloseModal} />;
      case 'employee':
        return <EmployeeComponent showModal={activeModalId === 'employee'} closeModal={handleCloseModal} />;
      case 'documents':
        return <DocumentsComponent showModal={activeModalId === 'documents'} closeModal={handleCloseModal} />;
      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      <header className="main-header">
        {/* Header content */}
        <div className="logo">CS</div>
      </header>
      
      <div className="flex-container">
        <aside className="main-menu">
          <button className="menu-item" onClick={() => handleMenuItemClick('customer')}>고객 관리</button>
          <button className="menu-item" onClick={() => handleMenuItemClick('schedule')}>일정 관리</button>
          <button className="menu-item" onClick={() => handleMenuItemClick('employee')}>직원 관리</button>
          <button className="menu-item" onClick={() => handleMenuItemClick('documents')}>문서 작성</button>
          <button className="menu-item" onClick={handleSignOut}>로그아웃</button>
        </aside>
        {renderModal()}
        
        <div className="main-content-area">
          <section className="posting-page">
          </section>

          <aside className="detail-view">
            <div className="details-my">
              <p>나의 일정</p>
            </div>
            <div className="details-current">
              <p>현재 업무</p>
            </div>
          </aside>
        </div>
      </div>

      <section className="main-alert">
        <div className="content-box">주요 / 긴급 프로젝트 페이지</div>
      </section>
          
      
      <footer className="chat-assistant-area">       

        <div className="assistant-area">
          <p>AI챗</p>

        </div>

        <div className="chat-window">
          <p>커뮤니티챗</p>
        </div>

      </footer>

    </div>
  );
};

export default MainComponent;