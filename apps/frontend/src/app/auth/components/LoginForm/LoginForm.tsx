import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from 'react-google-login';

import './LoginForm.scss';
import Login_Page from '../../../../assets/svg/Login_Page.svg';
import Logo from '../../../../assets/svg/Logo.svg';
import {
  CustomButton,
  InitialLoader,
  Spinner,
} from '../../../shared/components';
import {
  userLoginRequest,
  signInWithGoogleFailure,
  signInWithGoogle,
  verifyGoogleToken,
} from '../../../store/auth-store/actions/login.actions';
import ForgotPassword from '../Forgot-Password/Forgot-Password.component';
import { environment } from 'apps/frontend/src/environments/environment';
import { RootState } from '../../../store/root-reducer';

const LoginForm = () => {
  const loginState = useSelector((state: RootState) => state.auth);
  const [modalShow, setModalShow] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onLoginRequested = (data) => {
    dispatch(userLoginRequest(data));
  };

  const signInWithGoogleClicked = () => {
    dispatch(signInWithGoogle());
  };

  const onSuccess = (res) => {
    dispatch(verifyGoogleToken(res.tokenId));
  };

  const onFailure = (err) => {
    dispatch(signInWithGoogleFailure(err));
  };

  const { signIn } = useGoogleLogin({
    onRequest: signInWithGoogleClicked,
    onSuccess,
    onFailure,
    clientId: environment.google_client_id,
  });

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
                  style={{ textDecoration: 'none', color: '#ffffff' }}
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
                <small
                  onClick={() => setModalShow(true)}
                  id="emailHelp"
                  className="form-text text-muted"
                >
                  <span className="dark_blue fp_text pointer">
                    Forgot Password
                  </span>
                </small>
                <ForgotPassword
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>

            <CustomButton className="golden_button" type="submit">
              {loginState.isLoggingIn ? <Spinner /> : 'Login'}
            </CustomButton>
            <div className="text-center or_text">or</div>
            <CustomButton
              onClick={signIn}
              className="google_button"
              type="button"
            >
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
