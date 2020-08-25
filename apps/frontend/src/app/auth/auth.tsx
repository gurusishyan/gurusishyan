import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { InitialLoader } from '../shared/components';

const LoginForm = lazy(() => import('./components/LoginForm/LoginForm'));
const ResetPassword = lazy(() =>
  import('./components/reset-password/reset-password')
);

const RegistrationContainer = lazy(() =>
  import('./containers/registration-container/Registration.container')
);

export const Auth = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<InitialLoader />}>
          <Switch>
            <Route path="/student-registration">
              <RegistrationContainer />
            </Route>
            <Route path="/teacher-registration">
              <RegistrationContainer />
            </Route>
            <Route path="/reset-password">
              <ResetPassword />
            </Route>
            <Route path="/" exact>
              <LoginForm />
            </Route>
            <Redirect to={'/'} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default Auth;
