import React, { useState } from 'react';
import './App.css';
import SigninComponent from './components/signin/Signin';
import SignupComponent from './components/signup/Signup';

function App() {
  const [activeTab, setActiveTab] = useState('signin');

  return (
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
      {activeTab === 'signin' && <SigninComponent />}
      {activeTab === 'signup' && <SignupComponent />}
    </div>
  );
}

export default App;