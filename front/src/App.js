import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SigninComponent from './components/signin/Signin';
import SignupComponent from './components/signup/Signup';
import MainPage from './components/main/Main';
import ProtectedRoute from './components/common/ProtectedRoute';
import { auth } from './components/common/firebaseConfig';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

function App() {
  const [activeTab, setActiveTab] = useState('signin');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div className="tab-menu">
          <button 
            className={activeTab === 'signin' ? 'active' : ''} 
            onClick={() => setActiveTab('signin')}>
            로그인
          </button>
          <button 
            className={activeTab === 'signup' ? 'active' : ''} 
            onClick={() => setActiveTab('signup')}>
            회원가입
          </button>
        </div>
        {activeTab === 'signin' ? (
          <SigninComponent />
        ) : (
          <SignupComponent />
        )}
        <Routes>
          <Route path="/signin" element={<SigninComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route 
            path="/main" 
            element={
              <ProtectedRoute 
                component={MainPage} 
                user={user} 
                redirectPath="/signin"
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
