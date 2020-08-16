import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { whoami } from './store/auth-store/actions';
import Auth from './auth/auth';
import InitialLoader from './shared/components/InitialLoader';
import ForgotPassword from './auth/components/Forgot-Password/Forgot-Password.component';
import ToastContainerComponent from './shared/components/ToastContainer';

export const App = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state: any) => state.auth);
  const { isInitializing, currentUser, isLoggingIn } = loginStatus;

  useEffect(() => {
    dispatch(whoami());
  }, []);

  return (
    <div>
      {isInitializing ? <InitialLoader /> : currentUser ? <Auth /> : <Auth />}
      <ToastContainerComponent />
    </div>
  );
};

export default App;
