import React, { useState } from 'react';
import './styles/SignupStyle.css';
import { auth, db } from '../common/firebaseConfig';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { useNavigate } from 'react-router-dom';

const SignupComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('개인');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        uid: auth.currentUser.uid,
        name,
        age,
        role,
        language,
        email
      });
      navigate('/main'); // 회원가입 성공 시 메인 페이지로 바로 이동
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="outer-div">
      <div className="form-container">
        <form onSubmit={handleSignup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="나이"
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="개인">개인</option>
            <option value="사업주">사업주</option>
          </select>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="언어"
          />
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
    </div>
  );
};

export default SignupComponent;
