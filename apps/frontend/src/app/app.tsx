import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { whoami } from './store/auth-store/actions/login.actions';
import Auth from './auth/auth';
import { ToastContainerComponent, InitialLoader } from './shared/components';

export const App = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state: any) => state.auth);
  const { isInitializing, currentUser } = loginStatus;

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
