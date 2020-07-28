import React from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';

import './sign-in.scss';
import LoginPage from '../../../../assets/png/LoginPage.png';
import Logo from '../../../../assets/svg/Logo.svg';
import { CustomButton } from '../../../shared/components';
import { signIN } from '../../../store/authentication/signIn';

/* eslint-disable-next-line */
export interface SignInProps {}

export const SignIn = (props: SignInProps) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onLoginRequested = (credentials) => {
    dispatch(signIN(credentials));
  };

  return (
    <div className="login_main_ctn">
      <div className="login_ctn_1">
        <div>
          <div className="logo_container field_padding">
            <img src={Logo} />
          </div>
          <div className="login_header">
            <div>
              <div className="dark_blue login_title">Login</div>
              <div className="line_1"></div>
            </div>
            <div>
              <CustomButton className="golden_button" type="button">
                <span className="register"> Register </span>
              </CustomButton>
            </div>
          </div>

          <form onSubmit={handleSubmit(onLoginRequested)}>
            <div className="input-group mb-4 field_padding">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <AiOutlineLock />
                </span>
              </div>
              <input
                ref={register}
                type="text"
                name="username"
                placeholder="Username"
                className="form-control"
                required
              />
            </div>

            <div className="input-group mb-4 field_padding">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <AiOutlineLock />
                </span>
              </div>
              <input
                ref={register}
                type="password"
                name="password"
                placeholder="password"
                className="form-control"
                required
              />
            </div>

            <CustomButton className="golden_button" type="submit">
              <span className="register"> Sign In </span>
            </CustomButton>

            <div className="text-center or_text">or</div>

            <CustomButton className="google_button" type="button">
              <FcGoogle size={23} className="google_login_page" />
              Sign In with Google
            </CustomButton>
          </form>
        </div>
      </div>
      <div>
        <img className="login_image" src={LoginPage} />
      </div>
    </div>
  );
};

export default SignIn;
