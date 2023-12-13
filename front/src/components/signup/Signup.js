// SignupComponent.js
import React, { useState } from 'react';
import './styles/SignupStyle.css'
import { auth } from '../common/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const SignupComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // 회원가입 성공 로직 
      console.log('회원가입 성공!');
    } catch (error) {
      // 에러 처리
      setError(error.message);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <button type="submit">회원가입</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignupComponent;
