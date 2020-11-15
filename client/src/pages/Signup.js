import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import LoginSignupWrapper from '../components/LoginSignupWrapper';
import SignupForm from '../components/SignupForm';
import { store } from '../context/store';

const Signup = () => {
  const {
    state: { isAuthenticated },
  } = useContext(store);
  if (isAuthenticated) return <Redirect to='/dashboard' />;
  return (
    <LoginSignupWrapper>
      <SignupForm />
    </LoginSignupWrapper>
  );
};

export default Signup;
