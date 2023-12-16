import React, { useState } from 'react';
import './styles/SigninStyle.css';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import { auth } from '../common/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const SigninComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSignin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('로그인 성공! 환영해요~ 🎉');
      setError(''); // 이전 에러 메시지 초기화
      navigate('/main'); // 로그인 성공 후 메인 페이지로 이동
    } catch (error) {
      setMessage(''); // 이전 성공 메시지 초기화
      setError('로그인 실패: ' + error.message);
    }
  };

  return (
    <div className="outer-div">
      <div className="form-container">
        <form onSubmit={handleSignin}>
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
          <button type="submit">로그인</button>
        </form>
        {message && <p>{message}</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
      </div>
    </div>
  );
};

export default SigninComponent;
