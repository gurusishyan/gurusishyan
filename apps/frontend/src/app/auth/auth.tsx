import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { InitialLoader } from '../shared/components';

const LoginForm = lazy(() => import('./components/LoginForm/LoginForm'));
const ResetPassword = lazy(() =>
  import('./components/reset-password/reset-password')
);
const RegistrationContainer = lazy(() =>
  import('./containers/registration-container/Registration.container')
);
const NotFound = lazy(() => import('../shared/components/404.component'));

export const AuthContainer = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<InitialLoader />}>
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route
              path="/student-registration"
              component={RegistrationContainer}
            />
            <Route
              path="/teacher-registration"
              component={RegistrationContainer}
            />
            <Route path="/reset-password" component={ResetPassword} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default AuthContainer;
