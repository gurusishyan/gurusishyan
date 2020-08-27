import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { whoami } from './store/auth-store/actions/login.actions';
import AuthContainer from './auth/auth';
import { ToastContainerComponent, InitialLoader } from './shared/components';
import Dashboard from './dashboard/Dashboard';
import { RootState } from './store/root-reducer';
import CubesLoader from './shared/components/CubesLoader';

export const App = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state: RootState) => state.auth);
  const loaderStatus = useSelector(
    (state: RootState) => state.loader.isFullScreenLoading
  );
  const { isInitializing, currentUser } = loginStatus;

  useEffect(() => {
    dispatch(whoami());
  }, []);

  return (
    <div>
      {isInitializing ? (
        <InitialLoader />
      ) : currentUser ? (
        <Dashboard />
      ) : (
        <AuthContainer />
      )}
      <ToastContainerComponent />
      {loaderStatus ? <CubesLoader /> : ''}
    </div>
  );
};

export default App;
