import React, { useState, useEffect } from 'react';
import './styles/MainStyle.css';
import { auth } from '../common/firebaseConfig';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const SigninComponent = () => {
    const [user, setUser] = useState(null);

    // NOTE 화면 처음 실행시 로그인 상태 확인
    useEffect(() => {
      // Auth 상태가 변경될 때마다 호출,
      // onAuthStateChanged에 인증값과 유저 객체currentUser를 전달, 로그인 상태를 확인, 
      // currentUser.email, currentUser.uid 형태
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // 사용자가 로그인한 상태
          setUser(currentUser);
        } else {
          // 사용자가 로그아웃한 상태
          setUser(null);
        }
      });

      // 컴포넌트가 언마운트 될 때 unsubscribe 함수를 호출
      return unsubscribe;
    }, []);

    // NOTE 로그아웃 버튼
    const handleSignOut = () => {
      signOut(auth).then(() => {
          console.log("사용자가 로그아웃했습니다.");
      }).catch((error) => {
          console.error("로그아웃 중 오류 발생:", error);
      });
    };

  return (
      <div className="signin-component">
        {user ? (
          <div>
            <p>안녕하세요, {user.email}!</p>
            <button onClick={handleSignOut}>로그아웃</button>
          </div>
        ) : (
            <p>로그인 상태가 아닙니다.</p>
        )}
      </div>
    );
};

export default SigninComponent;
