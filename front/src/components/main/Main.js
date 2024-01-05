import React, { useState, useEffect } from 'react';
import './styles/MainStyle.css';
import { auth, db } from '../common/firebaseConfig';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import ScheduleComponent from './schedule/ScheduleComponent';
import CustomerComponent from './customer/CustomerComponent';
import EmployeeComponent from './employee/EmployeeComponent';
import DocumentsComponent from './documents/DocumentsComponent';
// import titleImage from '../../assets/images/title_resize.png';

const MainComponent = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [activeModalId, setActiveModalId] = useState(null);

  const fetchUserData = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      setUserData(userData);
      console.log("Fetched user data: ", userData);

    } else {
      console.log("No user data found");
      
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // 로그인한 사용자가 있을 경우 user 상태를 업데이트
        setUser(currentUser);
        fetchUserData(currentUser.uid);

        console.log("유저 객체 확인", currentUser);
      } else {
        // 사용자가 없을 경우 user 상태를 null로 설정
        setUser(null);
        setUserData({});
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
              <div className="image-container">
                <div className="overlay-text">나의 일정</div>
              </div>
            </div>
            <div className="details-current">
              <div className="image-container">
                <div className="overlay-text">현재 업무</div>
              </div>
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
          <div className="chat-header">
            <h2>커뮤니티챗</h2>
          </div>
          <div className="chat-body">
            {/* 채팅 메시지가 표시되는 부분 */}
          </div>
          <div className="chat-footer">
            <input type="text" placeholder="메시지 입력..." />
            <button>전송</button>
          </div>
        </div>


      </footer>

    </div>
  );
};

export default MainComponent;