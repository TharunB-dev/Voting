import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/theme.css';

const AuthPage = ({ authType, isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div>
      <ErrorMessage />
      <AuthForm authType={authType} />
    </div>
  );
};

export default AuthPage;
