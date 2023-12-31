import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import SigninComponent from './components/signin/Signin';
import SignupComponent from './components/signup/Signup';
import MainPage from './components/main/Main';
import { auth } from './components/common/firebaseConfig';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

function NavigationMenu({ user }) {
  const navigate = useNavigate();

  return (
    !user && (
      <div className="tab-menu">
        <button onClick={() => navigate('/signin')}>로그인</button>
        <button onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    )
  );
}

function App() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true); // 로딩중 표시, 로그인 상태체크 위함. 없으면 user null 상태전달되어 탭메뉴 스타일 깨짐

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e0ffe0',
        color: '#004d00',
        fontSize: '20px'
      }}>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <NavigationMenu user={user} />
        
        <Routes>
          <Route path="/signin" element={<SigninComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/main" element={user ? <MainPage /> : <Navigate to="/signin" replace />} />
          <Route path="*" element={!user ? <Navigate to="/signin" replace /> : <Navigate to="/main" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
