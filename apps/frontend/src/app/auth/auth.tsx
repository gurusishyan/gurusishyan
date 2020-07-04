import React from 'react';
import { useDispatch } from 'react-redux';

import './auth.scss';
import { signIN } from '../store/authentication/signIn';
import { CustomButton, FormInput, Label, Info } from '../shared/components';

export const Auth = () => {
  const dispatch = useDispatch();

  const inputChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <form>
      <div className="row">
        <div className="form-group col-md-10">
          <Label htmlFor="email">Name</Label>
          <FormInput
            id="email"
            aria-describedby="emailHelp"
            type="email"
            className="form-control"
          />
          <Info id="emailHelp">
            {' '}
            We will never share your email with any one
          </Info>
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-10">
          <Label htmlFor="email">Name</Label>
          <FormInput
            id="email"
            aria-describedby="emailHelp"
            type="email"
            className="form-control"
          />
          <Info id="emailHelp">
            {' '}
            We will never share your email with any one
          </Info>
        </div>
      </div>

      <CustomButton
        className="btn btn-danger"
        onClick={() => dispatch(signIN({ name: 'prem', password: 'rap' }))}
      >
        Login
      </CustomButton>
    </form>
  );
};

export default Auth;
