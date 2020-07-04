import React from 'react';
import { useDispatch } from 'react-redux';

import './auth.scss';
import { signIN } from '../store/authentication/signIn';
import { CustomButton, FormInput } from '../shared/components';

export const Auth = () => {
  const dispatch = useDispatch();

  const inputChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <h1>Welcome to auth!</h1>
      <FormInput type="email" onChange={(e) => inputChange(e)} />
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
