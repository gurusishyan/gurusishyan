import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './auth.scss';
import { signIN } from '../store/authentication/store_signin';
import {
  CustomButton,
  FormInput,
  Label,
  Info,
  Spinner,
} from '../shared/components';

export const Auth = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state: any) => state.signIn);

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
        type="button"
        className="btn btn-danger btn-lg btn-block"
        onClick={() => dispatch(signIN({ name: 'prem', password: 'rap' }))}
      >
        {loginState.loading ? <Spinner /> : 'Login'}
      </CustomButton>

      <Link to="/student-registration"> Student Registration </Link>
    </form>
  );
};

export default Auth;
