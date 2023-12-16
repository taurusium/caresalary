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
        {/* 로고나 회사명을 표시하는 영역 */}
        <div className="logo">CS</div>
      </header>
      <aside className="main-menu">
        {/* 메뉴 리스트를 표시하는 영역 */}
        <button className="menu-item">일정 관리</button>
        <button className="menu-item">고객 관리</button>
        <button className="menu-item">지원 관리</button>
        <button className="menu-item" onClick={handleSignOut}>로그아웃</button>
      </aside>
      <section className="main-content">
        {/* 메인 콘텐츠를 표시하는 영역 */}
        <div className="content-box">주요 / 긴급 프로젝트 페이지</div>
      </section>
      <aside className="detail-view">
        {/* 상세 정보를 표시하는 영역 */}
        <div className="details-item">내역 상세</div>
        <div className="details-item">내역 리스트</div>
      </aside>
    </div>
  );
};

export default MainComponent;