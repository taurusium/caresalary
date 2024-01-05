import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, redirectPath, ...rest }) => {
  if (!user) {
    // 사용자가 로그인하지 않았다면 지정된 경로로 리다이렉션합니다.
    return <Navigate to={redirectPath} replace />;
  }

  // 사용자가 로그인했다면 컴포넌트를 렌더링합니다.
  return <Component {...rest} />;
};

export default ProtectedRoute;