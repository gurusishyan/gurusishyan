import React from 'react';
import { ToastContainer } from 'react-toastify';
import { AiOutlineLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';

import './LoginForm.scss';
import LoginPage from '../../../../assets/png/LoginPage.png';
import Logo from '../../../../assets/svg/Logo.svg';
import { CustomButton } from '../../../shared/components';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const onLoginRequested = (data) => {
    console.log(data);
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
              Sign In
            </CustomButton>
            <ToastContainer position="bottom-left" autoClose={3000} />
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

export default LoginForm;
