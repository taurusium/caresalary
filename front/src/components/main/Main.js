import React, { useState, useEffect } from 'react';
import './styles/MainStyle.css';
import { auth } from '../common/firebaseConfig';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const MainComponent = () => {
  const [user, setUser] = useState(null);

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

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // 로그아웃 성공 시 처리
      console.log("User signed out.");
    }).catch((error) => {
      // 로그아웃 실패 시 처리
      console.error("Sign out error:", error);
    });
  };

  return (
    <div className="main-container">
      <header className="main-header">
        {/* Header content */}
        <div className="logo">CS</div>
      </header>
      
      <div className="flex-container">
        <aside className="main-menu">
          <button className="menu-item">일정 관리</button>
          <button className="menu-item">고객 관리</button>
          <button className="menu-item">직원 관리</button>
          <button className="menu-item">문서 작성</button>
          <button className="menu-item" onClick={handleSignOut}>로그아웃</button>
        </aside>
        
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