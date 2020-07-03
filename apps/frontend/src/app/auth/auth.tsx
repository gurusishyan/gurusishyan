import React from 'react';
import { useDispatch } from 'react-redux';

import './auth.scss';
import { signIN } from '../store/authentication/signIn';
import CustomButton from '../shared/components/custom-button/custom-button';

export const Auth = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Welcome to auth!</h1>
      <CustomButton
        className="btn btn-danger"
        onClick={() => dispatch(signIN({ name: 'prem', password: 'rap' }))}
      >
        Login
      </CustomButton>
    </div>
  );
};

export default Auth;
