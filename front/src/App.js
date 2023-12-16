import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SigninComponent from './components/signin/Signin';
import SignupComponent from './components/signup/Signup';
import MainPage from './components/main/Main';
import { auth } from './components/common/firebaseConfig';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // 구독 해지 함수를 반환합니다.
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* 로그인 상태가 아닐 때만 탭 메뉴를 보여줍니다. */}
        {!user && (
          <div className="tab-menu">
            <button 
              onClick={() => {
                // 탭 메뉴를 클릭하면 해당 경로로 이동합니다.
                window.location.pathname = '/signin';
              }}>
              로그인
            </button>
            <button 
              onClick={() => {
                // 탭 메뉴를 클릭하면 해당 경로로 이동합니다.
                window.location.pathname = '/signup';
              }}>
              회원가입
            </button>
          </div>
        )}

        <Routes>
          <Route path="/signin" element={<SigninComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route 
            path="/main" 
            element={user ? <MainPage /> : <Navigate to="/signin" replace />} 
          />
          {/* 로그인하지 않은 사용자를 로그인 페이지로 리다이렉트합니다. */}
          <Route 
            path="*" 
            element={!user ? <Navigate to="/signin" replace /> : <Navigate to="/main" replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
