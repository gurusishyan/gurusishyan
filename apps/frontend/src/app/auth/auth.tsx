import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './auth.scss';
import { signIN } from '../store/authentication/signIn';

export const Auth = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Welcome to auth!</h1>
      <button
        onClick={() => dispatch(signIN({ name: 'prem', password: 'rap' }))}
      >
        Login
      </button>
    </div>
  );
};

export default Auth;
