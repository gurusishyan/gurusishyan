import React from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AiOutlineLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import './LoginForm.scss';
import Login_Page from '../../../../assets/svg/Login_Page.svg';
import Logo from '../../../../assets/svg/Logo.svg';
import { CustomButton } from '../../../shared/components';
import { userLoginRequest } from '../../../store/auth-store/actions';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onLoginRequested = (data) => {
    dispatch(userLoginRequest(data));
  };

  return (
    <div className="login_main_ctn">
      <div className="login_ctn_1">
        <div className="form_ctn">
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
                <Link
                  to="/student-registration"
                  className="register"
                  style={{ textDecoration: 'none' }}
                >
                  Register
                </Link>
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
                name="user_name"
                placeholder="Username"
                className="form-control"
                required
              />
            </div>

            <div className="input-group mb-4 fp_container">
              <div className="form-group input-group mb-12">
                <span className="input-group-text" id="basic-addon1">
                  <AiOutlineLock />
                </span>
                <input
                  ref={register}
                  type="password"
                  name="password"
                  aria-describedby="emailHelp"
                  placeholder="password"
                  className="form-control"
                  id="emailHelp"
                  required
                />
              </div>
              <div className="fp_">
                <small id="emailHelp" className="form-text text-muted">
                  <span className="dark_blue fp_text pointer">
                    {' '}
                    Forgot Password{' '}
                  </span>
                </small>
              </div>
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
      <div className="login_ctn_2">
        <img className="login_image" src={Login_Page} />
      </div>
    </div>
  );
};

export default LoginForm;
